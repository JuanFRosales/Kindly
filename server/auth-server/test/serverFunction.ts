/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import {Express} from 'express';

const getFound = (url: string | Express, path: string) => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(path)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

const getNotFound = (url: string | Express, path: string) => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(path)
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

export {getFound, getNotFound};
