import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";

const items: MenuProps['items'] = [
  {
    key: '2',
    label: 'sub menu',
    children: [
      {
        key: '2-1',
        label: '3rd menu item',
        children: [
          {
        key: '2-2',
        label: '4th menu item',
      },
        ]
      },
      {
        key: '2-2',
        label: '4th menu item',
      },
    ],
  },
];

const CustomCategoryMenu = () => {
  return (
    <div className="mx-auto w-10/12">
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space><MenuOutlined /></Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default CustomCategoryMenu;
