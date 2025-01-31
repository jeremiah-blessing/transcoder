import ffmpeg from 'fluent-ffmpeg';

export class Ffmpeg {
  static createFfmpegHLSStream = async (inputFile: string, outputDir: string) =>
    new Promise((resolve, reject) => {
      ffmpeg(inputFile)
        .outputOptions([
          '-preset',
          'veryfast',
          '-g',
          '48',
          '-sc_threshold',
          '0',
          '-map',
          '0:v:0',
          '-map',
          '0:a:0',
          '-c:v',
          'libx264',
          '-b:v',
          '3000k',
          '-c:a',
          'aac',
          '-b:a',
          '128k',
          '-hls_time',
          '4',
          '-hls_playlist_type',
          'vod',
          '-hls_segment_filename',
          `${outputDir}/output_%03d.ts`,
        ])
        .output(`${outputDir}/output.m3u8`)
        .on('end', () => {
          resolve(null);
        })
        .on('error', (err) => {
          reject(err);
        })
        .run();
    });
}
