import { Button, Checkbox, Flex, Typography } from 'antd';
import { CartItemProps } from '../../../../../types/cart.type';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { formattedCurrency } from '../../../../../utils/formattedCurrency';

const Summary = ({
  checkedList,
  allCheckBoxHandler,
  checked,
  handleOnClick,
  itemAmount,
}: {
  checkedList: CartItemProps[];
  allCheckBoxHandler: (event: CheckboxChangeEvent) => void;
  checked: boolean;
  handleOnClick: () => void;
  itemAmount: number;
  totalPrice: number;
}) => {
  const totalPrice = checkedList
  .map((item: CartItemProps) => {
    return item.productID.price * item.quantity;
  })
  .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);
  return (
    <div id="summary" className="rounded-md bg-white p-8 shadow-sm">
      <Flex justify="space-between" align="center">
        <Flex gap={'middle'} align="center" className="w-1/2">
          <Checkbox onChange={allCheckBoxHandler} checked={checked} />
          <Button variant="link" color="default" className="p-0 text-base hover:text-inherit">
            Select All ({itemAmount})
          </Button>
          <Button variant="link" color="primary" className="p-0 text-base">
            Add to wishlist
          </Button>
        </Flex>
        <Flex gap={'middle'} align="center">
          <Typography.Paragraph className="m-0 text-base">
            Total price ({checkedList.length} {checkedList.length > 1 ? 'products' : 'product'}):
          </Typography.Paragraph>
          <Typography.Paragraph className="m-0 text-xl text-blue-600">{formattedCurrency(totalPrice)}</Typography.Paragraph>
          <Button type="primary" className="px-10 py-5 text-base" onClick={handleOnClick}>
            Checkout
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Summary;
