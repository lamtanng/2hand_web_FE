import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Typography, Space, Divider } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const Footer = () => {
  return (
    <footer className="mt-16 bg-gray-100 py-12">
      <div className="mx-auto w-10/12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div>
            <Title level={4}>2Hand Market</Title>
            <Paragraph className="text-gray-600">
              Your trusted destination for quality second-hand items. Making sustainable shopping accessible to
              everyone.
            </Paragraph>
            <Space className="mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
              >
                <FacebookOutlined className="text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600"
              >
                <InstagramOutlined className="text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-400"
              >
                <TwitterOutlined className="text-xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-800"
              >
                <LinkedinOutlined className="text-xl" />
              </a>
            </Space>
          </div>

          {/* Quick Links */}
          <div>
            <Title level={4}>Quick Links</Title>
            <Space direction="vertical" className="w-full">
              <Link to="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-blue-600">
                Shop
              </Link>
            </Space>
          </div>

          {/* Contact Info */}
          <div>
            <Title level={4}>Contact Us</Title>
            <Space direction="vertical" className="w-full">
              <Space className="text-gray-600">
                <HomeOutlined />
                <Text>123 Market Street, City, Country</Text>
              </Space>
              <Space className="text-gray-600">
                <PhoneOutlined />
                <Text>+1 234 567 8900</Text>
              </Space>
              <Space className="text-gray-600">
                <MailOutlined />
                <Text>support@2handmarket.com</Text>
              </Space>
            </Space>
          </div>
        </div>

        <Divider className="my-8" />

        {/* Copyright */}
        <div className="text-center text-gray-600">
          <Text>© {new Date().getFullYear()} 2Hand Market. All rights reserved.</Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
