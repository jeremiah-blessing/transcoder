import { useState } from 'react';

const API_URL = 'http://localhost:3000';

export const useUpload = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onUpload = async (file: File, videoId: string) => {
    setLoading(true);
    try {
      const createdUploadResponse = await fetch(`${API_URL}/uploads`, {
        method: 'POST',
        body: JSON.stringify({ videoId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const createdUpload = await createdUploadResponse.json();

      const presignedUrl = createdUpload.presignedUrl;

      await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
    } catch (error) {
      console.error(error);
      //
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    onUpload,
  };
};
