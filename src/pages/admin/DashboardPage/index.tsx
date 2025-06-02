import { Button, Flex, Tooltip, Typography, Row, Col, Card, Spin, Table, Avatar, Space, Tabs } from 'antd';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  CalendarOutlined,
  DownloadOutlined,
  FileTextOutlined,
  PercentageOutlined,
  ShoppingOutlined,
  UserOutlined,
  DashboardOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ShopOutlined,
  StarOutlined,
  SyncOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import useDashboard from './useDashboard';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { formattedOrderRate } from '../../../utils/formattedOrderRate';
import StatisticCard from './components/StatisticCard';
import { formattedCurrency } from '../../../utils/formattedCurrency';
import './DashboardPage.css';

const currentDate = new Date();
const formattedDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(currentDate);

// Mock data for store statistics
const topStores = [
  { id: 1, name: 'Fashion Store', owner: 'John Doe', products: 128, sales: 9850, rating: 4.8 },
  { id: 2, name: 'Tech World', owner: 'Jane Smith', products: 95, sales: 7620, rating: 4.7 },
  { id: 3, name: 'Home Essentials', owner: 'Robert Brown', products: 210, sales: 6540, rating: 4.5 },
  { id: 4, name: 'Sports Center', owner: 'Emily Wilson', products: 76, sales: 5890, rating: 4.6 },
  { id: 5, name: 'Kids Paradise', owner: 'Michael Johnson', products: 150, sales: 4950, rating: 4.4 },
];

// Mock data for store performance over time
const storePerformanceData = [
  { month: 'Jan', activeStores: 120, newStores: 15, revenue: 45000 },
  { month: 'Feb', activeStores: 125, newStores: 12, revenue: 48000 },
  { month: 'Mar', activeStores: 130, newStores: 18, revenue: 52000 },
  { month: 'Apr', activeStores: 140, newStores: 22, revenue: 58000 },
  { month: 'May', activeStores: 155, newStores: 25, revenue: 62000 },
  { month: 'Jun', activeStores: 165, newStores: 20, revenue: 68000 },
];

// Mock data for store categories distribution
const storeCategoriesData = [
  { name: 'Fashion', value: 35 },
  { name: 'Electronics', value: 25 },
  { name: 'Home & Garden', value: 15 },
  { name: 'Sports', value: 10 },
  { name: 'Toys & Kids', value: 8 },
  { name: 'Others', value: 7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

function DashboardPage() {
  const { statistics, isLoading } = useDashboard();
  const data = statistics?.orders;
  const totalOrders = statistics?.orders?.reduce((total, order) => total + order.count, 0) || 0;
  const totalDeliveredOrders = statistics?.orders?.find((item: any) => item._id === OrderStage.Delivered);
  const totalCancelOrders = statistics?.orders?.find((item: any) => item._id === OrderStage.Cancelled);

  // Calculate some trend indicators (mock data for demonstration)
  const userTrend = 12.5; // 12.5% increase
  const productTrend = 8.3; // 8.3% increase
  const orderTrend = -3.2; // 3.2% decrease
  const successTrend = 5.1; // 5.1% increase
  const cancelTrend = 2.7; // 2.7% increase
  const storeTrend = 15.2; // 15.2% increase

  // Table columns for top stores
  const storeColumns = [
    {
      title: 'Store',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Flex align="center" gap="small">
          <Avatar style={{ backgroundColor: '#1890ff' }} icon={<ShopOutlined />} />
          <Typography.Text strong>{text}</Typography.Text>
        </Flex>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      sorter: (a: any, b: any) => a.products - b.products,
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
      key: 'sales',
      render: (sales: number) => formattedCurrency(sales),
      sorter: (a: any, b: any) => a.sales - b.sales,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <Flex align="center" gap="small">
          <StarOutlined style={{ color: '#fadb14' }} />
          <span>{rating.toFixed(1)}</span>
        </Flex>
      ),
      sorter: (a: any, b: any) => a.rating - b.rating,
    },
  ];

  return (
    <div className="dashboard-container">
      <Card className="mb-6 border-0 shadow-md transition-all hover:shadow-lg">
        <Flex align="center" gap="middle">
          <div>
            <Typography.Title level={2} className="m-0 mb-2 flex items-center text-blue-600">
              <DashboardOutlined className="mr-2" /> Dashboard
            </Typography.Title>
            <Typography.Paragraph className="m-0 text-base text-gray-500">
              An overview of the system's activity as of {formattedDate}
            </Typography.Paragraph>
          </div>
          <div className="ml-auto">
            <Flex gap="small">
              <Button icon={<CalendarOutlined />} className="border border-gray-300">
                Date Range
              </Button>
              <Button type="primary" icon={<DownloadOutlined />} className="bg-blue-500 hover:bg-blue-600">
                Export Report
              </Button>
            </Flex>
          </div>
        </Flex>
      </Card>

      {isLoading ? (
        <div className="flex h-64 w-full items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="mb-4">
              <StatisticCard
                title="Users"
                icon={<UserOutlined className="text-2xl" />}
                data={statistics?.userTotal || 0}
                date={formattedDate}
                trend={userTrend}
                trendIcon={userTrend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                trendColor={userTrend >= 0 ? 'text-green-500' : 'text-red-500'}
                progressPercent={75}
                progressColor="#1890ff"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="mb-4">
              <StatisticCard
                title="Products"
                icon={<ShoppingOutlined className="text-2xl" />}
                data={statistics?.productTotal || 0}
                date={formattedDate}
                trend={productTrend}
                trendIcon={productTrend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                trendColor={productTrend >= 0 ? 'text-green-500' : 'text-red-500'}
                progressPercent={65}
                progressColor="#722ed1"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="mb-4">
              <StatisticCard
                title="Orders"
                icon={<FileTextOutlined className="text-2xl" />}
                data={totalOrders}
                date={formattedDate}
                trend={orderTrend}
                trendIcon={orderTrend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                trendColor={orderTrend >= 0 ? 'text-green-500' : 'text-red-500'}
                progressPercent={45}
                progressColor="#fa8c16"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="mb-4">
              <StatisticCard
                title="Stores"
                icon={<ShopOutlined className="text-2xl" />}
                data={statistics?.storeTotal || 0}
                date={formattedDate}
                trend={storeTrend}
                trendIcon={storeTrend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                trendColor={storeTrend >= 0 ? 'text-green-500' : 'text-red-500'}
                progressPercent={80}
                progressColor="#13c2c2"
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={4} className="mb-4">
              <StatisticCard
                title="Success Rate"
                icon={<PercentageOutlined className="text-2xl" />}
                data={formattedOrderRate(totalDeliveredOrders?.count, totalOrders)}
                date={formattedDate}
                trend={successTrend}
                trendIcon={successTrend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                trendColor={successTrend >= 0 ? 'text-green-500' : 'text-red-500'}
                progressPercent={successTrend > 0 ? 70 : 30}
                progressColor="#52c41a"
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={4} className="mb-4">
              <StatisticCard
                title="Cancel Rate"
                icon={<PercentageOutlined className="text-2xl" />}
                data={formattedOrderRate(totalCancelOrders?.count, totalOrders)}
                date={formattedDate}
                trend={cancelTrend}
                trendIcon={cancelTrend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                trendColor={cancelTrend >= 0 ? 'text-red-500' : 'text-green-500'}
                progressPercent={cancelTrend > 0 ? 30 : 70}
                progressColor="#f5222d"
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} lg={16}>
              <Card
                className="border-0 shadow-md transition-all hover:shadow-lg"
                title={
                  <Flex align="center">
                    <FileTextOutlined className="mr-2 text-blue-500" />
                    <Typography.Title level={4} className="m-0">
                      Orders by Stages
                    </Typography.Title>
                    <Tooltip title="Shows the distribution of orders across different stages and their total amounts">
                      <InfoCircleOutlined className="ml-2 text-gray-400 hover:text-blue-500" />
                    </Tooltip>
                  </Flex>
                }
                extra={
                  <Button icon={<SyncOutlined />} size="small">
                    Refresh
                  </Button>
                }
              >
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data || []} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="_id"
                      tick={{ fill: '#666', fontSize: 12 }}
                      tickLine={{ stroke: '#ccc' }}
                      axisLine={{ stroke: '#ccc' }}
                    />
                    <YAxis
                      tick={{ fill: '#666', fontSize: 12 }}
                      tickLine={{ stroke: '#ccc' }}
                      axisLine={{ stroke: '#ccc' }}
                    />
                    <RechartsTooltip
                      cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        padding: '10px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        border: 'none',
                      }}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: '20px' }}
                      formatter={(value) => <span className="text-gray-700">{value}</span>}
                    />
                    <Bar
                      dataKey="count"
                      name="Number of Orders"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                    <Bar
                      dataKey="totalAmount"
                      name="Total Amount ($)"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card
                className="store-stats-card h-full border-0 shadow-md transition-all hover:shadow-lg"
                title={
                  <Flex align="center">
                    <ShopOutlined className="mr-2 text-blue-500" />
                    <Typography.Title level={4} className="m-0">
                      Store Categories
                    </Typography.Title>
                  </Flex>
                }
              >
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={storeCategoriesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        animationDuration={1500}
                      >
                        {storeCategoriesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        formatter={(value: any) => [`${value} stores`, 'Count']}
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
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24}>
              <Card
                className="border-0 shadow-md transition-all hover:shadow-lg"
                title={
                  <Flex align="center">
                    <ShopOutlined className="mr-2 text-blue-500" />
                    <Typography.Title level={4} className="m-0">
                      Store Performance
                    </Typography.Title>
                  </Flex>
                }
              >
                <Tabs
                  defaultActiveKey="1"
                  items={[
                    {
                      key: '1',
                      label: 'Growth Metrics',
                      children: (
                        <div className="store-performance-chart">
                          <ResponsiveContainer width="100%" height={350}>
                            <LineChart
                              data={storePerformanceData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="month" />
                              <YAxis yAxisId="left" />
                              <YAxis yAxisId="right" orientation="right" />
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
                              <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="activeStores"
                                stroke="#1890ff"
                                activeDot={{ r: 8 }}
                                name="Active Stores"
                              />
                              <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="newStores"
                                stroke="#13c2c2"
                                name="New Stores"
                              />
                              <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="revenue"
                                stroke="#52c41a"
                                name="Revenue ($)"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      ),
                    },
                    {
                      key: '2',
                      label: 'Top Performing Stores',
                      children: (
                        <Table
                          dataSource={topStores}
                          columns={storeColumns}
                          rowKey="id"
                          pagination={false}
                          className="top-stores-table"
                        />
                      ),
                    },
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
