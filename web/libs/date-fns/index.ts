import { isValid, format } from "date-fns";

export const humanDate = (val: string) => {
  const date = new Date(val);

  if (!isValid(date)) {
    return "";
  }
  return format(date, "dd MMM yy");
};

export const humanDateTime = (val: string) => {
  const date = new Date(val);

  if (!isValid(date)) {
    return "";
  }
  return format(date, "yyyy/MM/dd H:m");
};
