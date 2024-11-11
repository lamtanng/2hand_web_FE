import { MessageOutlined, ShopOutlined } from "@ant-design/icons"
import { Button, Divider, Flex, Typography, Image } from "antd"
import defaultPic from '../../../../../../../assets/blob.jpg';


const OrderInfo = () => {
  return (
    <div id="order-info" className="px-12 py-5">
        <div id="order" className="py-6">
          <div id="order-summary">
            <Flex id="shop-info" align="center" gap={'small'} className="w-1/3">
              <ShopOutlined />
              <Typography.Title level={5} className="m-0 inline truncate">
                Shop nameShop name
              </Typography.Title>
              <Button type="primary" className="px-2 py-1 text-xs">
                <MessageOutlined /> Chat
              </Button>
              <Button variant="outlined" className="px-2 py-1 text-xs">
                <ShopOutlined /> Visit shop
              </Button>
            </Flex>
          </div>
          <Divider />
          <div id="order-detail">
            <div id="product-info">
              <Flex gap={'middle'}>
                <Image width={75} preview={false} alt="" src="" fallback={defaultPic} />
                <div>
                  <Typography.Title level={5} className="m-0">
                    Product name
                  </Typography.Title>
                  <Typography.Paragraph className="text-xs">quantity</Typography.Paragraph>
                </div>
              </Flex>
            </div>
          </div>
          <Divider />
          <div></div>
          <div id="total-price">
            <Flex gap={'middle'} vertical>
              <Flex justify="end" align="center" gap={'middle'}>
                <Typography.Paragraph className="m-0">Total goods price:</Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-base">0 VND</Typography.Paragraph>
              </Flex>
              <Flex justify="end" align="center" gap={'middle'}>
                <Typography.Paragraph className="m-0">Shipment cost:</Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-base">0 VND</Typography.Paragraph>
              </Flex>
              <Flex justify="end" align="center" gap={'middle'}>
                <Typography.Paragraph className="m-0">Total price:</Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-xl text-blue-700">0 VND</Typography.Paragraph>
              </Flex>
              <Flex justify="end" align="center" gap={'middle'}>
                <Typography.Paragraph className="m-0">Payment method:</Typography.Paragraph>
                <Typography.Paragraph className="m-0 text-base">Cash on delivery</Typography.Paragraph>
              </Flex>
            </Flex>
          </div>
        </div>
      </div>
  )
}

export default OrderInfo
