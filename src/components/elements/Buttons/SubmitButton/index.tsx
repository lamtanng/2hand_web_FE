import LoadingButton from '@mui/lab/LoadingButton';
import { MouseEventHandler } from 'react';
import ButtonProps from '../../../../types/button.type';

export interface SubmitButtonProps extends ButtonProps {
  isSubmitting?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function SubmitButton({
  text = 'Finish',
  variant = 'contained',
  isSubmitting,
  isDirty = true,
  onClick,
}: SubmitButtonProps) {
  return (
    <LoadingButton
      variant={variant}
      type="submit"
      size="large"
      fullWidth
      className="group"
      loading={isSubmitting}
      disabled={isDirty ? false : true}
      onClick={onClick}
      // loadingPosition='start'
    >
      <span>{text}</span>
    </LoadingButton>
  );
}
