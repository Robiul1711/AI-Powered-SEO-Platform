import { Outlet, ScrollRestoration } from "react-router-dom";

export default function Service() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
