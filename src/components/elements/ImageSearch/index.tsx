import {
  CameraOutlined,
  CopyOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  RollbackOutlined,
  SearchOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Button, Card, Divider, Empty, Flex, List, message, Modal, Spin, Typography, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductProps } from '../../../types/product.type';
import './styles.css';

const { Title, Text } = Typography;

export interface ImageSearchProps {
  onSearch: (imageBase64: string) => Promise<void>;
  searchResults?: ProductProps[];
  isSearching?: boolean;
  clearResults?: () => void;
}

const ImageSearch: React.FC<ImageSearchProps> = ({
  onSearch,
  searchResults = [],
  isSearching = false,
  clearResults,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasteFocused, setIsPasteFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const pasteAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isModalOpen) {
      setShowResults(false);
      if (clearResults) clearResults();
    }
  }, [isModalOpen]);

  // Hiển thị kết quả khi có searchResults
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      console.log('Setting showResults to true due to searchResults');
      setShowResults(true);
      setIsLoading(false);
    }
  }, [searchResults]);

  // Theo dõi trạng thái đang tìm kiếm
  useEffect(() => {
    if (isSearching) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isSearching]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFileList([]);
    setImagePreview(null);
    if (clearResults) clearResults();
  };

  const handleSearch = async () => {
    if (!imagePreview) {
      message.error('Vui lòng tải lên một hình ảnh trước');
      return;
    }

    setIsLoading(true);
    try {
      await onSearch(imagePreview); 
    } catch (error) {
      message.error('Có lỗi xảy ra khi tìm kiếm');
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setFileList([]);
    setImagePreview(null);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
    if (clearResults) clearResults();
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Bạn chỉ có thể tải lên tệp hình ảnh!');
        return Upload.LIST_IGNORE;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Hình ảnh phải nhỏ hơn 5MB!');
        return Upload.LIST_IGNORE;
      }

      // Đọc file thành base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };

      return false; // Ngăn không cho upload tự động
    },
    fileList,
    onChange: ({ fileList }) => setFileList(fileList),
    maxCount: 1,
    listType: 'picture',
    showUploadList: false,
  };

  // Xử lý sự kiện paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // Cho phép paste bất cứ khi nào modal mở và chưa có hình ảnh
      if (!isModalOpen || isLoading || imagePreview) return;

      e.preventDefault();
      e.stopPropagation();

      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          if (!blob) continue;

          // Kiểm tra kích thước
          const isLt5M = blob.size / 1024 / 1024 < 5;
          if (!isLt5M) {
            message.error('Hình ảnh phải nhỏ hơn 5MB!');
            return;
          }

          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            setImagePreview(reader.result as string);
            // message.success('Đã dán hình ảnh thành công');
          };
          return;
        }
      }

      message.error('Không tìm thấy hình ảnh trong clipboard');
    };

    // Xử lý paste khi focus vào khu vực paste
    const handlePasteInArea = (e: ClipboardEvent) => {
      if (!isPasteFocused) return;
      handlePaste(e);
    };

    const pasteArea = pasteAreaRef.current;
    if (pasteArea) {
      pasteArea.addEventListener('paste', handlePasteInArea as EventListener);
    }

    // Global paste event cho toàn bộ document
    document.addEventListener('paste', handlePaste as EventListener);

    return () => {
      if (pasteArea) {
        pasteArea.removeEventListener('paste', handlePasteInArea as EventListener);
      }
      document.removeEventListener('paste', handlePaste as EventListener);
    };
  }, [isPasteFocused, isModalOpen, imagePreview, isLoading]);

  // Format giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  // Lấy tên tỉnh/thành phố từ đối tượng address
  const getLocationName = (product: ProductProps) => {
    if (product.address?.province?.ProvinceName) {
      return product.address.province.ProvinceName;
    }
    return 'Không xác định';
  };

  // Render các sản phẩm kết quả tìm kiếm
  const renderSearchResults = () => {
    if (isSearching || isLoading) {
      return (
        <div className="loading-container">
          <Spin size="large" />
          <Text className="loading-text">Đang tìm kiếm sản phẩm tương tự...</Text>
        </div>
      );
    }

    if (!searchResults || searchResults.length === 0) {
      return <Empty description="Không tìm thấy sản phẩm nào tương tự" className="empty-results" />;
    }

    return (
      <div className="search-results-container">
        <div className="image-results-header">
          <Button icon={<RollbackOutlined />} onClick={handleBackToSearch} className="back-button">
            Tìm kiếm mới
          </Button>
          <Text className="result-count">Tìm thấy {searchResults.length} sản phẩm tương tự</Text>
        </div>

        {imagePreview && (
          <div className="search-image-preview">
            <img src={imagePreview} alt="Hình ảnh tìm kiếm" className="small-preview" />
          </div>
        )}

        <List
          className="results-list"
          itemLayout="horizontal"
          dataSource={searchResults}
          renderItem={(item) => (
            <List.Item className="result-item animate-item">
              <Link to={`/${item.slug}`} className="result-link">
                <Card hoverable className="result-card">
                  <Flex align="start" gap={16}>
                    <div className="result-image-container">
                      <img src={item.image[0]} alt={item.name} className="result-image" />
                    </div>
                    <div className="result-content">
                      <Title level={5} className="result-title">
                        {item.name}
                      </Title>
                      <Text className="result-price" strong>
                        {formatPrice(item.price)}
                      </Text>
                      <Flex align="center" className="result-location" gap={4}>
                        <EnvironmentOutlined className="location-icon" />
                        <Text className="location-text">{getLocationName(item)}</Text>
                      </Flex>
                      <Text className="result-quality">
                        Tình trạng: <span className="quality-value">{item.quality}</span>
                      </Text>
                    </div>
                  </Flex>
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </div>
    );
  };

  return (
    <>
      <Button
        className="image-search-button"
        type="text"
        icon={<CameraOutlined />}
        onClick={showModal}
        aria-label="Tìm kiếm bằng hình ảnh"
      />

      <Modal
        title="Tìm kiếm bằng hình ảnh"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          !showResults
            ? [
                <Button key="cancel" onClick={handleCancel}>
                  Hủy
                </Button>,
                <Button
                  key="search"
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                  disabled={!imagePreview || isLoading}
                  loading={isLoading}
                >
                  Tìm kiếm
                </Button>,
              ]
            : null
        }
        centered
        width={showResults ? 700 : 520}
        className={showResults ? 'results-modal' : ''}
      >
        <div className="image-search-content">
          {showResults ? (
            renderSearchResults()
          ) : isLoading ? (
            <Spin tip="Đang tìm kiếm..." size="large" />
          ) : (
            <>
              {imagePreview ? (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <Button icon={<DeleteOutlined />} danger onClick={handleRemoveImage} className="remove-image-button">
                    Xóa ảnh
                  </Button>
                </div>
              ) : (
                <>
                  <Upload.Dragger {...uploadProps} className="upload-container">
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">Nhấn hoặc kéo thả hình ảnh vào đây</p>
                    <p className="ant-upload-hint">Hỗ trợ tải lên một hình ảnh duy nhất (JPG, PNG, GIF)</p>
                  </Upload.Dragger>

                  <Divider plain>Hoặc</Divider>

                  <div
                    ref={pasteAreaRef}
                    className={`paste-area ${isPasteFocused ? 'focused' : ''}`}
                    onClick={() => setIsPasteFocused(true)}
                    onBlur={() => setIsPasteFocused(false)}
                    tabIndex={0}
                  >
                    <CopyOutlined className="paste-icon" />
                    <p className="paste-text">Nhấn vào đây và dán (Ctrl+V) hình ảnh từ clipboard</p>
                    <p className="paste-hint">Hoặc dán ảnh bất cứ đâu khi cửa sổ này đang mở</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ImageSearch;
