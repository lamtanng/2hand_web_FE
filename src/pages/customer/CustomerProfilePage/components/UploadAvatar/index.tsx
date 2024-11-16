import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, message, Typography, Upload, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';

const UploadAvatar = () => {
  const props: UploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log('uploading');
      }
      if (info.file.status === 'done') {
        message.success(`file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`file upload failed.`);
      }
    },
  };
  return (
    <>
      <Flex justify="center" align="center" vertical gap={'large'}>
        <Avatar size={150} icon={<UserOutlined />} />
        <ImgCrop>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </ImgCrop>
        <Typography.Paragraph>Choose an image to upload.</Typography.Paragraph>
      </Flex>
    </>
  );
};

export default UploadAvatar;
