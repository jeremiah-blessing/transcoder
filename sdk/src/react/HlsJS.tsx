import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HLSPlayerProps {
  src: string; // The source URL for the HLS stream
  autoPlay?: boolean; // Should the video autoplay
  controls?: boolean; // Should the video have controls
}

export const HLSJs: React.FC<HLSPlayerProps> = ({
  src,
  autoPlay = false,
  controls = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('HLS Manifest Parsed');
          if (autoPlay) {
            video
              .play()
              .catch((error) => console.error('AutoPlay failed:', error));
          }
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS Error:', data);
        });

        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback for Safari
        video.src = src;
        if (autoPlay) {
          video
            .play()
            .catch((error) => console.error('AutoPlay failed:', error));
        }
      } else {
        console.error('HLS is not supported in this browser.');
      }
    }
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      controls={controls}
      style={{ width: 700, height: 'auto' }}
    >
      Your browser does not support HLS.
    </video>
  );
};
