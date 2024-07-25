import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  padding-top: 4rem;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loader() {
  return (
    <LoaderWrapper>
      <CircularProgress style={{ width: 80, height: 80 }} />
    </LoaderWrapper>
  );
}

export default Loader;
