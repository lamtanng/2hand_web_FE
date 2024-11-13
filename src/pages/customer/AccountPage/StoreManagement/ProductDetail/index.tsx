import { Button } from 'antd';
import useAccountPage from '../../useAccountPage';
import useStoreProductsDetail from './useStoreProductForm';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import ProductForm from '../../../../../components/elements/Form/ProductForm';

const StoreProductsDetail = () => {
  const { profile } = useAccountPage();
  const { category, store, product } = useStoreProductsDetail(profile);
  console.log(product)
  const navigate = useNavigate()
  return (
    <div id="container" className="px-12 py-5">
      <Button
        variant="text"
        color="default"
        className="p-0 hover:bg-transparent mb-6"
        onClick={() => {
          navigate(-1);
        }}
      >
        <LeftOutlined /> Back
      </Button>
      <ProductForm category={category} store={store} product={product} />
    </div>
  );
};

export default StoreProductsDetail;
