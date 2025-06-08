import {
  TableProps,
  Typography,
  Table,
  Button,
  Card,
  Input,
  Tag,
  Tooltip,
  Space,
  Badge,
  Flex,
  Dropdown,
  Statistic,
  Row,
  Col,
  Tabs,
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
  DownOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import useOrderListPage from './useOrderListPage';
import { OrderProps } from '../../../types/order.type';
import { OrderStage } from '../../../types/enum/orderStage.enum';
import { OrderStageStatus } from '../../../types/enum/orderStageStatus.enum';
import { OrderRequestProps } from '../../../types/orderRequest.type';
import { ReplyStatus } from '../../../types/enum/replyStatus.enum';
import CancelModal from './components/CancelModal';
import { formattedName } from '../../../utils/formatName';
import { formattedCurrency } from '../../../utils/formattedCurrency';
import { formattedOrderStageStatus } from '../../../utils/formattedOrderStageStatus';
import { useState, useMemo } from 'react';
import './OrderListPage.css';

export interface CustomTableColumns {
  orderID: string;
  customerName: string | undefined;
  storeName: string | undefined;
  products: number;
  stage: OrderStage;
  stageStatus: OrderStageStatus;
  total: number;
  shipmentCost: number;
  orderRequest?: OrderRequestProps;
  createdAt: Date | undefined;
}

const OrderListPage = () => {
  const {
    orders,
    allOrders,
    isModalOpen,
    setIsModalOpen,
    setReplyMessage,
    setRecord,
    record,
    processRequest,
    isLoading,
    refreshOrders,
    activeStageFilter,
    setActiveStageFilter,
    activeTab,
    setActiveTab,
  } = useOrderListPage();
  const [searchText, setSearchText] = useState<string>('');

  // Filter orders based on search text
  const filteredOrders = orders?.filter((order) => {
    if (!searchText) return true;

    const customerName = formattedName(order.userID).toLowerCase();
    const storeName = order?.storeID?.name?.toLowerCase() || '';
    const orderId = order?._id?.toLowerCase() || '';
    const searchLower = searchText.toLowerCase();

    return customerName.includes(searchLower) || storeName.includes(searchLower) || orderId.includes(searchLower);
  });

  const data: CustomTableColumns[] =
    filteredOrders?.map((order: OrderProps) => {
      return {
        orderID: order?._id,
        customerName: `${formattedName(order.userID)}`,
        storeName: order?.storeID?.name,
        products: order?.orderDetailIDs?.length,
        stage: order?.orderStageID?.name,
        stageStatus: order?.orderStageID?.orderStageStatusID?.status,
        total: order?.total,
        shipmentCost: order?.shipmentCost,
        orderRequest: order?.orderStageID?.orderStageStatusID?.orderRequestID,
        createdAt: order.createAt,
      };
    }) || [];

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalOrders = orders?.length || 0;
    const totalRevenue = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;
    const pendingRequests =
      orders?.filter(
        (order) => order?.orderStageID?.orderStageStatusID?.orderRequestID?.replyStatus === ReplyStatus.Pending,
      ).length || 0;

    return { totalOrders, totalRevenue, pendingRequests };
  }, [orders]);

  // Order status filter options
  const stageFilters = useMemo(() => {
    const stages = Array.from(new Set(orders?.map((order) => order?.orderStageID?.name)));
    return stages.filter(Boolean).map((stage) => ({ text: stage, value: stage }));
  }, [orders]);

  // Count orders by stage for tab badges
  const orderCounts = useMemo(() => {
    const counts = {
      all: allOrders?.length || 0,
      pending: 0,
      confirmed: 0,
      delivering: 0,
      delivered: 0,
      cancelled: 0,
    };

    allOrders?.forEach((order) => {
      const stage = order?.orderStageID?.name?.toLowerCase();
      if (stage && counts[stage as keyof typeof counts] !== undefined) {
        counts[stage as keyof typeof counts]++;
      }
    });

    return counts;
  }, [allOrders]);

  // Handle tab change
  const handleTabChange = (key: string) => {
    setActiveTab(key);

    if (key === 'all') {
      setActiveStageFilter(null);
    } else if (key === 'pending') {
      setActiveStageFilter(OrderStage.Confirmating);
    } else if (key === 'confirmed') {
      setActiveStageFilter(OrderStage.Picking);
    } else if (key === 'delivering') {
      setActiveStageFilter(OrderStage.Delivering);
    } else if (key === 'delivered') {
      setActiveStageFilter(OrderStage.Delivered);
    } else if (key === 'cancelled') {
      setActiveStageFilter(OrderStage.Cancelled);
    }
  };

  const columns: TableProps['columns'] = [
    {
      title: 'Order ID',
      key: 'orderID',
      dataIndex: 'orderID',
      width: '15%',
      render: (id) => (
        <Tooltip title={`Order ID: ${id}`}>
          <Typography.Text copyable={{ text: id }} className="text-blue-600">
            {id.substring(0, 8)}...
          </Typography.Text>
        </Tooltip>
      ),
    },
    {
      title: 'Customer & Store',
      key: 'customer',
      width: '20%',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{record.customerName}</Typography.Text>
          <Typography.Text type="secondary" className="text-xs">
            {record.storeName || 'No store assigned'}
          </Typography.Text>
        </Space>
      ),
      sorter: (a, b) => (a.customerName || '').localeCompare(b.customerName || ''),
    },
    {
      title: 'Items',
      dataIndex: 'products',
      key: 'products',
      width: '8%',
      render: (count) => <Badge count={count} showZero style={{ backgroundColor: count ? '#1890ff' : '#d9d9d9' }} />,
      sorter: (a, b) => a.products - b.products,
    },
    {
      title: 'Order Stage',
      dataIndex: 'stage',
      key: 'stage',
      width: '15%',
      filters: stageFilters,
      filteredValue: activeStageFilter ? [activeStageFilter] : null,
      onFilter: (value, record) => record.stage === value,
      render: (stage) => {
        let color = 'default';
        let icon = null;

        switch (stage) {
          case !OrderStageStatus.Active:
            color = 'processing';
            icon = <ClockCircleOutlined />;
            break;
          case OrderStage.Picking:
            color = 'cyan';
            icon = <CheckCircleOutlined />;
            break;
          case OrderStage.Delivering:
            color = 'blue';
            icon = <ShoppingCartOutlined />;
            break;
          case OrderStage.Delivered:
            color = 'success';
            icon = <CheckCircleOutlined />;
            break;
          case OrderStage.Cancelled:
            color = 'error';
            icon = <CloseCircleOutlined />;
            break;
          default:
            color = 'default';
        }

        return (
          <Tag color={color} icon={icon}>
            {stage}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'stageStatus',
      key: 'stageStatus',
      width: '15%',
      render: (text: string, record) => {
        if (
          record.stageStatus === OrderStageStatus.RequestToAdmin &&
          record.orderRequest?.replyStatus === ReplyStatus.Pending
        )
          return (
            <Button
              type="primary"
              size="small"
              danger
              className="pulse-animation"
              onClick={() => {
                setRecord(record);
                setIsModalOpen(true);
              }}
            >
              Action Required
            </Button>
          );
        else {
          return <Tag color={getStatusColor(text)}>{text && formattedOrderStageStatus(text)}</Tag>;
        }
      },
    },
    {
      title: 'Amount',
      key: 'amount',
      width: '15%',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong className="text-green-600">
            {formattedCurrency(record.total)}
          </Typography.Text>
          <Typography.Text type="secondary" className="text-xs">
            Ship: {formattedCurrency(record.shipmentCost)}
          </Typography.Text>
        </Space>
      ),
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: 'Action',
      key: 'action',
      width: '12%',
      render: () => (
        <Space>
          <Tooltip title="View Order Details">
            <Button type="primary" size="small" icon={<EyeOutlined />} className="bg-blue-500" />
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                { key: '1', label: 'Print Invoice' },
                { key: '2', label: 'Contact Customer' },
                { key: '3', label: 'View Timeline' },
              ],
            }}
            trigger={['click']}
          >
            <Button size="small">
              More <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Helper function to determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case OrderStageStatus.RequestToSeller:
        return 'processing';
      case OrderStage.Picking:
        return 'cyan';
      case OrderStageStatus.RequestToAdmin:
        return 'warning';
      case OrderStage.Delivered:
        return 'success';
      case OrderStage.Cancelled:
        return 'error';
      default:
        return 'default';
    }
  };

  // Tab items for different order stages
  const tabItems = [
    {
      key: 'all',
      label: (
        <span>
          All Orders <Badge count={orderCounts.all} style={{ backgroundColor: '#1890ff' }} />
        </span>
      ),
    },
    {
      key: 'pending',
      label: (
        <span>
          Pending <Badge count={orderCounts.pending} style={{ backgroundColor: '#faad14' }} />
        </span>
      ),
    },
    {
      key: 'confirmed',
      label: (
        <span>
          Confirmed <Badge count={orderCounts.confirmed} style={{ backgroundColor: '#13c2c2' }} />
        </span>
      ),
    },
    {
      key: 'delivering',
      label: (
        <span>
          Delivering <Badge count={orderCounts.delivering} style={{ backgroundColor: '#1890ff' }} />
        </span>
      ),
    },
    {
      key: 'delivered',
      label: (
        <span>
          Delivered <Badge count={orderCounts.delivered} style={{ backgroundColor: '#52c41a' }} />
        </span>
      ),
    },
    {
      key: 'cancelled',
      label: (
        <span>
          Cancelled <Badge count={orderCounts.cancelled} style={{ backgroundColor: '#f5222d' }} />
        </span>
      ),
    },
  ];

  return (
    <div className="order-list-page">
      <Card className="mb-6 border-0 shadow-md transition-all hover:shadow-lg">
        <Flex align="center" justify="space-between">
          <div>
            <Typography.Title level={2} className="m-0 mb-2 text-blue-600">
              Order Management
            </Typography.Title>
            <Typography.Text type="secondary">View and manage customer orders and requests</Typography.Text>
          </div>
        </Flex>
      </Card>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card className="stat-card border-0 shadow-sm hover:shadow-md">
            <Statistic
              title="Total Orders"
              value={summaryStats.totalOrders}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="stat-card border-0 shadow-sm hover:shadow-md">
            <Statistic
              title="Total Revenue"
              value={summaryStats.totalRevenue}
              formatter={(value) => formattedCurrency(Number(value))}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="stat-card border-0 shadow-sm hover:shadow-md">
            <Statistic
              title="Pending Requests"
              value={summaryStats.pendingRequests}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: summaryStats.pendingRequests > 0 ? '#fa8c16' : '#8c8c8c' }}
              suffix={summaryStats.pendingRequests > 0 ? <Badge status="processing" className="ml-2" /> : null}
            />
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-md">
        <Tabs activeKey={activeTab} onChange={handleTabChange} items={tabItems} className="mb-4" />

        <Flex justify="space-between" align="center" className="mb-4">
          <Input
            placeholder="Search by customer, store or order ID"
            prefix={<SearchOutlined className="text-gray-400" />}
            className="max-w-md"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Space>
            <Tooltip title="Refresh data">
              <Button icon={<ReloadOutlined />} onClick={refreshOrders} loading={isLoading} />
            </Tooltip>
            <Tooltip title="Export orders">
              <Button icon={<ExportOutlined />} />
            </Tooltip>
            <Button icon={<FilterOutlined />}>Filter</Button>
          </Space>
        </Flex>

        <Table
          dataSource={data}
          columns={columns}
          rowKey="orderID"
          scroll={{ x: 'max-content' }}
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} orders`,
          }}
          bordered
          className="order-table"
        />
      </Card>

      <CancelModal
        isModalOpen={isModalOpen}
        setDescription={setReplyMessage}
        setIsModalOpen={setIsModalOpen}
        record={record}
        processRequest={processRequest}
      />
    </div>
  );
};

export default OrderListPage;
