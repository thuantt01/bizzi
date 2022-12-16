import React from "react";

import { toast } from "@/libs/toast";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import { Stack, Box } from "@mui/material";
import { pagePath } from "@/libs/app/const";
import { useTranslation } from "next-i18next";
import { LengthConfig } from "@/libs/app/const";
import { TextInput, RichTextInput } from "@/fields";
import {
  Form,
  formDefault,
} from "@/features/account/posts/_components/form/const";
import { yup, useForm, yupResolver } from "@/libs/hook-form";
import { UserPost } from "@/graphql/account/posts/get-user-post.graphql";
import { useUpdatePostMutation } from "@/graphql/account/posts/update-post.graphql";
import { useCreatePostMutation } from "@/graphql/account/posts/create-post.graphql";

type PostFormProps = {
  post?: UserPost;
};

const PostForm = ({ post }: PostFormProps) => {
  const { replace } = useRouter();
  const { t } = useTranslation("account", { keyPrefix: "_component.form" });

  const isEditView = !!post;

  const { handleSubmit, control } = useForm<Form>({
    defaultValues: isEditView ? post : formDefault,
    resolver: yupResolver(
      yup.object({
        title: yup
          .string()
          .required(t("message.required.title") as string)
          .max(
            LengthConfig.TextField,
            t("message.max.title", { value: LengthConfig.TextField }) as string
          ),
        content: yup
          .string()
          .required(t("message.required.content") as string)
          .max(
            LengthConfig.RichText,
            t("message.max.content", {
              value: LengthConfig.RichText,
            }) as string
          ),
      })
    ),
  });

  const [createPost, { loading: isCreateLoading }] = useCreatePostMutation({
    onCompleted: (data) => {
      const { id } = data?.createPost || {};

      if (id) {
        toast.success(t("message.success.create"));
        return replace({
          query: { id },
          pathname: pagePath.account.post.edit,
        });
      }
    },
    onError: () => {
      return toast.success(t("message.error.system"));
    },
  });

  const [updatePost, { loading: isUpdateLoading }] = useUpdatePostMutation({
    onCompleted: (data) => {
      const { id } = data?.updatePost || {};

      if (id) {
        return toast.success(t("message.success.update"));
      }
    },
    onError: () => {
      return toast.success(t("message.error.system"));
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (isEditView) {
      return updatePost({
        variables: {
          input: { id: post.id, ...data },
        },
      });
    }

    return createPost({
      variables: {
        input: data,
      },
    });
  });

  return (
    <Stack spacing={2}>
      <TextInput name="title" control={control} label={t("label.title")} />
      <RichTextInput
        name="content"
        control={control}
        label={t("label.content")}
      />

      <Box>
        <LoadingButton
          onClick={onSubmit}
          variant="contained"
          loading={isCreateLoading || isUpdateLoading}
        >
          {t("btn.submit")}
        </LoadingButton>
      </Box>
    </Stack>
  );
};

export default PostForm;
