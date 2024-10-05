import { Stack, TextField, Typography } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';
import { ControlledInputProps } from '../../../../types/input.type';

export default function ControlledInput<FormValues extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  multiline = false,
  rows = 4,
  disabled = false,
  isRequired = false,
}: ControlledInputProps<FormValues>) {
  return (
    <Controller
      shouldUnregister={true}
      key={name}
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          disabled={disabled}
          helperText={error ? error.message : null}
          error={!!error}
          value={value}
          label={
            <Stack direction="row" spacing={2}>
              {label}
              {isRequired && <Typography color="error">*</Typography>}
            </Stack>
          }
          type={type}
          multiline={multiline}
          rows={rows}
          size="medium"
          onChange={onChange}
          fullWidth
          variant="outlined"
        />
      )}
    />
  );
}
