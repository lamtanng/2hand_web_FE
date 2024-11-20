import { MessageOutlined, ShopOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Flex, Typography } from 'antd';
import CartDetail from '../CartDetail';
import { StoreProps } from '../../../../../types/store.type';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CartItemProps } from '../../../../../types/cart.type';
import { Link } from 'react-router-dom';
import useCartItem from './useCartItem';

const CartItem = ({
  group,
  groupCheckBoxHandler,
  checkedList,
  singleCheckBoxHandler,
  handleDelete,
  handleQuantityChange,
}: {
  group: { store: StoreProps; products: CartItemProps[] };
  groupCheckBoxHandler: (event: CheckboxChangeEvent) => void;
  checkedList: any[];
  singleCheckBoxHandler: (event: CheckboxChangeEvent) => void;
  handleDelete: (productID: string | undefined, oldCheckList: CartItemProps[]) => Promise<void>;
  handleQuantityChange: (product: CartItemProps, value: number, oldCheckList: CartItemProps[]) => Promise<void>;
}) => {
  const { profile } = useCartItem(JSON.stringify(group.store.userID));
  const isGroupChecked = group.products.every(
    (value: CartItemProps) =>
      checkedList.filter((item: CartItemProps) => item.productID._id === value.productID._id).length !== 0,
  )
    ? true
    : false;

  return (
    <div id="cart-item" key={group.store._id} className="mb-5 w-full rounded-md bg-white shadow-sm">
      <Flex align="center" id="shop" gap={'large'} className="px-8 pt-6">
        <Checkbox value={group.store._id} onChange={groupCheckBoxHandler} checked={isGroupChecked} />
        <Flex align="center" gap={'small'}>
          <ShopOutlined className="text-base" />
          <Link to={`/user/${profile?.slug}`}>
            <Typography.Paragraph className="m-0 text-base">{group.store.name}</Typography.Paragraph>
          </Link>
          <Button variant="text" color="primary" className="p-0 text-base hover:bg-transparent">
            <MessageOutlined />
          </Button>
        </Flex>
      </Flex>
      <Divider />
      {group.products.map((product: CartItemProps) => (
        <div key={product.productID._id} id="detail-container" className="px-8">
          {product.productID.quantity > 0 && (
            <CartDetail
              product={product}
              singleCheckBoxHandler={singleCheckBoxHandler}
              checkedList={checkedList}
              handleDelete={handleDelete}
              handleQuantityChange={handleQuantityChange}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CartItem;
