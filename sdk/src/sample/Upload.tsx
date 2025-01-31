import { useUpload } from '../lib';

export const Upload = () => {
  const { onUpload, loading } = useUpload();

  return (
    <div>
      {loading ? 'Uploading...' : 'Upload'}

      <input
        disabled={loading}
        type="file"
        onChange={(e) => {
          if (!e.target.files) return;
          onUpload(e.target.files[0], 'videoId');
        }}
      />
    </div>
  );
};
