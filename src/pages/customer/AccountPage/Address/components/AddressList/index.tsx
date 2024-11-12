import AddressItem from '../AddressItem';
// import { AddressProps } from '../../../../../../types/address.type';
import { Divider } from 'antd';
import { UserProps } from '../../../../../../types/user.type';
import { AddressProps } from '../../../../../../types/address.type';

const AddressList = ({
  profile
}: {
  profile: UserProps | undefined;
}) => (
  <div id="address-list" className="mb-6">
    {profile?.address?.map((item: AddressProps) => (
      <div id="adress-item">
        <Divider />
        <AddressItem address={item} profile={profile}/>
      </div>
    ))}
  </div>
);

export default AddressList;
