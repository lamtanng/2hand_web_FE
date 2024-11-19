import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, Typography, Upload, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import useUploadAvatar from './useUploadAvatar';

const UploadAvatar = ({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string | undefined;
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const { fileList, handleChange, setFileList } = useUploadAvatar(setImageUrl);

  const props: UploadProps = {
    name: 'file',
    fileList: fileList,
    onChange: handleChange,
    onRemove: () => {
      setImageUrl(undefined);
      setFileList([]);
    },
    maxCount: 1,
    showUploadList: false,
  };

  return (
    <>
      <Flex justify="center" align="center" vertical gap={'large'}>
        <Avatar
          size={150}
          icon={<UserOutlined />}
          src={imageUrl}
          style={{ backgroundColor: imageUrl ? 'transparent' : '#f5f5f5' }}
        />
        <ImgCrop rotationSlider aspectSlider>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </ImgCrop>
        <Typography.Paragraph>Choose an image to upload avatar.</Typography.Paragraph>
      </Flex>
    </>
  );
};

export default UploadAvatar;
