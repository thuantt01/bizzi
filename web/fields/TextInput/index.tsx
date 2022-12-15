import React from "react";

import { Controller, Control } from "@/libs/hook-form";
import { TextField, TextFieldProps } from "@/components";

type TextInputProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
} & TextFieldProps;

export const TextInput = ({
  rows,
  name,
  label,
  control,
  type = "text",
  disabled = false,
  fullWidth = true,
  autoFocus = false,
  margin = "normal",
}: TextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...other }, fieldState: { error } }) => {
        return (
          <TextField
            {...other}
            rows={rows}
            type={type}
            size="small"
            label={label}
            inputRef={ref}
            maxRows={rows}
            error={!!error}
            margin={margin}
            variant="outlined"
            multiline={!!rows}
            disabled={disabled}
            fullWidth={fullWidth}
            autoFocus={autoFocus}
            helperText={error?.message}
          />
        );
      }}
    />
  );
};
