import { ImageList, ImageListItem } from '@mui/material';

interface Props {
  images: string[];
}

export const ImageGallery = ({ images }: Props) => {
  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img src={image} alt={'Note image'} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
