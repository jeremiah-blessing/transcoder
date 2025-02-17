import { VideosProvider } from './context';
import { Videos } from './Videos';

interface Props {
  baseURL: string;
}

export const VideoPicker = ({ baseURL }: Props) => {
  return (
    <VideosProvider baseURL={baseURL}>
      <Videos />
    </VideosProvider>
  );
};
