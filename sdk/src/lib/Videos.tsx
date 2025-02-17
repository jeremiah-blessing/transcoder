import useSWR from 'swr';
import { useVideosContext } from './context';

export const Videos = () => {
  const { baseURL } = useVideosContext();

  const { data } = useSWR(`${baseURL}/videos`, (url) =>
    fetch(url).then((res) => res.json())
  );

  return (
    <div>
      <h1>Videos</h1>
      <ul>
        {data?.map((video: any) => <li key={video.id}>{video.title}</li>)}
      </ul>
    </div>
  );
};
