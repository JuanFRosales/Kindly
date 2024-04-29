/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import {MessageResponse} from '@sharedTypes/MessageTypes';
import {MediaItem} from '@sharedTypes/DBTypes';

// functions to test routes
const getApiRoot = (url: string | Function): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/')
      .expect(200, {message: 'media api v1'}, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

const getMediaItems = (url: string | Function): Promise<MediaItem[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/media')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const media: MediaItem[] = response.body;
          media.forEach((media) => {
            expect(media.media_id).toBeGreaterThan(0);
            expect(media.title).not.toBe('');
          });
          resolve(media);
        }
      });
  });
};

const getMediaItem = (
  url: string | Function,
  id: number
): Promise<MediaItem> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/media/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const media: MediaItem = response.body;
          expect(media.media_id).toBeGreaterThan(0);
          expect(media.title).not.toBe('');
          resolve(media);
        }
      });
  });
};

const postMediaItem = (
  url: string | Function,
  title: string
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/media')
      .send({title})
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const deleteMediaItem = (
  url: string | Function,
  id: number
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/media/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

// functions to test not found 404 for media routes

const getMediaItemNotFound = (
  url: string | Function,
  id: number
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/category/${id}`)
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const putMediaItemNotFound = (
  url: string | Function,
  id: number,
  title: string
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .put(`/api/v1/media/${id}`)
      .send({title})
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const deleteMediaItemNotFound = (
  url: string | Function,
  id: number
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/media/${id}`)
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

// functions to test invalid data 400 for media routes

const postInvalidMediaItem = (
  url: string | Function,
  title: string
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/media')
      .send({title})
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const putInvalidMediaItem = (
  url: string | Function,
  id: string,
  title: string
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .put(`/api/v1/media/${id}`)
      .send({title})
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const deleteInvalidMediaItem = (
  url: string | Function,
  id: string
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/media/${id}`)
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const getInvalidMediaItem = (
  url: string | Function,
  id: string
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/media/${id}`)
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

export {
  getApiRoot,
  getMediaItems,
  getMediaItem,
  postMediaItem,
  deleteMediaItem,
  getMediaItemNotFound,
  putMediaItemNotFound,
  deleteMediaItemNotFound,
  postInvalidMediaItem,
  putInvalidMediaItem,
  deleteInvalidMediaItem,
  getInvalidMediaItem,
};
