import { Button } from 'antd';

export const CancelButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLElement> | undefined }) => {
  return (
    <Button type="primary" className="h-10 text-base" onClick={onClick}>
      Cancel Order
    </Button>
  );
};

export const RebuyButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLElement> | undefined }) => {
  return (
    <Button type="primary" className="h-10 text-base" onClick={onClick} disabled>
      Rebuy
    </Button>
  );
};

export const ReviewButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLElement> | undefined }) => {
  return (
    <Button variant="outlined" className="h-10 text-base" onClick={onClick}>
      Review
    </Button>
  );
};

export const ConfirmReceivedButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLElement> | undefined }) => {
  return (
    <Button type="primary" className="h-10 text-base" onClick={onClick}>
      Received Order
    </Button>
  );
};

export const ContactShopButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLElement> | undefined }) => {
  return (
    <Button variant="outlined" className="h-10 text-base" onClick={onClick} disabled>
      Contact Shop
    </Button>
  );
};

export const ReturnButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLElement> | undefined }) => {
  return (
    <Button variant="outlined" className="h-10 text-base" onClick={onClick} disabled>
      Return Order
    </Button>
  );
};
