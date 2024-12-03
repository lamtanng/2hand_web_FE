import { Button } from 'antd';

export const ConfirmButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLElement> | undefined }) => {
  return (
    <Button type="primary" className="h-10 text-base" onClick={onClick}>
      Confirm Order
    </Button>
  );
};

export const CancelButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLElement> | undefined }) => {
  return (
    <Button variant="outlined" className="h-10 text-base" onClick={onClick}>
      Cancel Order
    </Button>
  );
};

export const SendResponseButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLElement> | undefined }) => {
  return (
    <Button type="primary" className="h-10 text-base" onClick={onClick}>
      Send
    </Button>
  );
};

export const DeliveringButton = ({
  onClick,
  isLoading,
}: {
  onClick: React.MouseEventHandler<HTMLElement> | undefined;
  isLoading: boolean;
}) => {
  return (
    <Button type="primary" className="h-10 text-base" onClick={onClick} loading={isLoading}>
      Deliver Order
    </Button>
  );
};

export const ResponseReviewButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLElement> | undefined }) => {
    return (
      <Button type="primary" className="h-10 text-base" onClick={onClick}>
        Response
      </Button>
    );
  };
