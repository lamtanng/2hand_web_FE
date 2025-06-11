import { FireFilled, UndoOutlined } from '@ant-design/icons';
import { Divider, Flex, Image } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../../../../src/assets/logo.webp';
import { createSearchHistory, findAllHintByUserId, findBySearchText } from '../../../apis/searchHistory.api';
import { guestUrls } from '../../../constants/urlPaths/guestUrls';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import { normalizeString } from '../../../utils/formatName';
import ImageSearch from '../../elements/ImageSearch';
import CustomCategoryMenu from '../Menu/CategoryMenu';
import ActionGroup from './components/ActionGroup';
import CustomSearchDropdown, { SearchOption } from './components/CustomSearchDropdown';
import UserInfoGroup from './components/UserInfoGroup';
import './styles.css';
import { productAPIs } from '../../../apis/product.api';
import { ProductProps } from '../../../types/product.type';
import { CategoryProps } from '../../../types/category.type';
import { StoreProps } from '../../../types/store.type';

// Interface cho dữ liệu search history
interface SearchHistoryItem {
  _id?: string;
  userId?: string;
  searchText: string;
  count: number;
}

export default function Header() {
  const { user } = useAppSelector(loginSelector);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<SearchOption[]>([]);
  const [isHintLoading, setIsHintLoading] = useState(false);

  // State cho kết quả tìm kiếm bằng hình ảnh
  const [imageSearchResults, setImageSearchResults] = useState<ProductProps[]>([]);
  const [isImageSearching, setIsImageSearching] = useState(false);

  console.log('Header - imageSearchResults:', imageSearchResults);
  console.log('Header - isImageSearching:', isImageSearching);

  useEffect(() => {
    fetchAllHintByUserId(user?._id);
  }, []);

  const displayingGroup = user.phoneNumber ? <UserInfoGroup user={user} /> : <ActionGroup />;

  const computeMatchLength = (query: string, text: string): number => {
    const normalizedQuery = normalizeString(query);
    const normalizedText = normalizeString(text);

    let length = 0;
    for (let i = 0; i < normalizedQuery.length && i < normalizedText.length; i++) {
      if (normalizedQuery[i] === normalizedText[i]) {
        length++;
      } else {
        break;
      }
    }
    return length;
  };

  const renderLabel = (
    text: string,
    matchLength: number,
    isUserHistory: boolean,
    isPopular: boolean,
  ): React.ReactNode => (
    <span>
      {isUserHistory && <UndoOutlined style={{ marginRight: 6, color: '#1890ff' }} />}
      <strong>{text.slice(0, matchLength)}</strong>
      {text.slice(matchLength)}
      {!isUserHistory && isPopular && <FireFilled style={{ marginLeft: 6, color: '#fa541c' }} />}
    </span>
  );

  // Chuyển đổi dữ liệu từ API thành options
  const mapToOptions = (items: SearchHistoryItem[], query: string = ''): SearchOption[] => {
    const processedOptions = items.map((item) => {
      const isUserHistory = item.userId === user?._id;
      const isPopular = item.count >= 2;
      const matchLength = computeMatchLength(query, item.searchText);

      return {
        value: item.searchText,
        label: renderLabel(item.searchText, matchLength, isUserHistory, isPopular),
        key: `${item.searchText}-${item.userId || 'guest'}-${isUserHistory ? 'history' : 'normal'}`,
      };
    });

    // Sắp xếp: history items trước, sau đó là popular items
    return processedOptions.sort((a, b) => {
      // Sử dụng key cho việc sắp xếp để đảm bảo thứ tự ổn định
      if (a.key.includes('history') && !b.key.includes('history')) return -1;
      if (!a.key.includes('history') && b.key.includes('history')) return 1;
      return 0;
    });
  };

  const fetchSearchSuggestions = async (query: string) => {
    setIsHintLoading(true);

    try {
      if (!query) {
        await fetchAllHintByUserId(user?._id);
        return;
      }

      await fetchSearchSuggestionsByText(query);
    } catch (error) {
      setOptions([]);
    } finally {
      setIsHintLoading(false);
    }
  };

  const fetchSearchSuggestionsByText = async (query: string) => {
    try {
      const res = await findBySearchText(query);
      const newOptions = mapToOptions(res.data, query);
      setOptions(newOptions);
    } catch (error) {
      setOptions([]);
    } finally {
      setIsHintLoading(false);
    }
  };

  const fetchAllHintByUserId = async (userId?: string) => {
    try {
      if (!userId) return;
      const res = await findAllHintByUserId(userId);
      const newOptions = mapToOptions(res.data);
      setOptions(newOptions);
    } catch (error) {
      setOptions([]);
    } finally {
      setIsHintLoading(false);
    }
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
  };

  const onSelect = (value: string) => {
    setSearch(value);
    submitSearch(value);
  };

  const submitSearch = (value: string) => {
    if (value) {
      searchParams.set('search', value);
    } else {
      searchParams.delete('search');
    }
    navigate({ pathname: `/${guestUrls.productListUrl}`, search: searchParams.toString() });
    fetchCreateSearchHistory(value);
  };

  const fetchCreateSearchHistory = async (value: string) => {
    try {
      if (user._id) {
        await createSearchHistory(value, user._id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearImageSearchResults = () => {
    console.log('Clearing image search results');
    setImageSearchResults([]);
  };

  const handleImageSearch = async (imageBase64: string) => {
    try {
      if (!imageBase64) throw new Error('Image is required');

      setIsImageSearching(true);
      console.log('Starting image search...');

      // Mô phỏng API call - Thay thế bằng API thực tế của bạn
      // Giả lập dữ liệu trả về để test
      // setTimeout(() => {
      //   // Tạo một số category và store mẫu
      // //   const categoryMock: CategoryProps = {
      // //     _id: 'cat123',
      // //     name: 'Thời trang',
      // //     isActive: true,
      // //     image: 'https://example.com/category.jpg',
      // //     slug: 'thoi-trang',
      // //   };

      // //   const storeMock: StoreProps = {
      // //     _id: 'store123',
      // //     name: 'Shop thời trang',
      // //     slug: 'shop-thoi-trang',
      // //     description: 'Cửa hàng thời trang chất lượng',
      // //     address: [
      // //       {
      // //         _id: 'addr123',
      // //         address: '123 Đường ABC',
      // //         ward: null,
      // //         district: null,
      // //         province: {
      // //           ProvinceID: 1,
      // //           ProvinceName: 'Hồ Chí Minh',
      // //           CountryID: 1,
      // //         },
      // //         isDefault: true,
      // //       },
      // //     ],
      // //     avatar: 'https://example.com/store.jpg',
      // //     isActive: true,
      // //     userID: {
      // //       _id: 'user123',
      // //       firstName: 'Nguyễn',
      // //       lastName: 'Văn A',
      // //       email: 'example@email.com',
      // //     },
      // //     ghnStoreID: 'ghn123',
      // //   };

      // //   const mockProducts: ProductProps[] = [
      // //     {
      // //       _id: '1',
      // //       name: 'Áo thun nữ phong cách Hàn Quốc',
      // //       description: 'Áo thun nữ phong cách Hàn Quốc, chất liệu cotton 100%, thoáng mát',
      // //       image: ['https://cf.shopee.vn/file/vn-11134201-23030-zs77nkofp3nv2a'],
      // //       price: 150000,
      // //       quantity: 10,
      // //       quality: 'Mới 100%',
      // //       isActive: true,
      // //       isSoldOut: false,
      // //       cateID: categoryMock,
      // //       storeID: storeMock,
      // //       slug: 'ao-thun-nu-han-quoc',
      // //       weight: 200,
      // //       height: 3,
      // //       width: 30,
      // //       length: 50,
      // //       address: {
      // //         _id: 'addr123',
      // //         address: '123 Đường ABC',
      // //         ward: null,
      // //         district: null,
      // //         province: {
      // //           ProvinceID: 1,
      // //           ProvinceName: 'Hồ Chí Minh',
      // //           CountryID: 1,
      // //         },
      // //         isDefault: true,
      // //       },
      // //       isApproved: true,
      // //     },
      // //     {
      // //       _id: '2',
      // //       name: 'Áo thun nam cổ tròn basic',
      // //       description: 'Áo thun nam cổ tròn basic, form rộng, chất cotton',
      // //       image: ['https://cf.shopee.vn/file/sg-11134201-22100-qnop3l8brfiv44'],
      // //       price: 120000,
      // //       quantity: 20,
      // //       quality: 'Mới 100%',
      // //       isActive: true,
      // //       isSoldOut: false,
      // //       cateID: categoryMock,
      // //       storeID: storeMock,
      // //       slug: 'ao-thun-nam-basic',
      // //       weight: 250,
      // //       height: 3,
      // //       width: 35,
      // //       length: 60,
      // //       address: {
      // //         _id: 'addr123',
      // //         address: '123 Đường ABC',
      // //         ward: null,
      // //         district: null,
      // //         province: {
      // //           ProvinceID: 2,
      // //           ProvinceName: 'Hà Nội',
      // //           CountryID: 1,
      // //         },
      // //         isDefault: true,
      // //       },
      // //       isApproved: true,
      // //     },
      // //     {
      // //       _id: '3',
      // //       name: 'Áo sơ mi nữ dài tay',
      // //       description: 'Áo sơ mi nữ dài tay, kiểu dáng công sở, thanh lịch',
      // //       image: ['https://cf.shopee.vn/file/sg-11134201-22120-dxsewz9jfplvc3'],
      // //       price: 220000,
      // //       quantity: 15,
      // //       quality: 'Mới 100%',
      // //       isActive: true,
      // //       isSoldOut: false,
      // //       cateID: categoryMock,
      // //       storeID: storeMock,
      // //       slug: 'ao-so-mi-nu-dai-tay',
      // //       weight: 300,
      // //       height: 2,
      // //       width: 40,
      // //       length: 65,
      // //       address: {
      // //         _id: 'addr123',
      // //         address: '123 Đường ABC',
      // //         ward: null,
      // //         district: null,
      // //         province: {
      // //           ProvinceID: 3,
      // //           ProvinceName: 'Đà Nẵng',
      // //           CountryID: 1,
      // //         },
      // //         isDefault: true,
      // //       },
      // //       isApproved: true,
      // //     },
      // //   ];

      // //   console.log('Mock search results:', mockProducts);
      // //   setImageSearchResults(mockProducts);
      // //   setIsImageSearching(false);
      // // }, 2000);

      const response = await productAPIs.getProductByImage(imageBase64);
      console.log('response', response);
      if (response.data.length > 0) {
        setImageSearchResults(response.data);
      } else {
        setImageSearchResults([]);
      }
      setIsImageSearching(false);
    } catch (error) {
      console.error('Error searching by image:', error);
      setImageSearchResults([]);
      setIsImageSearching(false);
    }
  };

  return (
    <>
      <div className="nav-bar fixed z-20 mx-auto w-full bg-white py-5 shadow-sm">
        <Flex align="center" justify="space-between" className="mx-5 md:mx-10 xl:mx-auto xl:w-10/12">
          <Flex gap={'large'} justify="start" align="center" className="flex xl:flex-grow">
            <Flex gap="large" className="font-sans">
              <Link to="/" className="font-sans">
                <Image alt="" src={logo} width={50} preview={false} />
              </Link>
            </Flex>
            {/* <Link to={'/'} className="font-sans text-base">
              Home
            </Link> */}
            {/* <Link
              to={{ pathname: `/${guestUrls.productListUrl}`, search: 'page=1&limit=8' }}
              className="font-sans text-base"
            >
              Products
            </Link> */}

            <div className="search-container">
              <CustomSearchDropdown
                options={options}
                value={search}
                onChange={onSearchChange}
                onSearch={fetchSearchSuggestions}
                onSelect={onSelect}
                isLoading={isHintLoading}
                placeholder="Search for a product"
                width={250}
                className="custom-search-with-image"
              />
              <ImageSearch
                onSearch={handleImageSearch}
                searchResults={imageSearchResults}
                isSearching={isImageSearching}
                clearResults={clearImageSearchResults}
              />
            </div>
          </Flex>
          {displayingGroup}
        </Flex>
        <Divider className="my-4" />
        <CustomCategoryMenu />
      </div>
    </>
  );
}
