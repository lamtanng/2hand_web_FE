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
    return strings.map((url, index) => {
      // Extract filename from URL or path
      const fileName = url.split('/').pop() || `file-${index}`;

      return {
        uid: `-${index}`, // Negative index ensures unique IDs for default files
        name: fileName,
        status: 'done',
        url: url,
        thumbUrl: url, // Only include if the URL points to an image
      };
    });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    try {
      const base64Promises = newFileList
        .filter((file) => file.originFileObj)
        .map((file) => getBase64(file.originFileObj as FileType));

      const base64Results = await Promise.all(base64Promises);
      setBase64Images(base64Results);
      console.log('Base64 Images:', base64Results);
    } catch (error) {
      console.error('Error converting to base64:', error);
    }
  };

  useEffect(() => {
    if (base64Images.length !== 0) {
      setFileList(convertStringsToUploadFiles(base64Images));
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
