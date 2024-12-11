import {
  CalendarOutlined,
  DownloadOutlined,
  FileTextOutlined,
  PercentageOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { Button, Divider, Flex, Typography } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
import useAccountPage from '../AccountPage/useAccountPage';
import useStoreDashboardPage from './useStoreDashboardPage';
import { accountUrls } from '../../../constants/urlPaths/customer/accountUrls';
import StatisticCard from '../../../components/elements/Cards/StatisticCard';
import { formattedOrderRate } from '../../../utils/formattedOrderRate';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

const StoreDashboard = () => {
  const currentDate = new Date();
  const { profile } = useAccountPage();
  const { isLoading, products, totalDeliveredOrders, totalOrders } = useStoreDashboardPage(profile);
  const statistics = [
    {
      data: products,
      date: currentDate,
      icon: <ShoppingOutlined />,
      isLoading: isLoading,
      label: 'Number of Products',
      link: `/${accountUrls.accountUrl}/${accountUrls.productsUrl}`,
    },
    {
      data: totalOrders,
      date: currentDate,
      icon: <FileTextOutlined />,
      isLoading: isLoading,
      label: 'Number of Orders',
      link: `/${accountUrls.accountUrl}/${accountUrls.orderUrl}`,
    },
    {
      data: formattedOrderRate(totalDeliveredOrders, totalOrders),
      date: currentDate,
      icon: <PercentageOutlined />,
      isLoading: isLoading,
      label: 'Succesful Order Rate',
      link: `/${accountUrls.accountUrl}/${accountUrls.orderUrl}`,
    },
  ];
  return (
    <div id="container" className="px-12 py-5">
      <div id="title">
        <Typography.Title level={3}>Dashboard</Typography.Title>
        <Typography.Paragraph>An overview of your store's activity.</Typography.Paragraph>
      </div>
      <Divider />
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
      <div className="mb-6 w-full">
        <Flex justify="space-between" wrap className="w-full" gap={'large'}>
          {statistics.map((item: any) => (
            <StatisticCard
              data={item.data}
              date={item.date}
              icon={item.icon}
              isLoading={item.isLoading}
              label={item.label}
              link={item.link}
            />
          ))}
        </Flex>
      </div>
      <Flex justify="space-between">
        <div className="mb-6 w-fit">
          <Typography.Title level={4} className="m-0 mb-6">
            Annual Revenue
          </Typography.Title>
          <LineChart width={450} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div className="mb-6 w-fit">
          <Typography.Title level={4} className="m-0 mb-6">
            Monthly Orders by State
          </Typography.Title>
          <BarChart width={450} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </div>
      </Flex>
    </div>
  );
};

export default StoreDashboard;
