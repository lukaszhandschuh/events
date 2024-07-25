import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useLocale } from "../providers/AppLocale";
import StyledLink from "./StyledLink";

const HeaderWrapper = styled.header`
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Header() {
  const { locale, setLocale } = useLocale();
  const eventsPage = useLocation().pathname === "/events";

  const handleLocale = (
    _event: React.MouseEvent<HTMLElement>,
    newLocale: "pl" | "en" | null
  ) => {
    if (!newLocale) {
      return;
    }

    setLocale(newLocale);
  };

  return (
    <HeaderWrapper>
      <StyledLink to={eventsPage ? "/events/create" : "/events"}>
        <Button variant="contained">
          <FormattedMessage id={eventsPage ? "addEvent" : "eventsList"} />
        </Button>
      </StyledLink>
      <ToggleButtonGroup
        color="primary"
        value={locale}
        exclusive
        onChange={handleLocale}
        aria-label="text alignment"
      >
        <ToggleButton value="pl" aria-label="left aligned">
          PL
        </ToggleButton>
        <ToggleButton value="en" aria-label="centered">
          EN
        </ToggleButton>
      </ToggleButtonGroup>
    </HeaderWrapper>
  );
}

export default Header;
