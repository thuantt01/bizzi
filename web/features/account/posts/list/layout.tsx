import React, { Fragment, useState, ChangeEvent } from "react";

import NextLink from "next/link";

import { PostCard } from "@/components";
import { pagePath } from "@/libs/app/const";
import { useTranslation } from "next-i18next";
import { Cursor } from "@/features/account/posts/list/const";
import { Stack, Box, Button, Grid, Pagination } from "@mui/material";
import { useGetUserPostsQuery } from "@/graphql/account/posts/get-user-posts.graphql";

const AccountPostsLayout = () => {
  const { t } = useTranslation("account", { keyPrefix: "post.list" });

  const [cursor, setCursor] = useState<Cursor>({
    count: 0,
    page: 1,
    edges: [],
  });

  const { loading } = useGetUserPostsQuery({
    variables: {
      page: cursor.page,
    },
    onCompleted: (data) => {
      const { userPosts, totalPage } = data || {};

      const count = +totalPage || 0;
      const edges = Array.isArray(userPosts) ? userPosts : [];

      return setCursor({ ...cursor, edges, count });
    },
  });

  const onPageChange = (e: ChangeEvent<unknown>, value: number) => {
    return setCursor({ ...cursor, page: value });
  };

  return (
    <Stack spacing={2}>
      <Box display="flex" justifyContent="right">
        <Button
          variant="contained"
          component={NextLink}
          href={pagePath.account.post.new}
        >
          {t("btn.new")}
        </Button>
      </Box>
      <Grid container spacing={2}>
        {cursor.edges.length === 0 && !loading && (
          <Grid item xs={12} textAlign="center">
            {t("message.error.emtpy")}
          </Grid>
        )}

        <Fragment>
          {cursor.edges.map(({ id, slug, title, user, createdAt }) => {
            const item = { id, slug, title, createdAt };

            return (
              <Grid item xs={6} key={`${slug}-${id}`}>
                <PostCard
                  {...item}
                  authorName={user.name}
                  pagePath={{
                    query: { id },
                    pathname: pagePath.account.post.edit,
                  }}
                />
              </Grid>
            );
          })}
        </Fragment>
      </Grid>
      {cursor.count > 0 && (
        <Box display="flex" justifyContent="center">
          <Pagination
            page={cursor.page}
            count={cursor.count}
            onChange={onPageChange}
          />
        </Box>
      )}
    </Stack>
  );
};

export default AccountPostsLayout;
