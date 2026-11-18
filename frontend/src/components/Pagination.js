import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationOutLine = (props) => {
  const handleChange = (e, page) => {
    props.handlePage(page);
  };

  return (
    <div className="pagination justify-content-center">
      <Stack spacing={2}>
        <Pagination
          onChange={handleChange}
          page={props.page ?? 1}
          count={props.counter ?? 5}
          variant="outlined"
        />
      </Stack>
    </div>
  );
};

export default PaginationOutLine;
