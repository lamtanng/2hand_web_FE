import { Button, Checkbox, Flex, Typography } from 'antd';

const Summary = ({checkedList, allCheckBoxHandler, checked}: {checkedList: any[], allCheckBoxHandler: (event: any) => void, checked: boolean}) => {
  return (
    <div id="summary" className="rounded-md bg-white p-8 shadow-sm">
      <Flex justify="space-between" align="center">
        <Flex gap={'middle'} align="center" className="w-1/2">
          <Checkbox onChange={allCheckBoxHandler} checked={checked} />
          <Button variant="link" color="default" className="p-0 text-base hover:text-inherit">
            Select All
          </Button>
          <Button variant="link" color="primary" className="p-0 text-base">
            Add to wishlist
          </Button>
        </Flex>
        <Flex gap={'middle'} align="center">
          <Typography.Paragraph className="m-0 text-base">
            Total price ({checkedList.length} {checkedList.length > 1 ? 'products' : 'product'}):
          </Typography.Paragraph>
          <Typography.Paragraph className="m-0 text-xl text-blue-600">0 VND</Typography.Paragraph>
          <Button type="primary" className="px-10 py-5 text-base">
            Checkout
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Summary;
