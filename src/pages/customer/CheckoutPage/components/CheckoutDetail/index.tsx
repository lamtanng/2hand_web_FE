import { Divider, Flex, Image, Typography } from 'antd';
import defaultPic from "../../../../../assets/blob.jpg"
import { CartItemProps } from '../../../../../types/cart.type';

const CheckoutDetail = ({product}: {product: CartItemProps}) => {
  return (
    <>
      <Flex id="checkout-detail" key={product.productID._id} className="mt-6">
        <Flex gap={'large'} id="product" className="w-1/2">
          <Image width={'13%'} alt="" src="" fallback={defaultPic} preview={false} />
          <Flex gap={'small'} vertical>
            <Typography.Paragraph className="m-0 text-base">{product.productID.name}</Typography.Paragraph>
            <Typography.Paragraph className="m-0 text-base text-gray-500">{product.productID.quality}</Typography.Paragraph>
          </Flex>
        </Flex>
        <Flex justify="space-between" id="info" className="w-1/2">
          <div id="price" className="flex w-1/4 shrink-0 items-center justify-center">
            <Typography.Paragraph className="m-0 text-base">{product.productID.price}</Typography.Paragraph>
          </div>
          <div id="quantity" className="flex w-1/4 shrink-0 items-center justify-center">
            {product.quantity}
          </div>
          <div id="total" className="flex w-1/4 shrink-0 items-center justify-center">
            <Typography.Paragraph className="m-0 text-base">{product.quantity * product.productID.price}</Typography.Paragraph>
          </div>
        </Flex>
      </Flex>
      <Divider className="m-0 mt-6" />
    </>
  );
};

export default CheckoutDetail;
