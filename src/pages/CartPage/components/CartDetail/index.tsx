import { DeleteOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Flex, Image, Typography } from 'antd';
import defaultPic from '../../../../assets/blob.jpg';
import NumberInput from '../../../../components/elements/NumberInput';

const CartDetail = ({product, singleCheckBoxHandler, checkedList}:{product: any, singleCheckBoxHandler: (event: any) => void, checkedList: any[]}) => {
  return (
    <>
      <Flex id="cart-detail">
        <Flex gap={'large'} id="product" className="w-1/2">
          <Checkbox
            value={product.productID}
            onChange={singleCheckBoxHandler}
            checked={checkedList.includes(product.productID)}
          />
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
            <NumberInput/>
          </div>
          <div id="total" className="flex w-1/4 shrink-0 items-center justify-center">
            <Typography.Paragraph className="m-0 text-base">0</Typography.Paragraph>
          </div>
          <div id="actions" className="flex w-1/4 shrink-0 items-center justify-center">
            <Button variant="link" color="primary">
              <DeleteOutlined /> Delete
            </Button>
          </div>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default CartDetail;
