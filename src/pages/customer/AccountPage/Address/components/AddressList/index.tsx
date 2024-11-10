import AddressItem from '../AddressItem';
import { AddressProps } from '../../../../../../types/address.type';
import { Divider } from 'antd';
import { UserProps } from '../../../../../../types/user.type';

const AddressList = ({
  profile,
  isModalOpen,
  setIsModalOpen,
}: {
  profile: UserProps | undefined;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div id="address-list" className="mb-6">
    {profile?.address?.map((item: AddressProps) => (
      <div id="adress-item">
        <Divider />
        <AddressItem address={item} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    ))}
  </div>
);

export default AddressList;
