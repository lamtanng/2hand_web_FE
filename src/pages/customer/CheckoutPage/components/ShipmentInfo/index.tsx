import { Button, Divider, Flex, Input, Typography } from 'antd';
import { CartItemProps } from '../../../../../types/cart.type';
import useShipment from './useShipment';
import ShipModal from './components/ShipModal';
import eventEmitter from '../../../../../utils/eventEmitter';

const ShipmentInfo = ({
  product,
  shipment,
  finalShipment,
}: {
  product: CartItemProps[];
  shipment: any[];
  finalShipment: any;
  note: any;
}) => {
  const { isModalOpen, setIsModalOpen, showModal, totalPrice } = useShipment(product);

  const onChange = (e: any) => {
    const newNote = {
      store: product[0].productID.storeID,
      note: e.target.value,
    };
    eventEmitter.emit('addNote', newNote);
  };

  return (
    <>
      <div id="shipment-info" className="mb-6 w-full rounded-md bg-blue-50">
        <div className="p-8">
          <Flex gap={'large'} align="center">
            <Flex gap={'middle'} align="center" className="w-2/5">
              <Typography.Paragraph className="w-1/10 m-0 text-base">Notes: </Typography.Paragraph>
              <Input className="w-5/6 text-base" onChange={onChange} />
            </Flex>
            <Flex className="w-3/5" gap={'middle'} align="center">
              <Typography.Paragraph className="m-0 w-1/5 text-base">Shipment method:</Typography.Paragraph>
              <Flex gap={'middle'} justify="space-between" align="center" className="w-4/5">
                <Typography.Paragraph className="m-0 text-base">
                  {finalShipment?.service_type_id === 2 ? 'Light weight' : 'Heavy weight'}
                </Typography.Paragraph>
                <Button
                  variant="text"
                  color="primary"
                  className="m-0 p-0 text-base hover:bg-transparent"
                  onClick={showModal}
                >
                  Change
                </Button>
                <Typography.Paragraph className="m-0 text-base">
                  {new Intl.NumberFormat().format(finalShipment?.total)} VND
                </Typography.Paragraph>
              </Flex>
            </Flex>
          </Flex>
        </div>
        <Divider className="m-0" variant="dashed" />
        <Flex gap={'middle'} justify="end" className="p-8">
          <Typography.Paragraph className="m-0 text-base">
            Total Price ({product.length} {product.length > 1 ? 'products' : 'product'}):
          </Typography.Paragraph>
          <Typography.Title level={4} className="m-0 font-normal text-blue-600">
            {new Intl.NumberFormat().format(totalPrice + finalShipment?.total)} VND
          </Typography.Title>
        </Flex>
      </div>
      <ShipModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} shipment={shipment} />
    </>
  );
};

export default ShipmentInfo;
