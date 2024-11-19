import { message, UploadFile } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { useState } from "react";

const useUploadAvatar = (setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    const file = info.file;

    // Generate and set local preview
    if (file.originFileObj) {
      getBase64(file.originFileObj as RcFile)
        .then((preview) => {
          setImageUrl(preview);
        })
        .catch(() => {
          message.error('Failed to generate preview');
        });
    }

    // Update file list for UI
    setFileList(info.fileList.slice(-1));
  };
  return {
    fileList,
    setFileList,
    handleChange
  };
};
export default useUploadAvatar;
