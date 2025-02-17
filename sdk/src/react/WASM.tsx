import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { useRef, useState } from 'react';

export const WASM = () => {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm';
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on('log', ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
      console.log(message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm'
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        'text/javascript'
      ),
    });

    setLoaded(true);
  };

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile(
      'input.webm',
      await fetchFile(
        'https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm'
      )
    );
    await ffmpeg.createDir('output');
    await ffmpeg.exec([
      '-i',
      'input.webm',
      '-f',
      'segment',
      '-segment_time',
      '3',
      '-g',
      '9',
      '-sc_threshold',
      '0',
      '-force_key_frames',
      'expr:gte(t,n_forced*9)',
      '-reset_timestamps',
      '1',
      '-map',
      '0',
      './output/output_%d.mp4',
    ]);
    const files = await ffmpeg.listDir('./output');

    console.log(files.filter((file) => file.isDir === false));
    // const data = await ffmpeg.readFile('output_1.mp4');
    // if (videoRef.current)
    //   videoRef.current.src = URL.createObjectURL(
    //     new Blob([data], { type: 'video/mp4' })
    //   );
  };

  return loaded ? (
    <>
      <video ref={videoRef} controls></video>
      <br />
      <button onClick={transcode}>
        Split video to segments of 3 sec. and plays 2nd segment
      </button>
      <p ref={messageRef}></p>
      <p>Open Developer Tools (Ctrl+Shift+I) to View Logs</p>
    </>
  ) : (
    <button onClick={load}>Load ffmpeg-core (~31 MB)</button>
  );
};
