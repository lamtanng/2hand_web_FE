import { Button, Flex, Tooltip, Typography } from 'antd';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  CalendarOutlined,
  DownloadOutlined,
  FileTextOutlined,
  PercentageOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import useDashboard from './useDashboard';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { formattedOrderRate } from '../../../utils/formattedOrderRate';
import { Link } from 'react-router-dom';


const currentDate = new Date();

function DashboardPage() {
  const { statistics } = useDashboard();
  const data = statistics?.orders;
  const totalOrders = statistics?.orders.reduce((total, order) => total + order.count, 0);
  const totalDeliveredOrders = statistics?.orders.find((item: any) => item._id === OrderStage.Delivered);
  const totalCancelOrders = statistics?.orders.find((item: any) => item._id === OrderStage.Cancelled);

  return (
    <div>
      <div className="mb-6 rounded-xl bg-white p-8 shadow-sm">
        <Typography.Title level={2} className="m-0 mb-2">
          Dashboard
        </Typography.Title>
        <Typography.Paragraph className="m-0 text-base">An overview of the system's activity.</Typography.Paragraph>
      </div>
      <div className="mb-6">
        <Flex justify="end" gap={'middle'}>
          <Button>
            <CalendarOutlined /> Date
          </Button>
          <Button type="primary">
            <DownloadOutlined /> Export
          </Button>
        </Flex>
      </div>
      <div className="mb-6">
        <Flex justify="space-evenly" gap={'large'} wrap>
          <Flex vertical className="w-[30%] gap-12 rounded-xl bg-white p-8 shadow-sm">
            <Link to={`/ad/accountList`} className='text-base'>
              <UserOutlined /> Number of Users
            </Link>
            <Flex justify="space-between" align="baseline">
              <Typography.Title className="m-0">{statistics?.userTotal}</Typography.Title>
              <Typography.Paragraph className="m-0">{currentDate.toDateString()}</Typography.Paragraph>
            </Flex>
          </Flex>
          <Flex vertical className="w-[30%] gap-12 rounded-xl bg-white p-8 shadow-sm">
            <Link to={'/ad/productList'} className="text-base">
              <ShoppingOutlined /> Number of Products
            </Link>
            <Flex justify="space-between" align="baseline">
              <Typography.Title className="m-0">{statistics?.productTotal}</Typography.Title>
              <Typography.Paragraph className="m-0">{currentDate.toDateString()}</Typography.Paragraph>
            </Flex>
          </Flex>
          <Flex vertical className="w-[30%] gap-12 rounded-xl bg-white p-8 shadow-sm">
            <Link to={'/ad/orderList'} className="m-0 text-base">
              <FileTextOutlined /> Number of Orders
            </Link>
            <Flex justify="space-between" align="baseline">
              <Typography.Title className="m-0">{totalOrders}</Typography.Title>
              <Typography.Paragraph className="m-0">{currentDate.toDateString()}</Typography.Paragraph>
            </Flex>
          </Flex>
          <Flex vertical className="w-[30%] gap-12 rounded-xl bg-white p-8 shadow-sm">
            <Typography.Paragraph className="m-0 text-base">
              <PercentageOutlined /> Succesful Order Rate
            </Typography.Paragraph>
            <Flex justify="space-between" align="baseline">
              <Typography.Title className="m-0">
                {formattedOrderRate(totalDeliveredOrders?.count, totalOrders)}
              </Typography.Title>
              <Typography.Paragraph className="m-0">{currentDate.toDateString()}</Typography.Paragraph>
            </Flex>
          </Flex>
          <Flex vertical className="w-[30%] gap-12 rounded-xl bg-white p-8 shadow-sm">
            <Typography.Paragraph className="m-0 text-base">
              <PercentageOutlined /> Cancel Order Rate
            </Typography.Paragraph>
            <Flex justify="space-between" align="baseline">
              <Typography.Title className="m-0">
                {formattedOrderRate(totalCancelOrders?.count, totalOrders)}
              </Typography.Title>
              <Typography.Paragraph className="m-0">{currentDate.toDateString()}</Typography.Paragraph>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <Flex justify="space-evenly">
        {/* <div className="mb-6 w-fit rounded-xl bg-white p-8 shadow-sm">
          <LineChart width={610} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div> */}
        <div className="mb-6 w-fit rounded-xl bg-white p-8 shadow-sm">
          <BarChart width={980} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
          <Typography.Title level={5} className='m-0 mt-3 text-center text-blue-600'>Orders by Stages Chart</Typography.Title>
        </div>
      </Flex>
    </div>
  );
}

export default DashboardPage;
