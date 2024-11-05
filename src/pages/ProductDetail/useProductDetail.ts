import { useEffect, useState } from 'react';
import { productAPIs } from '../../apis/product.api';
import { useParams } from 'react-router-dom';
import { ProductProps } from '../../types/product.type';
import { handleError } from '../../utils/handleError';
import { cartAPIs } from '../../apis/cart.api';
import { useAppSelector } from '../../redux/hooks';
import { loginSelector } from '../../redux/slices/login.slice';
import { CartItemProps } from '../../types/cart.type';
import { NewCartItemProps } from '../../types/http/cart.type';
import { displaySuccess } from '../../utils/displayToast';
import eventEmitter from '../../utils/eventEmitter';

const useProductDetail = () => {
  const param = useParams();
  const { user } = useAppSelector(loginSelector);
  const [product, setProduct] = useState<ProductProps>();
  const [item, setItem] = useState<CartItemProps>();
  const [productQuantity, setQuantity] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDirty, setDirty] = useState<boolean>(false);
  const [storeProduct, setStoreProduct] = useState<ProductProps[]>([]);

  const getStoreProducts = async (page: number, limit: number, storeID: (string | undefined)[]) => {
    try {
      setLoading(true);
      let storeIDGroup = storeID?.length !== 0 ? JSON.stringify(storeID) : '';
      const res = await productAPIs?.getAllProduct(
        page,
        limit,
        undefined,
        JSON.stringify({ createdAt: -1 }),
        undefined,
        undefined,
        undefined,
        storeIDGroup,
      );
      setStoreProduct(res?.data?.response?.products);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getSingleProduct = async (slug: string | undefined) => {
    try {
      const res = await productAPIs.getProductBySlug(slug);
      setProduct(res.data);
    } catch (error) {
      handleError(error);
    }
  };

  const getCartItemByID = async (productID: string | undefined) => {
    try {
      const res = await cartAPIs.getCartItem(productID);
      setItem(res.data);
      console.log('item:', res.data);
    } catch (error) {
      handleError(error);
    }
  };

  const handleAddToCard = async () => {
    try {
      setDirty(true);
      const totalQuantity = item ? productQuantity + item.quantity : productQuantity;
      const data: NewCartItemProps = {
        userID: user._id,
        items: [{ productID: product?._id, quantity: totalQuantity }],
      };
      await cartAPIs.addCartItem(data);
      displaySuccess('Product is added to cart successfully.');
      eventEmitter.emit('addToCart', product?._id);
    } catch (error) {
      handleError(error);
    } finally {
      setDirty(false);
    }
  };

  useEffect(() => {
    getSingleProduct(param.productSlug);

    const productLinkClickListener = eventEmitter.addListener('productLinkClick', (slug: string) => {
      getSingleProduct(slug);
    });
    return () => {
      productLinkClickListener.remove();
    };
  }, []);

  useEffect(() => {
    getStoreProducts(1, 10, [product?.storeID._id]);
    if (user._id) {
      if (product) {
        getCartItemByID(product._id);

        const addToCartListener = eventEmitter.addListener('addToCart', (productID: string) => {
          getCartItemByID(productID);
        });
        return () => {
          addToCartListener.remove();
        };
      }
    }
  }, [product]);

  return {
    product,
    getSingleProduct,
    isLoading,
    storeProduct,
    getStoreProducts,
    handleAddToCard,
    setQuantity,
    isDirty,
  };
};

export default useProductDetail;
