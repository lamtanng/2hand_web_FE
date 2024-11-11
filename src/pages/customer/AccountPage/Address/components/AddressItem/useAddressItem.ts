import { userAPIs } from '../../../../../../apis/user.api';
import { AddressProps } from '../../../../../../types/address.type';
import { displaySuccess } from '../../../../../../utils/displayToast';
import eventEmitter from '../../../../../../utils/eventEmitter';
import { handleError } from '../../../../../../utils/handleError';

const useAddressItem = (address: AddressProps) => {
  const handleDeleteAddress = async () => {
    try {
      await userAPIs.deleteAddress(address._id);
      eventEmitter.emit('deleteAddress');
      displaySuccess('Deleted address successfully.');
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  return { handleDeleteAddress };
};

export default useAddressItem;
