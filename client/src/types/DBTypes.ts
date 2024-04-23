type UserLevel = {

    level_id: number;
    level_name: 'Admin' | 'User' | 'Company' | 'Guest';
};

type User = {
    user_id: number;
    username: string;
    password: string;
    email: string;
    user_level_id: number;
    created_at: Date | string;
};

type MediaItem = { 
    media_id: string;
    user_id: number;
    filename: string; 
    filesize: number;
    media_type: string;
    title: string;
    description: string;
    created_at: Date | string;
};

type Comment = {
    media_id: number;
    user_id: number;
    created_at: Date;
};

type Approval = {    
    approval_id: number;
    media_id: number;
    user_id: number;
    created_at: Date | string;
};


type UploadResult = {
    message: string;
    data?: {
        image: string;
    };
};

// type gymnastics to get rid of user_level_id from User type and replace it with level_name from UserLevel type
type UserWithLevel = Omit<User, 'user_level_id'> &
  Pick<UserLevel, 'level_name'>;

type UserWithNoPassword = Omit<UserWithLevel, 'password'>;

type TokenContent = Pick<User, 'user_id'> & Pick<UserLevel, 'level_name'>;

type MediaItemWithOwner = MediaItem & Pick<User, 'username'>;

  level_id: number;
  level_name: "Admin" | "User" | "Company" | "Guest";
};

type User = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  user_level_id: number;
  created_at: Date | string;
};

type MediaItem = {
  media_id: string;
  user_id: number;
  filename: string;
  filesize: number;
  media_type: string;
  title: string;
  description: string;
  created_at: Date | string;
};

type Comment = {
  media_id: number;
  user_id: number;
  created_at: Date;
};

type Approval = {
  approval_id: number;
  media_id: number;
  user_id: number;
  created_at: Date | string;
};

type UploadResult = {
  message: string;
  data?: {
    image: string;
  };
};

// type gymnastics to get rid of user_level_id from User type and replace it with level_name from UserLevel type
type UserWithLevel = Omit<User, "user_level_id"> &
  Pick<UserLevel, "level_name">;

type UserWithNoPassword = Omit<UserWithLevel, "password">;

type TokenContent = Pick<User, "user_id"> & Pick<UserLevel, "level_name">;

type MediaItemWithOwner = MediaItem & Pick<User, "username">;


// for upload server
type FileInfo = {
  filename: string;
  user_id: number;
};

export type {

    UserLevel,
    User,
    MediaItem,
    Comment,
    Approval,
    UploadResult,
    UserWithLevel,
    UserWithNoPassword,
    TokenContent,
    MediaItemWithOwner,
    FileInfo,
}

  UserLevel,
  User,
  MediaItem,
  Comment,
  Approval,
  UploadResult,
  UserWithLevel,
  UserWithNoPassword,
  TokenContent,
  MediaItemWithOwner,
  FileInfo,
};

