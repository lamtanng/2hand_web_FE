import { PlusOutlined, WarningOutlined } from '@ant-design/icons';
import { Upload, Image, Tooltip } from 'antd';
import useImageUploader from './useImageUploader';

const ImageUploader = ({
  base64Images,
  setBase64Images,
  violatingImages = [],
  setViolatingImages,
}: {
  base64Images: string[];
  setBase64Images: React.Dispatch<React.SetStateAction<string[]>>;
  violatingImages?: number[];
  setViolatingImages?: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const { fileList, handlePreview, handleChange, previewImage, previewOpen, setPreviewImage, setPreviewOpen } =
    useImageUploader(base64Images, setBase64Images);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  // Custom render for Upload.Item to show warning icon on violating images
  const itemRender = (originNode: React.ReactElement, file: any, fileList: any[]) => {
    const index = Number(file.uid.replace('-', ''));
    const isViolating = violatingImages.includes(index);

    if (!isViolating) return originNode;

    return (
      <div style={{ position: 'relative' }}>
        {originNode}
        <Tooltip title="This image may violate community standards">
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <WarningOutlined
              style={{
                color: '#ff4d4f',
                fontSize: '32px',
                background: 'rgba(255, 255, 255, 0.7)',
                padding: '8px',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            />
          </div>
        </Tooltip>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: '2px solid #ff4d4f',
            borderRadius: '8px',
            pointerEvents: 'none',
          }}
        />
      </div>
    );
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={true}
        maxCount={10}
        itemRender={violatingImages && violatingImages.length > 0 ? itemRender : undefined}
      >
        {uploadButton}
      </Upload>

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
