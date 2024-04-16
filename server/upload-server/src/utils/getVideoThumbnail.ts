import ffmpeg from 'fluent-ffmpeg';

const getVideoThumbnail = (videoUrl: string) => {
  // resolves always because even if there is an error, ffmpeg will still create a thumbnail
  return new Promise((resolve) => {
    ffmpeg(videoUrl)
      .on('end', () => {
        resolve(true);
      })
      .screenshots({
        count: 1,
        filename: './uploads/%b-thumb.png',
      });
  });
};

export default getVideoThumbnail;
