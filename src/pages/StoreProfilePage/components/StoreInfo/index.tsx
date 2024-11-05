import { Rate, Typography } from 'antd';
import useUserProfileDetail from '../../useUserProfileName';

const StoreInfo = () => {
  const { store, storeProduct } = useUserProfileDetail();
  
  return (
    <div className="mb-6 rounded-xl bg-white p-8 shadow-sm">
      <Typography.Title level={3} className="m-0 mb-6">
        About Store
      </Typography.Title>
      <div className="mb-6 grid w-full grid-cols-2 gap-6">
        <Typography.Paragraph className="m-0 text-base">Store: {store?.name}</Typography.Paragraph>
        <Typography.Paragraph className="m-0 text-base">
          Rate:
          <Rate allowHalf defaultValue={4} disabled className="m-0" />
        </Typography.Paragraph>
        <Typography.Paragraph className="m-0 text-base">Products: {storeProduct.length}</Typography.Paragraph>
        <Typography.Paragraph className="m-0 text-base">Orders: 0</Typography.Paragraph>
      </div>
      <Typography.Paragraph className="m-0 text-base">Description: {store?.description}</Typography.Paragraph>
    </div>
  );
};

export default StoreInfo;
