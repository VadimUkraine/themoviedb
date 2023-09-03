import React, { FC, useState } from "react";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const Movies: FC = () => {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // console.log("pagination ---- ", value);
  };

  return (
    <Container
      sx={{
        display: "flex",
        // flexWrap: "wrap",
        border: "1px solid red",
        minWidth: "100%",
        pl: "15px",
        pr: "15px"
      }}
    >
      <Stack spacing={2}>
        <Pagination
          color="primary"
          count={10}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </Container>
  );
};
