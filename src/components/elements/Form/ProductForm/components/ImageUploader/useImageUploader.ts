import { GetProp, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const useImageUploader = (base64Images: string[], setBase64Images: React.Dispatch<React.SetStateAction<string[]>>) => {
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

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    // Update the file list immediately for UI responsiveness
    setFileList(newFileList);

    try {
      // Process new files and existing base64 images
      const base64Results = await Promise.all(
        newFileList.map(async (file) => {
          // If it's a new file, convert to base64
          if (file.originFileObj) {
            return getBase64(file.originFileObj as FileType);
          }
          // If it's an existing base64 image, return the stored base64Url
          return (file as any).base64Url || file.url || '';
        }),
      );

      // Filter out empty strings and update base64Images
      const validBase64Images = base64Results.filter(Boolean);
      setBase64Images(validBase64Images);
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
