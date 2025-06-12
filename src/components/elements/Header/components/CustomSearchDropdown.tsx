import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, Input, Spin } from 'antd';
import type { MenuProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDebouncedCallback } from 'use-debounce';
import './CustomSearchDropdown.css';

export interface SearchOption {
  value: string;
  label: React.ReactNode;
  key: string;
}

interface CustomSearchDropdownProps {
  options: SearchOption[];
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  onSelect: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  width?: number;
  className?: string;
}

const CustomSearchDropdown: React.FC<CustomSearchDropdownProps> = ({
  options,
  value,
  onChange,
  onSearch,
  onSelect,
  isLoading = false,
  placeholder = 'Search',
  width = 250,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<any>(null);

  // Debounce onSearch để tránh gọi API quá nhiều
  const debouncedOnSearch = useDebouncedCallback((searchText: string) => {
    onSearch(searchText);
  }, 300);

  // Đóng dropdown khi click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset active index khi options thay đổi
  useEffect(() => {
    setActiveIndex(-1);
  }, [options]);

  // Handle khi input thay đổi
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    debouncedOnSearch(newValue);

    // Chỉ mở dropdown khi có giá trị hoặc có options
    if (newValue || options.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  // Handle khi nhấn phím
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const optionsLength = options.length;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((prevIndex) => (prevIndex < optionsLength - 1 ? prevIndex + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : optionsLength - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < optionsLength) {
        // Nếu đang chọn một item trong dropdown
        const selectedOption = options[activeIndex];
        onChange(selectedOption.value);
        onSelect(selectedOption.value);
      } else {
        // Nếu không có item nào được chọn, gửi giá trị hiện tại
        onSelect(value);
      }
      setOpen(false);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  // Khi focus vào input
  const handleFocus = () => {
    // Mở dropdown khi focus nếu có options hoặc có giá trị
    if (options.length > 0 || value) {
      setOpen(true);
    }
  };

  // Xử lý click trên menu
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const selectedKey = e.key;
    const selectedOption = options.find((option) => option.key === selectedKey);

    if (selectedOption) {
      onChange(selectedOption.value);
      onSelect(selectedOption.value);
      setOpen(false);
    }
  };

  // Tạo items cho menu
  const menuItems: MenuProps['items'] = isLoading
    ? [
        {
          key: 'loading',
          disabled: true,
          label: (
            <div className="search-item-loading">
              <Spin size="small" />
            </div>
          ),
        },
      ]
    : options.length > 0
      ? options.map((option) => ({
          key: option.key,
          label: option.label,
          className: options.indexOf(option) === activeIndex ? 'ant-dropdown-menu-item-active' : '',
        }))
      : [{ key: 'not-found', disabled: true, label: 'No data found' }];

  return (
    <div ref={inputRef} className={`custom-search-dropdown ${className || ''}`} style={{ width }}>
      <Dropdown
        open={open}
        menu={{
          items: menuItems,
          onClick: handleMenuClick,
          selectedKeys: activeIndex >= 0 && activeIndex < options.length ? [options[activeIndex].key] : [],
        }}
        trigger={['click']}
        placement="bottomLeft"
        getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
        overlayClassName="custom-dropdown-overlay"
        overlayStyle={{ width }}
        onOpenChange={(visible) => {
          setOpen(visible);
        }}
      >
        <Input
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          suffix={isLoading ? <Spin size="small" /> : <SearchOutlined />}
          style={{ width: '100%' }}
          onClick={() => {
            if (options.length > 0) {
              setOpen(true);
            }
          }}
        />
      </Dropdown>
    </div>
  );
};

export default CustomSearchDropdown;
