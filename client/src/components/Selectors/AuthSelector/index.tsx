import React, { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { AuthSelectorProps } from "./types";

export const AuthSelector: FC<AuthSelectorProps> = ({
  isAuth,
  handleAuth,
  loginBtnText,
  anchorAuthEl,
  handleAuthClose,
  handleSingOut,
  handleSingIn,
  signOutText,
  singInText
}) => {
  return (
    <Box sx={{ ml: "auto" }}>
      <Button onClick={handleAuth} color="inherit" sx={{ ml: "auto" }}>
        {isAuth ? (
          <Box
            sx={{
              ml: "auto",
              width: "35px",
              height: "35px",
              backgroundImage: `url("data:image/svg+xml,%3Csvg class='svg-icon' style='width:1em;height:1em;vertical-align:middle;fill:%23FFF;overflow:hidden' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m534.528 628.736-18.432 26.624s-12.288 24.576 14.336 36.864c69.632 30.72 86.016 71.68 96.256 83.968 10.24 12.288 28.672 12.288 36.864-2.048 26.624-55.296 59.392-174.08 196.608-276.48-163.84 59.392-215.04 186.368-215.04 186.368s-30.72-47.104-67.584-61.44c-32.768-12.288-43.008 6.144-43.008 6.144zm0 0'/%3E%3Cpath d='M514.048 747.52c-45.056-24.576-61.44-79.872-38.912-124.928l2.048-4.096c24.576-45.056 79.872-61.44 124.928-38.912l38.912 20.48c6.144-8.192 14.336-18.432 22.528-26.624-26.624-16.384-59.392-28.672-90.112-38.912-4.096-2.048-26.624-12.288-12.288-55.296 36.864-38.912 61.44-100.352 61.44-161.792 0-94.208-57.344-143.36-131.072-143.36-71.68 0-129.024 49.152-129.024 143.36 0 61.44 24.576 124.928 61.44 163.84 14.336 38.912-12.288 53.248-16.384 55.296-75.776 28.672-163.84 77.824-163.84 126.976v18.432c0 67.584 129.024 83.968 249.856 83.968 18.432 0 34.816 0 53.248-2.048l-32.768-16.384zm0 0'/%3E%3C/svg%3E%0A")`
            }}
          />
        ) : (
          loginBtnText || "Login"
        )}
      </Button>
      <Menu
        id="menu-appbar-auth"
        anchorEl={anchorAuthEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={Boolean(anchorAuthEl)}
        onClose={handleAuthClose}
      >
        {isAuth ? (
          <MenuItem onClick={handleSingOut}>
            {signOutText || "Sign out"}
          </MenuItem>
        ) : (
          <MenuItem onClick={handleSingIn}>{singInText || "Sing in"}</MenuItem>
        )}
      </Menu>
    </Box>
  );
};
