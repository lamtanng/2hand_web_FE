import { Button, Flex, Image, Typography } from 'antd';
import notFound from '../../assets/notFound.webp';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <Flex vertical justify="center" align="center" gap={'large'}>
        <Image width={'30%'} alt="" src={notFound} preview={false} />
        <Typography.Title level={1} className="m-0 text-5xl text-blue-600">
          404 Page Not Found
        </Typography.Title>
        <Typography.Title level={4} className="m-0">
          Oops! The page you are looking for seems to have wandered off.
        </Typography.Title>
        <Flex gap={'large'}>
          <Button type="primary" className="px-10 py-5 text-base font-semibold" onClick={() => navigate(-1)}>
            <ArrowLeftOutlined />
            Return to previous page
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className="px-10 py-5 text-base font-semibold"
            onClick={() => window.location.reload()}
          >
            <ReloadOutlined />
            Refresh
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default NotFoundPage;
