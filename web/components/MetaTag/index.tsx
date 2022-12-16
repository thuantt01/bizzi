import NextHead from "next/head";

export enum HeadChannel {
  Graph = "Graph",
  Twitter = "Twitter",
}

type HeadProps = {
  title: string;
  image?: string;
  url?: string;
  description?: string;
  blacklist?: HeadChannel[];
};

export const MetaTag = ({
  title,
  description,
  url,
  image,
  blacklist = [],
}: HeadProps) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {!blacklist.includes(HeadChannel.Graph) && (
        <>
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
        </>
      )}

      {!blacklist.includes(HeadChannel.Twitter) && (
        <>
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={url} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:image" content={image} />
        </>
      )}
    </NextHead>
  );
};

MetaTag.defaultProps = {
  image: "",
  blacklist: [],
  description: "",
  url: process.env.APP_URL,
};
