import React, { Fragment, useState } from "react";

import { PostCard } from "@/components";
import { Box, Grid } from "@mui/material";
import { Post } from "@/graphql/posts/get-posts.grapql";

type ArticlePartialProps = {
  posts: Post[];
};

const ArticlePartial = ({ posts }: ArticlePartialProps) => {
  const [edges, setEdges] = useState<Post[]>(posts);

  return (
    <Box>
      <Grid container spacing={2}>
        <Fragment>
          {edges.map(({ id, slug, title, user, createdAt }) => {
            const item = { id, slug, title, createdAt };

            return (
              <Grid item xs={4} key={`${slug}-${user.id}`}>
                <PostCard {...item} authorName={user.name} />
              </Grid>
            );
          })}
        </Fragment>
      </Grid>
    </Box>
  );
};

export default ArticlePartial;
