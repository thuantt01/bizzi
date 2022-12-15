import React from "react";

import { showHtml } from "@/libs/sanitize-html";
import { humanDateTime } from "@/libs/date-fns";
import { Post } from "@/graphql/posts/get-post.grapql";
import { Container, Paper, Typography, Stack, Box } from "@mui/material";

type PostLayoutProps = {
  post: Post;
};

const PostLayout = ({ post }: PostLayoutProps) => {
  const { title, content, user, createdAt } = post;
  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="subtitle2">
            {user.name} - {humanDateTime(createdAt)}
          </Typography>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{
              __html: showHtml(content),
            }}
          />
        </Stack>
      </Paper>
    </Container>
  );
};

export default PostLayout;
