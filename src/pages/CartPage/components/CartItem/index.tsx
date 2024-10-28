import { MessageOutlined, ShopOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Flex, Typography } from 'antd';
import CartDetail from '../CartDetail';

const CartItem = ({
  group,
  groupCheckBoxHandler,
  checkedList,
  singleCheckBoxHandler,
}: {
  group: any;
  groupCheckBoxHandler: (event: any) => void;
  checkedList: any[];
  singleCheckBoxHandler: (event: any) => void;
}) => {
  const insertedList = group.products.map((product: any) => {
    return product.productID;
  });
  const isGroupChecked = insertedList.every((value: any) => checkedList.includes(value)) ? true : false;

  return (
    <div id="cart-item" key={group.shop.id} className="mb-5 w-full rounded-md bg-white shadow-sm">
      <Flex align="center" id="shop" gap={'large'} className="px-8 pt-6">
        <Checkbox value={group.shop.id} onChange={groupCheckBoxHandler} checked={isGroupChecked} />
        <Flex align="center" gap={'small'}>
          <ShopOutlined className="text-base" />
          <Typography.Paragraph className="m-0 text-base">Shop name</Typography.Paragraph>
          <Button variant="text" color="primary" className="p-0 text-base hover:bg-transparent">
            <MessageOutlined />
          </Button>
        </Flex>
      </Flex>
      <Divider />
      {group.products.map((product: any) => (
        <div key={product.productID} id="detail-container" className="px-8">
          <CartDetail product={product} singleCheckBoxHandler={singleCheckBoxHandler} checkedList={checkedList} />
        </div>
      ))}
    </div>
  );
};

export default CartItem;
