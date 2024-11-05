import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { useState } from 'react';

const Sort = ({ setSort }: { setSort: React.Dispatch<React.SetStateAction<string>> }) => {
  const items: MenuProps['items'] = [
    {
      key: JSON.stringify({}),
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
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const selectedItem: any = items.find((item) => item?.key === e.key);
    if (selectedItem) {
      const newSize = selectedItem.key;
      setMenuValue(selectedItem.label);
      if (newSize) {
        setSort(newSize);
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
