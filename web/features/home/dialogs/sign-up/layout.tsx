import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { toast } from "@/libs/toast";
import { TextInput } from "@/fields";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "@/contexts/auth";
import { useTranslation } from "next-i18next";
import { LengthConfig } from "@/libs/app/const";
import { ModalType } from "@/features/home/shared";
import { yup, useForm, yupResolver } from "@/libs/hook-form";
import { useSignUpMutation } from "@/graphql/authen/sign-up.graphql";
import { SignUpForm, signUpForm } from "@/features/home/dialogs/sign-up/const";

type SignUpDialogProps = {
  onModalChange: (val: ModalType) => void;
};

const SignUpDialog = ({ onModalChange }: SignUpDialogProps) => {
  const { useInitAuth } = useAuth();
  const { t } = useTranslation("home", { keyPrefix: "dialog.sign-up" });

  const { handleSubmit, control } = useForm<SignUpForm>({
    defaultValues: signUpForm,
    resolver: yupResolver(
      yup.object({
        name: yup.string().required(t("form.message.required.name") as string),
        email: yup
          .string()
          .required(t("form.message.required.email") as string)
          .email(t("form.message.format.email") as string),
        password: yup
          .string()
          .required(t("form.message.required.password") as string)
          .min(
            LengthConfig.Password,
            t("form.message.min.password", {
              value: LengthConfig.Password,
            }) as string
          ),
      })
    ),
  });

  const [signUp, { loading }] = useSignUpMutation({
    onCompleted: (data) => {
      const { signUp } = data || {};

      useInitAuth(signUp.token);
      toast.success(t("message.success.create"));

      return onModalChange(ModalType.Close);
    },
    onError: () => {
      return toast.success(t("message.error.system"));
    },
  });

  const onSubmit = handleSubmit((data) => {
    return signUp({
      variables: {
        input: data,
      },
    });
  });

  const onCancel = () => {
    return onModalChange(ModalType.Close);
  };

  return (
    <Dialog open={true}>
      <DialogTitle align="center" sx={{ textTransform: "uppercase" }}>
        {t("title")}
      </DialogTitle>
      <DialogContent>
        <TextInput name="name" control={control} label={t("form.label.name")} />
        <TextInput
          name="email"
          control={control}
          label={t("form.label.email")}
        />
        <TextInput
          type="password"
          name="password"
          control={control}
          label={t("form.label.password")}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton variant="outlined" onClick={onCancel} loading={loading}>
          {t("form.btn.cancel")}
        </LoadingButton>
        <LoadingButton variant="contained" onClick={onSubmit} loading={loading}>
          {t("form.btn.submit")}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default SignUpDialog;
