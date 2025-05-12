import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { guestUrls } from '../../../../constants/urlPaths/guestUrls';

const Sort = () => {
  const items: MenuProps['items'] = [
    {
      key: JSON.stringify({ createdAt: -1 }),
      label: 'Default',
    },
    {
      key: JSON.stringify({ price: 1 }),
      label: 'Price: Low to High',
    },
    {
      key: JSON.stringify({ price: -1 }),
      label: 'Price: High to Low',
    },
    {
      key: JSON.stringify({ createdAt: -1 }),
      label: 'Newest First',
    },
    {
      key: JSON.stringify({ createdAt: 1 }),
      label: 'Oldest First',
    },
  ];

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const selectedItem: any = items.find((item) => item?.key === e.key);
    if (selectedItem) {
      const newSize = selectedItem.key;
      setMenuValue(selectedItem.label);
      if (newSize) {
        searchParams.set('sort', newSize);
        navigate({ pathname: `/${guestUrls.productListUrl}`, search: searchParams.toString() });
      }
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
    selectable: true,
  };
  const [menuValue, setMenuValue] = useState<string>('Default');
  return (
    <Dropdown menu={menuProps} trigger={['click']} placement="bottomRight">
      <Button>
        <Space>
          {menuValue}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default Sort;
