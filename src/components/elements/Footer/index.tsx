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
            <Title level={4}>LMarket</Title>
            <Paragraph className="text-gray-600">
              LMarket is your one-stop destination for discovering, buying, and selling quality products. Experience a
              modern, secure, and user-friendly marketplace.
            </Paragraph>
            <Space className="mt-4">
              <a
                href="https://facebook.com/lmarket"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
              >
                <FacebookOutlined className="text-xl" />
              </a>
              <a
                href="https://instagram.com/lmarket"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600"
              >
                <InstagramOutlined className="text-xl" />
              </a>
              <a
                href="https://twitter.com/lmarket"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-400"
              >
                <TwitterOutlined className="text-xl" />
              </a>
              <a
                href="https://linkedin.com/company/lmarket"
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
              <Link to="/about" className="text-gray-600 hover:text-blue-600">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
              <Link to="/faq" className="text-gray-600 hover:text-blue-600">
                FAQ
              </Link>
            </Space>
          </div>

          {/* Customer Service */}
          <div>
            <Title level={4}>Customer Service</Title>
            <Space direction="vertical" className="w-full">
              <Link to="/help" className="text-gray-600 hover:text-blue-600">
                Help Center
              </Link>
              <Link to="/returns" className="text-gray-600 hover:text-blue-600">
                Returns & Refunds
              </Link>
              <Link to="/shipping" className="text-gray-600 hover:text-blue-600">
                Shipping Info
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-blue-600">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-600 hover:text-blue-600">
                Privacy Policy
              </Link>
            </Space>
          </div>

          {/* Contact Info */}
          <div>
            <Title level={4}>Contact Us</Title>
            <Space direction="vertical" className="w-full">
              <Space className="text-gray-600">
                <HomeOutlined />
                <Text>456 Commerce Avenue, Metropolis, Country</Text>
              </Space>
              <Space className="text-gray-600">
                <PhoneOutlined />
                <Text>+1 800 123 4567</Text>
              </Space>
              <Space className="text-gray-600">
                <MailOutlined />
                <Text>support@lmarket.com</Text>
              </Space>
            </Space>
          </div>
        </div>

        <Divider className="my-8" />

        {/* Copyright */}
        <div className="text-center text-gray-600">
          <Text>© {new Date().getFullYear()} LMarket. All rights reserved.</Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
