import { Button, Divider, Flex, Radio, Tag } from 'antd';
import { AddressProps } from '../../../../../../../../../types/address.type';
import { formattedAddress } from '../../../../../../../../../utils/formattedAddress';

const AddressItem = ({
  address,
  setFormVisible,
  setRadioVisible,
  setEditedAddress,
}: {
  address: AddressProps;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setRadioVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedAddress: React.Dispatch<React.SetStateAction<AddressProps | undefined>>;
}) => {
  return (
    <div>
      <Radio value={address} className="w-full">
        <Flex justify="space-between" align="baseline" className="w-full">
          <Button
            variant="link"
            color="primary"
            className="p-0"
            onClick={() => {
              setFormVisible(false);
              setRadioVisible(true);
              setEditedAddress(address);
            }}
          >
            Edit
          </Button>
        </Flex>
        {formattedAddress(address)}
        {address.isDefault && <Tag color="geekblue" className='mt-2 ml-3'>Default</Tag>}
      </Radio>
      <Divider />
    </div>
  );
};

export default AddressItem;
