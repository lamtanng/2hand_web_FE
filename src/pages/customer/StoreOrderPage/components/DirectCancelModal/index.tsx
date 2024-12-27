import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio, RadioChangeEvent, Typography } from 'antd';
import { useState } from 'react';
import { ReasonProps } from '../../../../../types/http/reason.type';

const DirectCancelModal = ({
  isModalOpen,
  setIsModalOpen,
  reasons,
  directCancel,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reasons: ReasonProps[];
  directCancel: (reason: ReasonProps | undefined) => Promise<void>;
}) => {
  const [choosenReason, setChoosenReason] = useState<ReasonProps>();
  const [isDirty, setDirty] = useState<boolean>(true);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setChoosenReason(e.target.value);
    setDirty(false);
  };

  const handleOk = () => {
    directCancel(choosenReason);
    setIsModalOpen(false);
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
        <Typography.Paragraph className="m-0">Why do you want to cancel this order?</Typography.Paragraph>
        <Divider />
        <div className="max-h-[calc(70vh-120px)] overflow-y-auto px-6">
          <Radio.Group className="w-full" onChange={onChange}>
          <Flex vertical gap={"large"}>
            {reasons?.map((reason: ReasonProps) => (
                <Radio value={reason} className="w-full text-base">
                  {reason.name}
                </Radio>
              ))}
            </Flex>
          </Radio.Group>
          <Divider />
          <Flex justify="end" gap={'large'}>
            <Button className="px-8 py-5 text-base" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="primary" className="px-8 py-5 text-base" onClick={handleOk} disabled={isDirty}>
              OK
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default DirectCancelModal;
