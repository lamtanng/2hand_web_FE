import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Flex, MenuProps, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import ImageUploader from './components/ImageUploader';

const ReturnModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  // const items: MenuProps['items'] = reasons.map((reason: ReasonProps) => ({
  //   key: JSON.stringify(reason),
  //   label: reason.name,
  // }));

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
  ]

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // setChoosenReason(JSON.parse(e.key));
    // setEditable(true)
    console.log(e.key)
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
    selectable: true,
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-30 flex items-center justify-center transition-colors ${isModalOpen ? 'visible bg-black/20' : 'invisible'} `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[70vh] w-1/3 rounded-xl bg-white p-6 shadow transition-all ${isModalOpen ? 'scale-100 opacity-100' : 'scale-100 opacity-0'} `}
      >
        <Button variant="text" onClick={handleClose} className="absolute right-2 top-2 border-none text-gray-400">
          <CloseOutlined />
        </Button>
        <Typography.Title level={4} className="m-0 mb-2 text-blue-600">
          Choose a reason
        </Typography.Title>
        <Typography.Paragraph className="m-0">Why do you want to return this order?</Typography.Paragraph>
        <Divider />
        <div className="max-h-[calc(70vh-120px)] overflow-y-auto px-6">
          <Flex vertical>
            <Typography.Paragraph className="m-0 mb-[10px]">
              Return Reason <span className="text-red-600">*</span>:{' '}
            </Typography.Paragraph>
            <Dropdown menu={menuProps} trigger={['click']} className="mb-6">
              <Button className="h-10 w-full">
                <Flex justify="space-between" className="w-full">
                  <Typography.Paragraph className="m-0 truncate">
                    {'Select reason'}
                  </Typography.Paragraph>
                  <DownOutlined />
                </Flex>
              </Button>
            </Dropdown>
          </Flex>
          <Flex vertical gap={'small'} className="mb-6">
            <Typography.Paragraph className="m-0">
              Description <span className="text-red-600">*</span>:{' '}
            </Typography.Paragraph>
            <TextArea
              showCount
              maxLength={500}
              autoSize={{ minRows: 3 }}
              //   onChange={(e) => {
              //     setDescription(e.target.value);
              //     setDirty(false);
              //   }}
              className="mb-6"
              //   disabled={!isEditable}
            />
          </Flex>
          <Flex vertical gap={'small'} className="mb-6">
            <Typography.Paragraph className="m-0">
              Proof: <span className="text-red-600">*</span>:{' '}
            </Typography.Paragraph>
            <ImageUploader base64Images={[]} setBase64Images={() => {}} />
          </Flex>
          <Divider />
          <Flex justify="end" gap={'large'}>
            <Button className="px-8 py-5 text-base" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="primary" className="px-8 py-5 text-base" onClick={handleOk}>
              OK
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default ReturnModal;
