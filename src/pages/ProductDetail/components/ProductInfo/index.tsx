import { FlagOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Image, InputNumber, Typography } from 'antd';
import defaultPic from '../../../../assets/blob.webp';
import ImageSlider from '../ImageSlider';
import { Link } from 'react-router-dom';
import { ProductProps } from '../../../../types/product.type';
import { useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks';
import { loginSelector } from '../../../../redux/slices/login.slice';
import { formattedCurrency } from '../../../../utils/formattedCurrency';

const ProductInfo = ({
  product,
  handleAddToCart,
  setQuantity,
  isDirty,
  handleBuyNow,
}: {
  product: ProductProps | undefined;
  handleAddToCart: () => void;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  isDirty: boolean;
  handleBuyNow: () => void;
}) => {
  const { user } = useAppSelector(loginSelector);
  const [selectedImage, setSelectedImage] = useState<string>();
  return (
    <div id="product" className="my-5 rounded-xl bg-white p-8 shadow-sm">
      <Flex className="gap-16">
        <div className="w-5/12">
          <Flex vertical gap={'large'}>
            <div className="relative">
              <Image className='object-cover' width={'100%'} src={selectedImage ? selectedImage : product?.image[0]} fallback={defaultPic} />
              {product?.quantity === 0 && (
                <div className="absolute left-[198px] top-[198px] z-10 rounded-full bg-black bg-opacity-65 px-7 py-16 font-sans text-2xl font-semibold text-white">
                  Sold Out
                </div>
              )}
            </div>
            <ImageSlider product={product} setSelectedImage={setSelectedImage} />
            <Flex justify="space-between" align="baseline" className="font-sans text-xs text-gray-500">
              <div>
                You have similar products? <Link to={'#'}>Sell now</Link>
              </div>
              <Flex gap={'small'}>
                <Button type="text" className="p-0 text-xs text-gray-500 hover:bg-transparent">
                  <FlagOutlined /> Report
                </Button>
                <Button type="text" className="p-0 text-xs text-gray-500 hover:bg-transparent">
                  <ShareAltOutlined /> Share
                </Button>
                <Button type="text" className="p-0 text-xs text-gray-500 hover:bg-transparent">
                  <HeartOutlined /> Like
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </div>
        <div className="w-7/12">
          <Flex vertical gap={'large'}>
            <Typography.Title level={3} className="m-0 font-semibold">
              {product?.name}
            </Typography.Title>
            <Typography.Title level={3} className="m-0 font-bold text-blue-600">
              {product && formattedCurrency(product.price)}
            </Typography.Title>
            <Flex vertical gap={'large'} className="mx-6">
              <Flex align="baseline" gap={'small'}>
                <Typography.Paragraph className="m-0 w-1/6">Deliver from: </Typography.Paragraph>
                <Typography.Paragraph className="m-0 w-5/6">
                  {product?.address.province?.ProvinceName}
                </Typography.Paragraph>
              </Flex>
              <Flex align="baseline" gap={'small'}>
                <Typography.Paragraph className="m-0 w-1/6">Quantity: </Typography.Paragraph>
                <InputNumber
                  min={1}
                  max={product?.quantity}
                  defaultValue={(product && product.quantity > 0) ? 1 : 0}
                  onChange={(value) => {
                    value && setQuantity(value);
                  }}
                  disabled={product && product.quantity <= 0}
                />
                <Typography.Paragraph className="m-0 ml-6 text-blue-600 font-semibold">
                  {product?.quantity} in stock
                </Typography.Paragraph>
              </Flex>
            </Flex>
            {user._id === product?.storeID.userID._id ? null : (product && product.quantity > 0) ? (
              <Flex gap={'large'}>
                <Button
                  disabled={isDirty}
                  color="primary"
                  variant="outlined"
                  className="w-1/2 py-5 font-bold"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
                <Button disabled={isDirty} type="primary" className="w-1/2 py-5 font-bold" onClick={handleBuyNow}>
                  Buy now
                </Button>
              </Flex>
            ) : (
              <Button disabled type="primary" className="w-full py-5 font-bold">
                <HeartOutlined />
                Add to wishlist
              </Button>
            )}
            <Divider />
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default ProductInfo;
