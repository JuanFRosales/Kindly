import {
  Comment,
  Like,
  MediaItem,
  MediaItemWithOwner,
  Rating,
  User,
  UserWithNoPassword,
} from '../types/DBTypes';
import {
  LoginResponse,
  MediaResponse,
  MessageResponse,
  UploadResponse,
  UserResponse,
} from '../types//MessageTypes';
import * as FileSystem from 'expo-file-system';
import {useEffect, useState} from 'react';
import useUpdateContext from './UpdateHook';
import {fetchData} from '../lib/functions';
import {Credentials} from '../types/LocalTypes';

const useMedia = (user: UserWithNoPassword | null = null) => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {update} = useUpdateContext();

  const getMedia = async () => {
    try {
      setLoading(true);
      let mediaItems = await fetchData<MediaItem[]>(
        process.env.EXPO_PUBLIC_MEDIA_API + '/media',
      );
      // filter out only the user's own media
      if (user) {
        mediaItems = mediaItems.filter((item) => item.user_id === user.user_id);
      }

      // Get usernames (file owners) for all media files from auth api
      const itemsWithOwner: MediaItemWithOwner[] = await Promise.all(
        mediaItems.map(async (item) => {
          const owner = await fetchData<User>(
            process.env.EXPO_PUBLIC_AUTH_API + '/users/' + item.user_id,
          );
          const itemWithOwner: MediaItemWithOwner = {
            ...item,
            username: owner.username,
          };
          return itemWithOwner;
        }),
      );
      itemsWithOwner.reverse();
      setLoading(false);
      setMediaArray(itemsWithOwner);
    } catch (error) {
      console.error('getMedia failed', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, [update]);

  const postMedia = async (
    file: UploadResponse,
    inputs: Record<string, string>,
    token: string,
  ) => {
    setLoading(true);
    const media: Omit<
      MediaItem,
      'media_id' | 'user_id' | 'thumbnail' | 'created_at'
    > = {
      title: inputs.title,
      description: inputs.description,
      filename: file.data.filename,
      filesize: file.data.filesize,
      media_type: file.data.media_type,
    };

    // TODO: post the data to Media API and get the data as MediaResponse
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(media),
    };
    const mediaResult = await fetchData<MediaResponse>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/media',
      options,
    );

    setLoading(false);
    return mediaResult;
  };

  const deleteMedia = async (media_id: number, token: string) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    return await fetchData<MessageResponse>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/media/' + media_id,
      options,
    );
  };

  const putMedia = async (
    media_id: number,
    inputs: Pick<MediaItem, 'title' | 'description'>,
    token: string,
  ) => {
    setLoading(true);

    const mediaResult = await fetchData<MediaResponse>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/media/' + media_id,
      {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      },
    );

    setLoading(false);
    return mediaResult;
  };

  return {mediaArray, postMedia, deleteMedia, putMedia, loading};
};

const useUser = () => {
  // TODO: implement network functions for auth server user endpoints
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<UserResponse>(
      process.env.EXPO_PUBLIC_AUTH_API + '/users/token/',
      options,
    );
  };

  const postUser = async (user: Record<string, string>) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    await fetchData<UserResponse>(
      process.env.EXPO_PUBLIC_AUTH_API + '/users',
      options,
    );
  };

  const getUsernameAvailable = async (username: string) => {
    return await fetchData<{available: boolean}>(
      process.env.EXPO_PUBLIC_AUTH_API + '/users/username/' + username,
    );
  };

  const getEmailAvailable = async (email: string) => {
    return await fetchData<{available: boolean}>(
      process.env.EXPO_PUBLIC_AUTH_API + '/users/email/' + email,
    );
  };

  const getUserById = async (user_id: number) => {
    return await fetchData<User>(
      process.env.EXPO_PUBLIC_AUTH_API + '/users/' + user_id,
    );
  };

  return {
    getUserByToken,
    postUser,
    getUsernameAvailable,
    getEmailAvailable,
    getUserById,
  };
};

const useAuthentication = () => {
  const postLogin = async (creds: Credentials) => {
    return await fetchData<LoginResponse>(
      process.env.EXPO_PUBLIC_AUTH_API + '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  return {postLogin};
};

const useFile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const postFile = async (file: File, token: string) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };
    const uploadResult = await fetchData<UploadResponse>(
      process.env.EXPO_PUBLIC_UPLOAD_SERVER + '/upload',
      options,
    );
    if (uploadResult) {
      setLoading(false);
    }
    return uploadResult;
  };

  const postExpoFile = async (
    imageUri: string,
    token: string,
  ): Promise<UploadResponse> => {
    setLoading(true);
    const fileResult = await FileSystem.uploadAsync(
      process.env.EXPO_PUBLIC_UPLOAD_SERVER + '/upload',
      imageUri, // uri of the image
      {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    setLoading(false);
    return fileResult.body ? JSON.parse(fileResult.body) : null;
  };

  return {postFile, postExpoFile, loading};
};

const useLike = () => {
  const postLike = async (media_id: number, token: string) => {
    // Send a POST request to /likes with object { media_id } and the token in the Authorization header.
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({media_id}),
    };

    return await fetchData<MessageResponse>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/likes',
      options,
    );
  };

  const deleteLike = async (like_id: number, token: string) => {
    // Send a DELETE request to /likes/:like_id with the token in the Authorization header.
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<MessageResponse>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/likes/' + like_id,
      options,
    );
  };

  const getCountByMediaId = async (media_id: number) => {
    // Send a GET request to /likes/:media_id to get the number of likes.
    return await fetchData<{count: number}>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/likes/count/' + media_id,
    );
  };

  const getUserLike = async (media_id: number, token: string) => {
    // Send a GET request to /likes/bymedia/user/:media_id to get the user's like on the media.
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<Like>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/likes/bymedia/user/' + media_id,
      options,
    );
  };

  return {postLike, deleteLike, getCountByMediaId, getUserLike};
};

const useComment = () => {
  const postComment = async (
    comment_text: string,
    media_id: number,
    token: string,
  ) => {
    // TODO: Send a POST request to /comments with the comment object and the token in the Authorization header.
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({comment_text, media_id}),
    };

    return await fetchData<MessageResponse>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/comments',
      options,
    );
  };

  const {getUserById} = useUser();

  const getCommentsByMediaId = async (media_id: number) => {
    // TODO: Send a GET request to /comments/:media_id to get the comments.
    const comments = await fetchData<Comment[]>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/comments/bymedia/' + media_id,
    );
    // Get usernames for all comments from auth api
    const commentsWithUsername = await Promise.all<
      Comment & {username: string}
    >(
      comments.map(async (comment) => {
        const user = await getUserById(comment.user_id);
        return {...comment, username: user.username};
      }),
    );
    return commentsWithUsername;
  };

  return {postComment, getCommentsByMediaId};
};

const useRating = () => {
  const postRating = async (
    rating_value: number,
    media_id: number,
    token: string,
  ) => {
    // Send a POST request to /ratings with the rating object and the token in the Authorization header.
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({rating_value, media_id}),
    };

    return await fetchData<MessageResponse>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/ratings',
      options,
    );
  };

  const getRatingByMediaId = async (media_id: number) => {
    // Send a GET request to /ratings/average/:media_id to get the average rating.
    return await fetchData<{average: number}>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/ratings/average/' + media_id,
    );
  };

  const getUserRatings = async (token: string) => {
    // Send a GET request to ratings/byuser to get the user's ratings.
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<Rating[]>(
      process.env.EXPO_PUBLIC_MEDIA_API + '/ratings/byuser',
      options,
    );
  };

  return {postRating, getRatingByMediaId, getUserRatings};
};

export {
  useMedia,
  useUser,
  useAuthentication,
  useFile,
  useLike,
  useComment,
  useRating,
};
