import {
  AccountBookOutlined,
  BarChartOutlined,
  CalendarOutlined,
  DashboardOutlined,
  DownloadOutlined,
  FileTextOutlined,
  LineChartOutlined,
  PercentageOutlined,
  PieChartOutlined,
  ReloadOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { Button, Card, Empty, Spin, Typography } from 'antd';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import StatisticCard from '../../../components/elements/Cards/StatisticCard';
import { accountUrls } from '../../../constants/urlPaths/customer/accountUrls';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { formattedCurrency } from '../../../utils/formattedCurrency';
import { formattedOrderRate } from '../../../utils/formattedOrderRate';
import useAccountPage from '../AccountPage/useAccountPage';
import './StoreDashboard.css';
import useStoreDashboardPage from './useStoreDashboardPage';

// Mock data for charts
const revenueData = [
  { name: 'Jan', revenue: 2400 },
  { name: 'Feb', revenue: 1398 },
  { name: 'Mar', revenue: 9800 },
  { name: 'Apr', revenue: 3908 },
  { name: 'May', revenue: 4800 },
  { name: 'Jun', revenue: 3800 },
  { name: 'Jul', revenue: 4300 },
];

const ordersByStageData = [
  { name: 'Pending', value: 25 },
  { name: 'Confirmed', value: 35 },
  { name: 'Delivering', value: 15 },
  { name: 'Delivered', value: 20 },
  { name: 'Cancelled', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

const StoreDashboard = () => {
  const currentDate = new Date();
  const { profile } = useAccountPage();
  const { isLoading, statistics } = useStoreDashboardPage(profile);
  const totalOrders = statistics?.orders.reduce((total, order) => total + order.count, 0) || 0;
  const totalDeliveredOrders = statistics?.orders.find((item: any) => item._id === OrderStage.Delivered);
  const totalCancelOrders = statistics?.orders.find((item: any) => item._id === OrderStage.Cancelled);

  const storeStatistics = [
    {
      data: statistics?.productTotal || 0,
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
      data: formattedCurrency(totalDeliveredOrders?.totalAmount || 0),
      date: currentDate,
      icon: <AccountBookOutlined />,
      isLoading: isLoading,
      label: 'Revenue',
      link: `/${accountUrls.accountUrl}/${accountUrls.orderUrl}`,
    },
    {
      data: formattedOrderRate(totalDeliveredOrders?.count, totalOrders),
      date: currentDate,
      icon: <PercentageOutlined />,
      isLoading: isLoading,
      label: 'Successful Order Rate',
      link: `/${accountUrls.accountUrl}/${accountUrls.orderUrl}`,
    },
    {
      data: formattedOrderRate(totalCancelOrders?.count, totalOrders),
      date: currentDate,
      icon: <PercentageOutlined />,
      isLoading: isLoading,
      label: 'Cancel Order Rate',
      link: `/${accountUrls.accountUrl}/${accountUrls.orderUrl}`,
    },
  ];

  return (
    <div className="store-dashboard-container px-4 py-6 md:px-12 md:py-8">
      <div className="dashboard-header">
        <Typography.Title level={3} className="dashboard-title">
          <DashboardOutlined className="mr-2" /> Store Dashboard
        </Typography.Title>
        <Typography.Paragraph className="dashboard-subtitle">
          An overview of your store's performance and activity as of{' '}
          {currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography.Paragraph>
      </div>

      <div className="dashboard-actions">
        <Button icon={<CalendarOutlined />}>Date Range</Button>
        <Button icon={<ReloadOutlined />} loading={isLoading}>
          Refresh
        </Button>
        <Button type="primary" icon={<DownloadOutlined />}>
          Export Report
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-64 w-full items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="statistics-container">
            {storeStatistics.map((item, index) => (
              <StatisticCard
                key={index}
                data={item.data}
                date={item.date}
                icon={item.icon}
                isLoading={item.isLoading}
                label={item.label}
                link={item.link}
              />
            ))}
          </div>

          <div className="charts-container">
            <Card className="chart-card">
              <div className="mb-4 flex items-center">
                <LineChartOutlined className="mr-2 text-xl text-blue-500" />
                <Typography.Title level={4} className="chart-title m-0">
                  Monthly Revenue
                </Typography.Title>
              </div>
              {statistics?.productTotal ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#666', fontSize: 12 }} />
                    <RechartsTooltip
                      formatter={(value: any) => [`$${value}`, 'Revenue']}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        padding: '10px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        border: 'none',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#1890ff"
                      strokeWidth={2}
                      dot={{ stroke: '#1890ff', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <Empty description="No revenue data available" />
              )}
            </Card>

            <Card className="chart-card">
              <div className="mb-4 flex items-center">
                <PieChartOutlined className="mr-2 text-xl text-green-500" />
                <Typography.Title level={4} className="chart-title m-0">
                  Orders by Stage
                </Typography.Title>
              </div>
              {statistics?.orders?.length && statistics?.orders?.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ordersByStageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {ordersByStageData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value: any) => [`${value} orders`, 'Count']}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        padding: '10px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        border: 'none',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Empty description="No order data available" />
              )}
            </Card>
          </div>

          <Card className="chart-card">
            <div className="mb-4 flex items-center">
              <BarChartOutlined className="mr-2 text-xl text-orange-500" />
              <Typography.Title level={4} className="chart-title m-0">
                Orders by Stage
              </Typography.Title>
            </div>
            {statistics?.orders?.length && statistics?.orders?.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={statistics.orders} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="_id" tick={{ fill: '#666', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#666', fontSize: 12 }} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      padding: '10px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                      border: 'none',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" name="Number of Orders" fill="#1890ff" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="totalAmount" name="Total Amount ($)" fill="#52c41a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Empty description="No order data available" />
            )}
          </Card>
        </>
      )}
    </div>
  );
};

export default StoreDashboard;
