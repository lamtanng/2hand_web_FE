import { EnvironmentOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Tag, Typography } from 'antd';
import AddressModal from './components/AddressModal';
import { UserProps } from '../../../../../types/user.type';
import useReceiverAddress from './useReceiverAddress';
import { AddressProps } from '../../../../../types/address.type';

const ReceiverAddress = ({ profile, value, setValue }: { profile: UserProps | undefined, value: AddressProps | undefined, setValue: React.Dispatch<React.SetStateAction<AddressProps | undefined>> }) => {
  const { isModalOpen, setIsModalOpen, showModal, addressList } = useReceiverAddress(profile, value, setValue);

  return (
    <div id="receiver-address" className="mb-6 rounded-md bg-white p-8 shadow-sm">
      <Typography.Title level={4} className="m-0 text-blue-600">
        <EnvironmentOutlined /> Receiver Address
      </Typography.Title>
      <Divider />
      <Flex gap={'large'} align="center">
        <div className="w-1/6">
          <Typography.Paragraph className="m-0 text-base font-semibold">{`${profile?.firstName} ${profile?.lastName}`}</Typography.Paragraph>
          <Typography.Paragraph className="m-0 text-base font-semibold">{profile?.phoneNumber}</Typography.Paragraph>
        </div>
        <div className="w-4/6">
          <Typography.Paragraph className="m-0 text-base">{`${value?.address}, ${value?.ward?.WardName}, ${value?.district?.DistrictName}, ${value?.province?.ProvinceName}`}</Typography.Paragraph>
        </div>
        <div className="w-1/12">{value?.isDefault && <Tag color="geekblue">Default</Tag>}</div>
        <div className="w-1/12">
          <Button variant="text" color="primary" className="p-0 hover:bg-transparent" onClick={showModal}>
            Change
          </Button>
          <AddressModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            data={addressList}
            setValue={setValue}
            value={value}
            profile={profile}
          />
        </div>
      </Flex>
    </div>
  );
};

export default ReceiverAddress;
