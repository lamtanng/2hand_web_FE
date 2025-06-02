import { Button, Flex, Tooltip, Typography, Row, Col, Card, Spin } from 'antd';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
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
} from '@ant-design/icons';
import useDashboard from './useDashboard';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { formattedOrderRate } from '../../../utils/formattedOrderRate';
import StatisticCard from './components/StatisticCard';

const currentDate = new Date();
const formattedDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(currentDate);

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
            <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={4} className="mb-4">
              <StatisticCard
                title="Users"
                icon={<UserOutlined className="text-blue-500" />}
                data={statistics?.userTotal || 0}
                date={formattedDate}
                trend={userTrend}
                trendIcon={userTrend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                trendColor={userTrend >= 0 ? 'text-green-500' : 'text-red-500'}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={4} className="mb-4">
              <StatisticCard
                title="Products"
                icon={<ShoppingOutlined className="text-purple-500" />}
                data={statistics?.productTotal || 0}
                date={formattedDate}
                trend={productTrend}
                trendIcon={productTrend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                trendColor={productTrend >= 0 ? 'text-green-500' : 'text-red-500'}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={4} className="mb-4">
              <StatisticCard
                title="Orders"
                icon={<FileTextOutlined className="text-orange-500" />}
                data={totalOrders}
                date={formattedDate}
                trend={orderTrend}
                trendIcon={orderTrend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                trendColor={orderTrend >= 0 ? 'text-green-500' : 'text-red-500'}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={6} className="mb-4">
              <StatisticCard
                title="Success Rate"
                icon={<PercentageOutlined className="text-green-500" />}
                data={formattedOrderRate(totalDeliveredOrders?.count, totalOrders)}
                date={formattedDate}
                trend={successTrend}
                trendIcon={successTrend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                trendColor={successTrend >= 0 ? 'text-green-500' : 'text-red-500'}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={6} className="mb-4">
              <StatisticCard
                title="Cancel Rate"
                icon={<PercentageOutlined className="text-red-500" />}
                data={formattedOrderRate(totalCancelOrders?.count, totalOrders)}
                date={formattedDate}
                trend={cancelTrend}
                trendIcon={cancelTrend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                trendColor={cancelTrend >= 0 ? 'text-red-500' : 'text-green-500'}
              />
            </Col>
          </Row>

          <Card className="mb-6 border-0 shadow-md transition-all hover:shadow-lg">
            <Typography.Title level={4} className="mb-6 text-center text-blue-600">
              Orders by Stages Chart
            </Typography.Title>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data || []}>
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
        </>
      )}
    </div>
  );
}

export default DashboardPage;
