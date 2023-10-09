/* eslint-disable no-unused-vars */
import React from "react";

type LangSelectorProps = {
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  language: string;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  handleSelectLang: (selectedLang: string) => void;
  defaultLangText?: string;
  ruLangText?: string;
};

export { LangSelectorProps };
