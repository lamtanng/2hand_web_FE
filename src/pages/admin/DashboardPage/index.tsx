import { Button, Flex, Tooltip, Typography } from 'antd';
import { Bar, BarChart, CartesianGrid, Legend,  XAxis, YAxis } from 'recharts';
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
import StatisticCard from './components/StatisticCard';

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
        <Typography.Title level={2} className="m-0 mb-2 text-blue-600">
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
        <Flex justify="space-between" wrap className='gap-2'>
          <StatisticCard
            title={'Number of Users'}
            icon={<UserOutlined />}
            data={statistics?.userTotal}
            date={currentDate.toDateString()}
          />
          <StatisticCard
            title={'Number of Products'}
            icon={<ShoppingOutlined />}
            data={statistics?.productTotal}
            date={currentDate.toDateString()}
          />
          <StatisticCard
            title={'Number of Orders'}
            icon={<FileTextOutlined />}
            data={totalOrders}
            date={currentDate.toDateString()}
          />
          <StatisticCard
            title={'Succesful Order Rate'}
            icon={<PercentageOutlined />}
            data={formattedOrderRate(totalDeliveredOrders?.count, totalOrders)}
            date={currentDate.toDateString()}
          />
          <StatisticCard
            title={'Cancel Order Rate'}
            icon={<PercentageOutlined />}
            data={formattedOrderRate(totalCancelOrders?.count, totalOrders)}
            date={currentDate.toDateString()}
          />
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
          <Typography.Title level={5} className="m-0 mt-3 text-center text-blue-600">
            Orders by Stages Chart
          </Typography.Title>
        </div>
      </Flex>
    </div>
  );
}

export default DashboardPage;
