import { PlusOutlined } from '@ant-design/icons';
import { Upload, Image} from 'antd';
import ImgCrop from 'antd-img-crop';
import useImageUploader from './useImageUploader';

const ImageUploader = ({
  base64Images,
  setBase64Images,
}: {
  base64Images: string[];
  setBase64Images: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { fileList, handlePreview, handleChange, previewImage, previewOpen, setPreviewImage, setPreviewOpen } =
    useImageUploader(base64Images, setBase64Images);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange}>
          {fileList.length >= 10 ? null : uploadButton}
        </Upload>
      </ImgCrop>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ImageUploader;
