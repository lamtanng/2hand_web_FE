import { notification } from 'antd';

interface ImageSearchResponse {
  success: boolean;
  data: {
    products: Array<{
      id: string;
      name: string;
      image: string;
      price: number;
      // Thêm các trường khác nếu cần
    }>;
  };
  message?: string;
}

/**
 * API giả lập cho tìm kiếm sản phẩm bằng hình ảnh
 * @param imageBase64 Chuỗi base64 của hình ảnh (không bao gồm phần header data:image/...)
 * @returns Promise<ImageSearchResponse>
 */
export const searchProductsByImage = async (imageBase64: string): Promise<ImageSearchResponse> => {
  // Giả lập gọi API
  return new Promise((resolve, reject) => {
    // Giả lập thời gian gọi API
    setTimeout(() => {
      try {
        // Kiểm tra xem base64 có hợp lệ không (đơn giản là kiểm tra nó có tồn tại không)
        if (!imageBase64 || imageBase64.trim() === '') {
          throw new Error('Dữ liệu hình ảnh không hợp lệ');
        }

        // Trả về dữ liệu giả
        resolve({
          success: true,
          data: {
            products: [
              {
                id: '1',
                name: 'Áo thun trắng',
                image: 'https://example.com/white-tshirt.jpg',
                price: 199000,
              },
              {
                id: '2',
                name: 'Quần jean xanh',
                image: 'https://example.com/blue-jeans.jpg',
                price: 399000,
              },
              {
                id: '3',
                name: 'Giày thể thao',
                image: 'https://example.com/sneakers.jpg',
                price: 599000,
              },
              // Có thể thêm nhiều sản phẩm giả hơn
            ],
          },
        });
      } catch (error) {
        if (error instanceof Error) {
          notification.error({
            message: 'Lỗi tìm kiếm',
            description: error.message,
          });
          reject(error);
        } else {
          notification.error({
            message: 'Lỗi tìm kiếm',
            description: 'Đã xảy ra lỗi không xác định',
          });
          reject(new Error('Đã xảy ra lỗi không xác định'));
        }
      }
    }, 1500); // Giả lập độ trễ 1.5 giây
  });
};
