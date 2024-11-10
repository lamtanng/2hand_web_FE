import { useEffect, useState } from 'react';
import { productAPIs } from '../../apis/product.api';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductProps } from '../../types/product.type';
import { handleError } from '../../utils/handleError';
import { cartAPIs } from '../../apis/cart.api';
import { useAppSelector } from '../../redux/hooks';
import { loginSelector } from '../../redux/slices/login.slice';
import { CartItemProps } from '../../types/cart.type';
import { NewCartItemProps } from '../../types/http/cart.type';
import { displaySuccess } from '../../utils/displayToast';
import eventEmitter from '../../utils/eventEmitter';
import { authUrls } from '../../constants/urlPaths/authUrls';
import { customerUrls } from '../../constants/urlPaths/customer/customerUrls';

const useProductDetail = () => {
  const param = useParams();
  const navigate = useNavigate();
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
      setLoading(true);
      const res = await productAPIs.getProductBySlug(slug);
      setProduct(res.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
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

  const addToCart = async (userID: string, event: string) => {
    try {
      const totalQuantity = item ? productQuantity + item.quantity : productQuantity;
      const data: NewCartItemProps = {
        userID: userID,
        items: [{ productID: product?._id, quantity: totalQuantity }],
      };
      await cartAPIs.addCartItem(data);
      displaySuccess('Product is added to cart successfully.');
      eventEmitter.emit(event, product?._id);
    } catch (error) {
      handleError(error);
    }
  };

  const handleAddToCart = () => {
    try {
      setDirty(true);
      if (user._id) {
        addToCart(user._id, 'addToCart');
      } else {
        navigate(`/${authUrls.loginUrl}`);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setDirty(false);
    }
  };

  const handleBuyNow = async () => {
    try {
      setDirty(true);
      if (user._id) {
        addToCart(user._id, 'buyNow');
        navigate(`/${customerUrls.cartUrl}`);
      } else {
        navigate(`/${authUrls.loginUrl}`);
      }
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

    if (user._id && product?._id) {
      getCartItemByID(product._id);

      const addToCartListener = eventEmitter.addListener('addToCart', (productID: string) => {
        getCartItemByID(productID);
      });
      return () => {
        addToCartListener.remove();
      };
    }
  }, [product]);

  return {
    product,
    getSingleProduct,
    isLoading,
    storeProduct,
    getStoreProducts,
    handleAddToCart,
    setQuantity,
    isDirty,
    handleBuyNow,
  };
};

export default useProductDetail;
