import { GetProp, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const useImageUploader = (
  base64Images: string[],
  setBase64Images: React.Dispatch<React.SetStateAction<string[]>>,
  violatingImages: number[] = [],
  setViolatingImages?: React.Dispatch<React.SetStateAction<number[]>>,
  cropOptions = { quality: 0.9, backgroundColor: 'white' },
) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const convertToSquare = (base64Image: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          // Create a square canvas with the larger of width or height
          const canvas = document.createElement('canvas');
          const size = Math.max(img.width, img.height);
          canvas.width = size;
          canvas.height = size;

          // Get canvas context and draw background if specified
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          // Fill with background color if specified
          if (cropOptions.backgroundColor) {
            ctx.fillStyle = cropOptions.backgroundColor;
            ctx.fillRect(0, 0, size, size);
          }

          // Calculate position to center the image
          const offsetX = (size - img.width) / 2;
          const offsetY = (size - img.height) / 2;

          // Draw the image centered on the canvas
          ctx.drawImage(img, offsetX, offsetY, img.width, img.height);

          // Convert canvas to base64
          resolve(canvas.toDataURL('image/jpeg', cropOptions.quality));
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = base64Image;
    });
  };

  const convertStringsToUploadFiles = (strings: string[]): UploadFile[] => {
    return strings.map((base64String, index) => {
      // Determine file type and generate appropriate name
      const fileType = base64String.split(';')[0].split('/')[1];
      const fileName = `image-${index + 1}.${fileType || 'png'}`;

      return {
        uid: `-${index}`,
        name: fileName,
        status: 'done',
        url: base64String,
        thumbUrl: base64String,
        type: `image/${fileType || 'png'}`,
        // Store the original base64 string for later use
        base64Url: base64String,
      };
    });
  };

  const handlePreview = async (file: UploadFile) => {
    let previewUrl = file.url || file.preview;

    if (!previewUrl && file.originFileObj) {
      previewUrl = await getBase64(file.originFileObj as FileType);
      file.preview = previewUrl;
    }

    // Use base64Url if available (for existing base64 images)
    if (!previewUrl && (file as any).base64Url) {
      previewUrl = (file as any).base64Url;
    }

    setPreviewImage(previewUrl || '');
    setPreviewOpen(true);
  };

  // Helper function to update violatingImages after removing an image
  const updateViolatingImagesAfterRemoval = (removedIndex: number, currentViolatingImages: number[]) => {
    if (!setViolatingImages) return;

    // Create a new array with adjusted indices
    const updatedViolatingImages = currentViolatingImages
      .filter((index) => index !== removedIndex) // Remove the index of the deleted image
      .map((index) => (index > removedIndex ? index - 1 : index)); // Decrement indices for images that come after the removed one

    setViolatingImages(updatedViolatingImages);
  };

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList, file }) => {
    // Check if this is a file removal operation
    const isRemoval = file.status === 'removed';
    const removedIndex = isRemoval ? Number(file.uid.replace('-', '')) : -1;

    // Update the file list immediately for UI responsiveness
    setFileList(newFileList);

    try {
      // Process new files and existing base64 images
      const base64Results = await Promise.all(
        newFileList.map(async (file) => {
          // If it's a new file, convert to base64
          if (file.originFileObj) {
            const base64 = await getBase64(file.originFileObj as FileType);
            // Convert the image to 1:1 ratio
            return convertToSquare(base64);
          }
          // If it's an existing base64 image, return the stored base64Url
          return (file as any).base64Url || file.url || '';
        }),
      );

      // Filter out empty strings and update base64Images
      const validBase64Images = base64Results.filter(Boolean);
      setBase64Images(validBase64Images);

      // If this was a removal operation, update violatingImages array
      if (isRemoval && setViolatingImages) {
        updateViolatingImagesAfterRemoval(removedIndex, violatingImages);
      }

      console.log('Updated Base64 Images:', validBase64Images);
    } catch (error) {
      console.error('Error processing images:', error);
    }
  };

  useEffect(() => {
    if (base64Images.length !== 0) {
      const uploadFiles = convertStringsToUploadFiles(base64Images);
      setFileList(uploadFiles);
    } else {
      setFileList([]);
    }
  }, [base64Images]);

  return {
    previewImage,
    previewOpen,
    fileList,
    handlePreview,
    handleChange,
    setPreviewImage,
    setPreviewOpen,
  };
};
export default useImageUploader;
