export const getIdSlug = (slug: string): number => {
  const [id] = slug.split("-");

  const intValue = +id;
  if (intValue) {
    return intValue;
  }
  return 0;
};

export const toInt = (number: string | string[] | undefined): number => {
  if (!number) {
    return 0;
  }

  const value = Array.isArray(number) ? number[0] : number;

  return +value || 0;
};
