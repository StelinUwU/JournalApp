export const fileUpload = async (file: File) => {
  if (!file) throw new Error('No file found');

  const cloudUrl = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_ID
  }/image/upload`;

  const formData = new FormData();

  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET!
  );
  formData.append('file', file as any);

  try {
    const response = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Error uploading file');
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    throw new Error('Error uploading file');
  }
};
