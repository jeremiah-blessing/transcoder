import useSWR from 'swr';
import { useVideosContext } from './context';
import { IVideo } from './type';

export const Videos = () => {
  const { baseURL } = useVideosContext();

  const { data } = useSWR<IVideo[]>(`${baseURL}/videos`, (url: string) =>
    fetch(url).then((res) => res.json())
  );

  return (
    <div>
      <h1>Videos</h1>
      <ul>{data?.map((video) => <li key={video.id}>{video.title}</li>)}</ul>
    </div>
  );
};
