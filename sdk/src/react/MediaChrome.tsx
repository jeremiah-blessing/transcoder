import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
} from 'media-chrome/react';
import 'hls-video-element';

export const MediaChrome = () => {
  return (
    <MediaController>
      <video
        slot="media"
        src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
        preload="auto"
        muted
        crossOrigin=""
        style={{ width: 700, height: 'auto' }}
      />
      <MediaControlBar>
        <MediaPlayButton></MediaPlayButton>
        <MediaSeekBackwardButton></MediaSeekBackwardButton>
        <MediaSeekForwardButton></MediaSeekForwardButton>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay showDuration></MediaTimeDisplay>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
      </MediaControlBar>
    </MediaController>
  );
};
