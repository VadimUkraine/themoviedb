import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import isAuthenticated from "../../helpers/isAuthenticated";
import { USER_ID } from "../../constants/variables";

export const Layout: FC = () => {
  const isAuth = isAuthenticated();
  const userId = sessionStorage.getItem(USER_ID);

  return (
    <div>
      <Header isAuth={isAuth} />
      <Outlet context={userId} />
    </div>
  );
};
