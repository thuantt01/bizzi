import NextLink from "next/link";

import { styled } from "@mui/material/styles";

export const Title = styled(NextLink)(({ theme }) => ({
  color: "black",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: theme.spacing(4),
  "&:hover": {
    textDecoration: "underline",
  },
}));
