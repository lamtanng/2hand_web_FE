import { Pagination, Typography } from 'antd';
import { OrderProps } from '../../../../types/order.type';
import PageSpin from '../../Spin/PageSpin';
import { accountUrls } from '../../../../constants/urlPaths/customer/accountUrls';
import CustomerOrderItem from '../../../../pages/customer/CustomerOrderPage/components/OrderItem';
import StoreOrderItem from '../../../../pages/customer/StoreOrderPage/components/OrderItem';
import EmptyOrder from './components/EmptyOrder';

const OrderList = ({
  orders,
  setPage,
  total,
  isLoading,
  page,
}: {
  orders: OrderProps[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  isLoading: boolean;
  page: number;
}) => {
  return (
    <>
      {isLoading ? (
        <PageSpin />
      ) : (
        <>
          {orders.length !== 0 ? (
            <>
              <Typography.Paragraph className="m-0 mb-4 text-base">Total orders: {total}</Typography.Paragraph>
              <div id="order-list">
                {orders &&
                  orders.map((item: OrderProps) => {
                    return window.location.href.includes(accountUrls.puchasesUrl) ? (
                      <CustomerOrderItem order={item} />
                    ) : (
                      <StoreOrderItem order={item} />
                    );
                  })}
              </div>
            </>
          ) : (
            <EmptyOrder />
          )}
        </>
      )}
      {orders.length !== 0 && <Pagination align="center" onChange={(e) => setPage(e)} current={page} total={total} />}
    </>
  );
};

export default OrderList;
