import { FireFilled, UndoOutlined } from '@ant-design/icons';
import { Divider, Flex, Image } from 'antd';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../../../../src/assets/logo.webp';
import { createSearchHistory, findBySearchText } from '../../../apis/searchHistory.api';
import { guestUrls } from '../../../constants/urlPaths/guestUrls';
import { useAppSelector } from '../../../redux/hooks';
import { loginSelector } from '../../../redux/slices/login.slice';
import { normalizeString } from '../../../utils/formatName';
import CustomCategoryMenu from '../Menu/CategoryMenu';
import ActionGroup from './components/ActionGroup';
import CustomSearchDropdown, { SearchOption } from './components/CustomSearchDropdown';
import UserInfoGroup from './components/UserInfoGroup';

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
      // if (!query) {
      //   await fetchAllHintByUserId(user?._id);
      //   return;
      // }

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

  // const fetchAllHintByUserId = async (userId?: string) => {
  //   try {
  //     const res = await findAllHintByUserId(userId);
  //     const newOptions = mapToOptions(res.data);
  //     setOptions(newOptions);
  //   } catch (error) {
  //     setOptions([]);
  //   } finally {
  //     setIsHintLoading(false);
  //   }
  // };

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
            <Link to={'/'} className="font-sans text-base">
              Home
            </Link>
            {/* <Link
              to={{ pathname: `/${guestUrls.productListUrl}`, search: 'page=1&limit=8' }}
              className="font-sans text-base"
            >
              Products
            </Link> */}

            <CustomSearchDropdown
              options={options}
              value={search}
              onChange={onSearchChange}
              onSearch={fetchSearchSuggestions}
              onSelect={onSelect}
              isLoading={isHintLoading}
              placeholder="Search for a product"
              width={250}
            />
          </Flex>
          {displayingGroup}
        </Flex>
        <Divider className="my-4" />
        <CustomCategoryMenu />
      </div>
    </>
  );
}
