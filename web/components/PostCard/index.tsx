import React from "react";

import { humanDate } from "@/libs/date-fns";
import { pagePath } from "@/libs/app/const";
import { Title } from "@/components/PostCard/styled";
import { Box, Paper, Typography, Stack } from "@mui/material";

type PostCardProps = {
  id: number;
  slug: string;
  title: string;
  createdAt: string;
  authorName: string;
};

export const PostCard = ({
  id,
  slug,
  title,
  createdAt,
  authorName,
}: PostCardProps) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Box>
          <Typography>{authorName}</Typography>
          <Typography>{humanDate(createdAt)}</Typography>
        </Box>
        <Title
          href={{
            query: { slug: `${id}-${slug}` },
            pathname: pagePath.post.detail,
          }}
        >
          {title}
        </Title>
      </Stack>
    </Paper>
  );
};
