/* eslint-disable node/no-unpublished-import */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
//TODO testing code here

import { MediaItem } from '@sharedTypes/DBTypes';
import request from 'supertest';
import {getApiRoot, getMediaItems} from './testApi';
import { deleteMedia } from '../src/api/models/mediaModel';

// import app
const app = 'http://localhost:3000';

describe('GET /api/v1', () => {
  it('responds with a json message', async () => {
    await getApiRoot(app);
  });

  let mediaItems: MediaItem[];
  it('responds with an array of media items', async () => {
    mediaItems = await getMediaItems(app);
  });
});


// TODO: add test for get MediaItems by id
describe('GET /api/v1/media/:id', () => {
  it('responds with a media item by id', async () => {
    const mediaId = 1; // Replace with a valid media item id from your database
    const response = await request(app).get(`/api/v1/media/${mediaId}`);
    expect(response.status).toBe(200);
    const mediaItem: MediaItem = response.body;
    expect(mediaItem).toHaveProperty('media_id', mediaId);
    // Add more assertions based on your media item schema
  });
});
