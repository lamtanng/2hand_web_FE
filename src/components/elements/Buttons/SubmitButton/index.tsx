import { Button } from 'antd';
import { MouseEventHandler } from 'react';
import ButtonProps from '../../../../types/button.type';

export interface SubmitButtonProps extends ButtonProps {
  isSubmitting?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function SubmitButton({
  text = 'Finish',
  isSubmitting,
  isDirty = true,
  onClick,
}: SubmitButtonProps) {
  return (
    <Button
      type='primary'
      htmlType="submit"
      size="large"
      className="group w-full"
      loading={isSubmitting}
      disabled={isDirty ? false : true}
      onClick={onClick}
      id="sign-in-button"
    >
      <span>{text}</span>
    </Button>
  );
}
