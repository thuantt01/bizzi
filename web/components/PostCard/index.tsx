import React from "react";

import { UrlObject } from "url";
import { humanDate } from "@/libs/date-fns";
import { Title } from "@/components/PostCard/styled";
import { Box, Paper, Typography, Stack } from "@mui/material";

type PostCardProps = {
  title: string;
  createdAt: string;
  authorName: string;
  pagePath: string | UrlObject;
};

export const PostCard = ({
  title,
  pagePath,
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
        <Title href={pagePath}>{title}</Title>
      </Stack>
    </Paper>
  );
};
