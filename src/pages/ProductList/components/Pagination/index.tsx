import { Pagination } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { guestUrls } from '../../../../constants/urlPaths/guestUrls';

const CustomPagination = ({
  totalProducts,
}: {
  totalProducts: number;
}) => {
  const navigate = useNavigate()
  let [searchParams] = useSearchParams();
  return (
    <Pagination
      align="center"
      current={Number(searchParams.get('page'))}
      total={totalProducts}
      pageSize={Number(searchParams.get('limit'))}
      pageSizeOptions={[8, 12, 16, 20, 40]}
      showSizeChanger
      onChange={(pageNumber) => {
        searchParams.set('page', pageNumber.toString());
        navigate({pathname:`/${guestUrls.productListUrl}`, search:searchParams.toString()})
      }}
      onShowSizeChange={(current: number, pageSize: number) => {
        searchParams.set('page', current.toString());
        searchParams.set('limit', pageSize.toString());
        navigate({pathname:`/${guestUrls.productListUrl}`, search:searchParams.toString()})
      }}
      className="mt-10"
    />
  );
};

export default CustomPagination;
