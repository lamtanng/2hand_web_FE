import { Pagination } from 'antd';

const CustomPagination = ({
  totalProducts,
  limit,
  setPage,
  setLimit,
  page,
}: {
  totalProducts: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}) => {
  return (
    <Pagination
      align="center"
      current={page}
      total={totalProducts}
      pageSize={limit}
      pageSizeOptions={[8, 12, 16, 20, 40]}
      showSizeChanger
      onChange={(pageNumber) => {
        setPage(pageNumber);
      }}
      onShowSizeChange={(current: number, pageSize: number) => {
        setPage(current);
        setLimit(pageSize);
      }}
      className="mt-10"
    />
  );
};

export default CustomPagination;
