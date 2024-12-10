import { AddressProps } from '../../../../../types/address.type';
import { UserProps } from '../../../../../types/user.type';
import AddressItem from '../AddressItem';
import { Divider, Flex, Image, Typography } from 'antd';
import emptyAddress from '../../../../../assets/emptyAddress.png';

const AddressList = ({ profile }: { profile: UserProps | undefined }) => (
  <div id="address-list" className="mb-6">
    {profile?.address?.length !== 0 ? (
      profile?.address?.map((item: AddressProps) => (
        <div id="adress-item">
          <Divider />
          <AddressItem address={item} profile={profile} />
        </div>
      ))
    ) : (
      <>
        <Divider />
        <Flex justify="center" align="center" vertical gap={'middle'}>
          <Image width={'30%'} alt="" src={emptyAddress} fallback="" preview={false} />
          <Typography.Title level={5} className="m-0 text-blue-600">
            No address is found.
          </Typography.Title>
        </Flex>
      </>
    )}
  </div>
);

export default AddressList;
