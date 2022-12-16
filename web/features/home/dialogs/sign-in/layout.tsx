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
import { ModalType } from "@/features/home/shared";
import { yup, useForm, yupResolver } from "@/libs/hook-form";
import { useSignInMutation } from "@/graphql/authen/sign-in.graphql";
import { SignInForm, signInForm } from "@/features/home/dialogs/sign-in/const";

type SignInDialogProps = {
  onModalChange: (val: ModalType) => void;
};

const SignInDialog = ({ onModalChange }: SignInDialogProps) => {
  const { useInitAuth } = useAuth();
  const { t } = useTranslation("home", { keyPrefix: "dialog.sign-in" });

  const { handleSubmit, control } = useForm<SignInForm>({
    defaultValues: signInForm,
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .required(t("form.message.required.email") as string)
          .email(t("form.message.format.email") as string),
        password: yup
          .string()
          .required(t("form.message.required.password") as string),
      })
    ),
  });

  const [signIn, { loading }] = useSignInMutation({
    onCompleted: (data) => {
      const { signIn } = data || {};

      useInitAuth(signIn.token);

      return onModalChange(ModalType.Close);
    },
    onError: () => {
      return toast.success(t("message.error.system"));
    },
  });

  const onSubmit = handleSubmit((data) => {
    return signIn({
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

export default SignInDialog;
