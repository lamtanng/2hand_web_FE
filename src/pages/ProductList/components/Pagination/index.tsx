import { Pagination } from 'antd';

const CustomPagination = ({
  totalProducts,
  limit,
  setPage,
  setLimit,
}: {
  totalProducts: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Pagination
      align="center"
      defaultCurrent={1}
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
