import { DeleteOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Flex, Image, InputNumber, Modal, Typography } from 'antd';
import defaultPic from '../../../../../assets/blob.jpg';
import { useDebouncedCallback } from 'use-debounce';
import { CartItemProps } from '../../../../../types/cart.type';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Link } from 'react-router-dom';
import { formattedCurrency } from '../../../../../utils/formattedCurrency';

const { confirm } = Modal;

const CartDetail = ({
  product,
  singleCheckBoxHandler,
  checkedList,
  handleDelete,
  handleQuantityChange,
}: {
  product: CartItemProps;
  singleCheckBoxHandler: (event: CheckboxChangeEvent) => void;
  checkedList: CartItemProps[];
  handleDelete: (productID: string | undefined, oldCheckList: CartItemProps[]) => Promise<void>;
  handleQuantityChange: (product: CartItemProps, value: number, oldCheckList: CartItemProps[]) => Promise<void>;
}) => {
  const debounced = useDebouncedCallback((value) => {
    handleQuantityChange(product, value, checkedList);
  }, 1000);
  const showConfirm = () => {
    confirm({
      title: 'Do you want to delete this item?',
      onOk() {
        handleDelete(product.productID._id, checkedList);
      },
      onCancel() {},
    });
  };
  return (
    <>
      <Flex id="cart-detail">
        <Flex gap={'large'} id="product" className="w-1/2">
          <Checkbox
            value={product}
            onChange={singleCheckBoxHandler}
            checked={
              checkedList.filter((item: CartItemProps) => item.productID._id === product.productID._id).length !== 0
            }
          />
          <Link to={`/${product.productID.slug}`} className="no-underline">
            <Flex gap={'large'}>
              <Image width={75} alt="" src={product.productID.image[0]} fallback={defaultPic} preview={false} />
              <Flex gap={'small'} vertical>
                <Typography.Paragraph className="m-0 text-base">{product.productID.name}</Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-base text-gray-500">
                  {product.productID.quality}
                </Typography.Paragraph>
              </Flex>
            </Flex>
          </Link>
        </Flex>
        <Flex justify="space-between" id="info" className="w-1/2">
          <div id="price" className="flex w-1/4 shrink-0 items-center justify-center">
            <Typography.Paragraph className="m-0 text-base">
              {formattedCurrency(product.productID.price)}
            </Typography.Paragraph>
          </div>
          <div id="quantity" className="flex w-1/4 shrink-0 items-center justify-center">
            <InputNumber
              min={1}
              max={product.productID.quantity}
              defaultValue={product.quantity}
              onChange={(value) => {
                value && value <= product.productID.quantity && debounced(value);
              }}
            />
          </div>
          <div id="total" className="flex w-1/4 shrink-0 items-center justify-center">
            <Typography.Paragraph className="m-0 text-base">
              {formattedCurrency(product.productID.price * product.quantity)}
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
