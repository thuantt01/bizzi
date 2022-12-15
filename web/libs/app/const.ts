export enum LengthConfig {
  Password = 6,
  TextField = 255,
  RichText = 5000,
}

export enum Layout {
  Master = "master",
  Private = "private",
}

export const pagePath = {
  post: {
    detail: "/posts/[slug]",
  },
  account: {
    index: "/account/posts",
  },
};
