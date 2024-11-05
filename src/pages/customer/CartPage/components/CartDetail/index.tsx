import { DeleteOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Flex, Image, InputNumber, Modal, Typography } from 'antd';
import defaultPic from '../../../../../assets/blob.jpg';
import useCart from '../../useCartPage';
import { useDebouncedCallback } from 'use-debounce';
import { CartItemProps } from '../../../../../types/cart.type';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import eventEmitter from '../../../../../utils/eventEmitter';

const { confirm } = Modal;

const CartDetail = ({
  product,
  singleCheckBoxHandler,
  checkedList,
}: {
  product: CartItemProps;
  singleCheckBoxHandler: (event: CheckboxChangeEvent) => void;
  checkedList: any[];
}) => {
  const { handleDelete, handleQuantityChange,  } = useCart();
  const debounced = useDebouncedCallback((value) => {
    handleQuantityChange(product.productID._id, value);
    eventEmitter.emit('qualityChange');
  }, 1000);
  const showConfirm = () => {
    confirm({
      title: 'Do you want to delete this item?',
      onOk() {
        handleDelete(product.productID._id);
      },
      onCancel() {},
    });
  };
  return (
    <>
      <Flex id="cart-detail">
        <Flex gap={'large'} id="product" className="w-1/2">
          <Checkbox value={product} onChange={singleCheckBoxHandler} checked={checkedList.includes(product)} />
          <Image width={'13%'} alt="" src="" fallback={defaultPic} preview={false} />
          <Flex gap={'small'} vertical>
            <Typography.Paragraph className="m-0 text-base">{product.productID.name}</Typography.Paragraph>
            <Typography.Paragraph className="m-0 text-base text-gray-500">
              {product.productID.quality}
            </Typography.Paragraph>
          </Flex>
        </Flex>
        <Flex justify="space-between" id="info" className="w-1/2">
          <div id="price" className="flex w-1/4 shrink-0 items-center justify-center">
            <Typography.Paragraph className="m-0 text-base">
              {new Intl.NumberFormat().format(product.productID.price)}
            </Typography.Paragraph>
          </div>
          <div id="quantity" className="flex w-1/4 shrink-0 items-center justify-center">
            <InputNumber
              min={1}
              max={product.productID.quantity}
              defaultValue={product.quantity}
              onChange={(value) => {
                debounced(value);
              }}
            />
          </div>
          <div id="total" className="flex w-1/4 shrink-0 items-center justify-center">
            <Typography.Paragraph className="m-0 text-base">
              {new Intl.NumberFormat().format(product.productID.price * product.quantity)}
            </Typography.Paragraph>
          </div>
          <div id="actions" className="flex w-1/4 shrink-0 items-center justify-center">
            <Button variant="link" color="danger" onClick={showConfirm}>
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
