export const getIdSlug = (slug: string): number => {
  const [id] = slug.split("-");

  const intValue = +id;
  if (intValue) {
    return intValue;
  }
  return 0;
};
