import { DownloadOutlined, ProfileOutlined, TruckOutlined, UploadOutlined } from '@ant-design/icons';
import { Flex } from 'antd';

const TrackingOrder = ({ stages }: { stages: any }) => {
  return (
    <div className="px-12 py-6">
      <Flex>
        <ProfileOutlined />
        <UploadOutlined />
        <TruckOutlined />
        <DownloadOutlined />
      </Flex>
    </div>
  );
};

export default TrackingOrder;
