import { useState } from 'react';
import { HLSJs } from './HlsJS';
// import { MediaChrome } from './MediaChrome';

export const App = () => {
  const [videoId, setVideoId] = useState<string | null>(null);

  return (
    <div>
      {videoId != null && (
        <HLSJs
          src={`http://localhost:9090/videos/${videoId}/output.m3u8`}
          autoPlay
        />
      )}
      <input
        placeholder="Video ID"
        type="text"
        onBlur={(e) => setVideoId(e.target.value)}
      />
      {/* <MediaChrome /> */}
    </div>
  );
};
