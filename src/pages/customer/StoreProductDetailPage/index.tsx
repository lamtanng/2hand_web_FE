import { Button } from 'antd';
import useStoreProductsDetail from './useStoreProductForm';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import useAccountPage from '../AccountPage/useAccountPage';
import ProductForm from '../../../components/elements/Form/ProductForm';

const StoreProductsDetail = () => {
  const { profile } = useAccountPage();
  const { category, store, product } = useStoreProductsDetail(profile);
  const navigate = useNavigate()
  console.log("store: ",store)
  console.log("product: ",product)
  console.log("category: ",category)
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
