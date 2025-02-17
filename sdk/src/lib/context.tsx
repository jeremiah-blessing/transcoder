import { createContext, useContext, useMemo } from 'react';

interface ContextType {
  baseURL: string;
}

interface Props {
  children: React.ReactNode;
  baseURL: string;
}

const VideosContext = createContext<ContextType>({} as ContextType);

export const VideosProvider = ({ baseURL, children }: Props) => {
  const value = useMemo(() => ({ baseURL }), [baseURL]);

  return (
    <VideosContext.Provider value={value}>{children}</VideosContext.Provider>
  );
};

export const useVideosContext = () => useContext(VideosContext);
