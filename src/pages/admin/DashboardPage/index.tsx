import { Button, Flex, Tooltip, Typography } from 'antd';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  CalendarOutlined,
  DownloadOutlined,
  FileTextOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';

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

function DashboardPage() {
  const currentDate = new Date();
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
        <Flex gap={'large'}>
          <Flex vertical className="w-full gap-12 rounded-xl bg-white p-8 shadow-sm">
            <Typography.Paragraph className="m-0 text-base">
              <UserOutlined /> Number of Users
            </Typography.Paragraph>
            <Flex justify="space-between" align="baseline">
              <Typography.Title className="m-0">0</Typography.Title>
              <Typography.Paragraph className="m-0">{currentDate.toDateString()}</Typography.Paragraph>
            </Flex>
          </Flex>
          <Flex vertical className="w-full gap-12 rounded-xl bg-white p-8 shadow-sm">
            <Typography.Paragraph className="m-0 text-base">
              <ShoppingOutlined /> Number of Products
            </Typography.Paragraph>
            <Flex justify="space-between" align="baseline">
              <Typography.Title className="m-0">0</Typography.Title>
              <Typography.Paragraph className="m-0">{currentDate.toDateString()}</Typography.Paragraph>
            </Flex>
          </Flex>
          <Flex vertical className="w-full gap-12 rounded-xl bg-white p-8 shadow-sm">
            <Typography.Paragraph className="m-0 text-base">
              <FileTextOutlined /> Number of Orders
            </Typography.Paragraph>
            <Flex justify="space-between" align="baseline">
              <Typography.Title className="m-0">0</Typography.Title>
              <Typography.Paragraph className="m-0">{currentDate.toDateString()}</Typography.Paragraph>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <Flex justify="space-between">
        <div className="mb-6 w-fit rounded-xl bg-white p-8 shadow-sm">
          <LineChart width={610} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div className="mb-6 w-fit rounded-xl bg-white p-8 shadow-sm">
          <BarChart width={610} height={250} data={data}>
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
}

export default DashboardPage;
