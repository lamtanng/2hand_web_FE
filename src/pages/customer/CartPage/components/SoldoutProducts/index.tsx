import { DeleteOutlined } from '@ant-design/icons';
import { Checkbox, Divider, Flex, Typography, Image, InputNumber, Button, Modal } from 'antd';
import defaultPic from '../../../../../assets/blob.jpg';
import { CartItemProps } from '../../../../../types/cart.type';

const { confirm } = Modal;

const SoldoutProduct = ({
  soldoutProducts,
  handleDelete,
  checkedList
}: {
  soldoutProducts: CartItemProps[];
  handleDelete: (productID: string | undefined, oldCheckList: CartItemProps[]) => Promise<void>;
  checkedList: CartItemProps[]
}) => {

  const showConfirm = (product: CartItemProps | undefined) => {
    confirm({
      title: 'Do you want to delete this item?',
      onOk() {
        handleDelete(product?.productID._id, checkedList);
      },
      onCancel() {},
    });
  };

  return (
    <div className="mb-5 w-full rounded-md bg-white shadow-sm">
      <div className="px-8 py-6">
        <Typography.Paragraph className="m-0 text-base">Sold Out</Typography.Paragraph>
      </div>
      <Divider className="m-0" />
      {soldoutProducts.map((item: CartItemProps) => (
        <>
          <div className="bg-gray-100 px-8 py-6">
            <Flex>
              <Flex gap={'large'} id="product" className="w-1/2">
                <Checkbox disabled />
                <Flex gap={'large'}>
                  <Image
                    width={75}
                    alt=""
                    src={item.productID.image[0]}
                    fallback={defaultPic}
                    preview={false}
                    className="flex-shrink-0"
                  />
                  <Flex gap={'small'} vertical className="flex-grow-0">
                    <Typography.Paragraph className="m-0 text-base">{item.productID.name}</Typography.Paragraph>
                    <Typography.Paragraph className="m-0 text-base text-gray-500">
                      {item.productID.quality}
                    </Typography.Paragraph>
                  </Flex>
                </Flex>
              </Flex>
              <Flex justify="space-between" id="info" className="w-1/2">
                <div id="price" className="flex w-1/4 shrink-0 items-center justify-center">
                  <Typography.Paragraph className="m-0 text-base">
                    {new Intl.NumberFormat().format(item.productID.price)}
                  </Typography.Paragraph>
                </div>
                <div id="quantity" className="flex w-1/4 shrink-0 items-center justify-center">
                  <InputNumber defaultValue={0} disabled />
                </div>
                <div id="total" className="flex w-1/4 shrink-0 items-center justify-center">
                  <Typography.Paragraph className="m-0 text-base">
                    {new Intl.NumberFormat().format(item.productID.price * 0)}
                  </Typography.Paragraph>
                </div>
                <div id="actions" className="flex w-1/4 shrink-0 items-center justify-center">
                  <Button variant="link" color="danger" onClick={() => {showConfirm(item)}}>
                    <DeleteOutlined /> Delete
                  </Button>
                </div>
              </Flex>
            </Flex>
          </div>
          <Divider className="m-0" />
        </>
      ))}
    </div>
  );
};

export default SoldoutProduct;
