import React, { Fragment, useState, useTransition } from "react";

import HeroPartial from "@/features/home/partials/hero";
import ArticlePartial from "@/features/home/partials/article";
import SignUpDialog from "@/features/home/dialogs/sign-up/layout";
import SignInDialog from "@/features/home/dialogs/sign-in/layout";

import { Container } from "@mui/material";
import { ModalType } from "@/features/home/shared";
import { Post } from "@/graphql/posts/get-posts.grapql";

type HomeLayoutProps = {
  posts: Post[];
};

const HomeLayout = ({ posts }: HomeLayoutProps) => {
  const [isBtnLoading, startTransition] = useTransition();
  const [modal, setModal] = useState<ModalType>(ModalType.Close);

  const onModalChange = (type: ModalType) => {
    return startTransition(() => setModal(type));
  };

  return (
    <Fragment>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <HeroPartial
          isBtnLoading={isBtnLoading}
          onModalChange={onModalChange}
        />
      </Container>

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <ArticlePartial posts={posts} />
      </Container>

      {modal === ModalType.SignUp && (
        <SignUpDialog onModalChange={onModalChange} />
      )}
      {modal === ModalType.SignIn && (
        <SignInDialog onModalChange={onModalChange} />
      )}
    </Fragment>
  );
};

export default HomeLayout;
