import { Button, Flex, Image, Typography } from 'antd';
import notFound from '../../assets/notFound.png';
import { Link } from 'react-router-dom';
import { HomeFilled, ReloadOutlined } from '@ant-design/icons';

const NotFoundPage = () => {
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
          <Link to={'/'}>
            <Button type="primary" className="px-10 py-5 font-semibold text-base">
            <HomeFilled />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="primary"
            className="px-10 py-5 font-semibold text-base"
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
