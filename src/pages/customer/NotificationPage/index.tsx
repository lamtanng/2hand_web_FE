import { Divider, Flex, Typography, Tabs, Empty, Spin, Button, List, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getNotificationConfig, getNotificationIcon } from './notificationUtils';
import useNotificationPage from './useNotification';

dayjs.extend(relativeTime);

const Notifications = () => {
  const {
    activeTab,
    loading,
    notifications,
    hasMore,
    fetchMore,
    handleTabChange,
    handleNotificationClick,
    handleMarkAllAsRead,
    handleClearNotifications,
    user,
  } = useNotificationPage();

  return (
    <div className="px-12 py-5">
      <Flex justify="space-between" align="center" className="mb-4">
        <div>
          <Typography.Title level={3}>Notifications</Typography.Title>
          <Typography.Text type="secondary">View and manage your notifications</Typography.Text>
        </div>
        <div className="flex gap-2">
          {notifications.length > 0 && (
            <>
              <Button type="primary" onClick={handleMarkAllAsRead}>
                Mark all as read
              </Button>
              <Button danger onClick={handleClearNotifications}>
                Clear all
              </Button>
            </>
          )}
        </div>
      </Flex>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={[
            {
              key: 'user',
              label: 'Personal Notifications',
              disabled: !user._id,
            },
            {
              key: 'store',
              label: 'Store Notifications',
              disabled: !user.storeId,
            },
          ]}
        />
        <Divider className="my-4" />

        <div id="scrollableDiv" className="h-[calc(100vh-300px)] overflow-auto">
          {loading && notifications.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <Spin size="large" />
            </div>
          ) : notifications.length === 0 ? (
            <Empty description="No notifications yet" />
          ) : (
            <InfiniteScroll
              dataLength={notifications.length}
              next={fetchMore}
              hasMore={hasMore}
              loader={<div className="py-2 text-center text-gray-400">Loading more...</div>}
              endMessage={<div className="py-2 text-center text-gray-400">No more notifications</div>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={notifications}
                renderItem={(notification) => {
                  const config = getNotificationConfig(notification.type);
                  return (
                    <List.Item
                      className={`cursor-pointer border-b transition-colors duration-200 hover:bg-gray-50 ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <List.Item.Meta
                        avatar={
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                            {getNotificationIcon(notification.type)}
                          </div>
                        }
                        title={
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{notification.title}</span>
                            <Tag color={config.color}>{config.tagText}</Tag>
                          </div>
                        }
                        description={
                          <div>
                            <div className="mb-1" dangerouslySetInnerHTML={{ __html: notification.content }} />
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{dayjs(notification.createdAt).fromNow()}</span>
                              {!notification.isRead && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  );
                }}
              />
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
