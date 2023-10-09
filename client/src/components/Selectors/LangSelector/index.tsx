import React, { FC } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import { LANGS } from "../../../constants/variables";
import getLangName from "../../../helpers/getLangName";
import { LangSelectorProps } from "./types";

export const LangSelector: FC<LangSelectorProps> = ({
  handleMenu,
  language,
  anchorEl,
  handleClose,
  handleSelectLang,
  defaultLangText,
  ruLangText
}) => {
  return (
    <Box
      sx={{
        border: "1px solid white"
      }}
    >
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        sx={{ textTransform: "capitalize" }}
      >
        {getLangName(language)}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          sx={{
            backgroundColor:
              language === LANGS.EN ? "rgba(0, 0, 0, 0.04)" : "transparent"
          }}
          onClick={() => handleSelectLang(LANGS.EN)}
        >
          {defaultLangText || "English"}
        </MenuItem>
        <MenuItem
          sx={{
            backgroundColor:
              language === LANGS.RU ? "rgba(0, 0, 0, 0.04)" : "transparent"
          }}
          onClick={() => handleSelectLang(LANGS.RU)}
        >
          {ruLangText || "Russian"}
        </MenuItem>
      </Menu>
    </Box>
  );
};
