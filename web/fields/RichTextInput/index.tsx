import React from "react";

import { RichText, RichTextProps } from "@/components";
import { Controller, Control } from "@/libs/hook-form";

type RichTextInputProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
} & RichTextProps;

export const RichTextInput = ({ name, label, control }: RichTextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, ...other }, fieldState: { error } }) => {
        return (
          <RichText {...other} label={label} errorMessage={error?.message} />
        );
      }}
    />
  );
};
