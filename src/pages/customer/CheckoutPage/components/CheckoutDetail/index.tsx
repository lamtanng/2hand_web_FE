import { Divider, Flex, Image, Typography } from 'antd';
import defaultPic from "../../../../../assets/blob.jpg"

const CheckoutDetail = ({product}: {product: any}) => {
  return (
    <>
      <Flex id="checkout-detail" key={product.productID} className="mt-6">
        <Flex gap={'large'} id="product" className="w-1/2">
          <Image width={'13%'} alt="" src="" fallback={defaultPic} preview={false} />
          <Flex gap={'small'} vertical>
            <Typography.Paragraph className="m-0 text-base">Product name</Typography.Paragraph>
            <Typography.Paragraph className="m-0 text-base text-gray-500">Quality</Typography.Paragraph>
          </Flex>
        </Flex>
        <Flex justify="space-between" id="info" className="w-1/2">
          <div id="price" className="flex w-1/4 shrink-0 items-center justify-center">
            <Typography.Paragraph className="m-0 text-base">0</Typography.Paragraph>
          </div>
          <div id="quantity" className="flex w-1/4 shrink-0 items-center justify-center">
            1
          </div>
          <div id="total" className="flex w-1/4 shrink-0 items-center justify-center">
            <Typography.Paragraph className="m-0 text-base">0</Typography.Paragraph>
          </div>
        </Flex>
      </Flex>
      <Divider className="m-0 mt-6" />
    </>
  );
};

export default CheckoutDetail;
