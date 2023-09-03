import React, { FC } from "react";
import Box from "@mui/material/Box";

export const Divider: FC = () => (
  <Box
    sx={{
      height: 1,
      borderTop: "1px solid #d7d7d7",
      width: "100%",
      mb: "15px"
    }}
  />
);
