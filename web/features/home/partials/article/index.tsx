import React, {
  Fragment,
  useState,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";

import { PostCard } from "@/components";
import { Box, Grid, Pagination, Stack } from "@mui/material";
import { Cursor } from "@/features/home/partials/article/const";
import { Post, useGetPostsQuery } from "@/graphql/posts/get-posts.graphql";

type ArticlePartialProps = {
  posts: Post[];
  count: number;
};

const ArticlePartial = ({ posts, count }: ArticlePartialProps) => {
  const initer = useRef<boolean>(false);
  const [cursor, setCursor] = useState<Cursor>({
    count,
    page: 1,
    edges: posts,
  });

  useGetPostsQuery({
    skip: !initer.current,
    variables: {
      page: cursor.page,
    },
    onCompleted: (data) => {
      const { posts } = data || {};

      const edges = Array.isArray(posts) ? posts : [];

      return setCursor({ ...cursor, edges });
    },
  });

  const onPageChange = (e: ChangeEvent<unknown>, value: number) => {
    return setCursor({ ...cursor, page: value });
  };

  useEffect(() => {
    if (!initer.current) {
      initer.current = true;
    }
  }, []);

  return (
    <Stack spacing={2} sx={{ mb: 2 }}>
      <Grid container spacing={2}>
        <Fragment>
          {cursor.edges.map(({ id, slug, title, user, createdAt }) => {
            const item = { id, slug, title, createdAt };

            return (
              <Grid item xs={4} key={`${slug}-${id}`}>
                <PostCard {...item} authorName={user.name} />
              </Grid>
            );
          })}
        </Fragment>
      </Grid>
      <Box display="flex" justifyContent="center">
        <Pagination
          page={cursor.page}
          count={cursor.count}
          onChange={onPageChange}
        />
      </Box>
    </Stack>
  );
};

export default ArticlePartial;
