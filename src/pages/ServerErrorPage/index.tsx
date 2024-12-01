import { Button, Flex, Image, Typography } from 'antd';
import serverError from '../../assets/serverDown.png';
import { Link } from 'react-router-dom';
import { HomeFilled, ReloadOutlined } from '@ant-design/icons';

const ServerErrorPage = ({ error, onRetry }: { error?: string; onRetry?: () => void }) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };
  return (
    <div className="min-h-screen">
      <Flex vertical justify="center" align="center" gap={'large'}>
        <Image alt="" src={serverError} width={'30%'} preview={false} />
        <Typography.Title level={1} className="m-0 text-5xl text-blue-600">
          500 Internal Server Error
        </Typography.Title>
        {error && (
          <Typography.Title level={4} className="m-0">
            {error}
          </Typography.Title>
        )}
        <Flex gap={'large'}>
          <Link to={'/'}>
            <Button type="primary" className="px-10 py-5 text-base font-semibold">
              <HomeFilled />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="primary"
            className="px-10 py-5 text-base font-semibold"
            onClick={handleRetry}
          >
            <ReloadOutlined />
            Refresh
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default ServerErrorPage;
