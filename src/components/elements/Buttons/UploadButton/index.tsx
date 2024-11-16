import { Button } from 'antd';
import { Upload } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { Image } from 'antd';
import { axiosClient } from '../../../../apis/axios';

export const UploadButton = () => {
  const [selectedFile, setSelectedFile] = useState<FileList>();
  const [image, setImage] = useState<(string | ArrayBuffer | null)[]>([]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (file) {
      setSelectedFile(file);
      for (let i = 0; i < file.length; i++) {
        await convertBase64(file[i]);
      }
    }
  };

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setImage((prev) => [...prev, fileReader.result]);
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const result = await axiosClient.put(
        '/products',
        {
          image,
          _id: "6736af35982bd682166b7d43",
          name: "Product New"
        },
      );
    }
  };

  return (
    <>
      <form method="post" encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
        <input type="file" name="files[]" multiple onChange={handleFileChange} />
        <input
          type="submit"
          value="Upload Files"
          name="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        />
      </form>
      <Image src={image[0]} />
    </>
  );
};
