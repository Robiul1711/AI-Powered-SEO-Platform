import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/homePage/Home";
import Layout from "../layout/Layout";
import AdminLayout from "../layout/AdminLayout";
import Service from "@/pages/service/Service";
import MonthlyService from "@/components/service-component/MonthlyService";
import LocalService from "@/components/service-component/LocalService";
import PpcService from "@/components/service-component/PpcService";
import ContentWriting from "@/components/service-component/ContentWriting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "services",
        element: <Service />,
        children: [
          { path: "monthly-seo", element: <MonthlyService /> },
          { path: "local-seo", element: <LocalService /> },
          { path: "ppc-campaigns", element: <PpcService /> },
          { path: "content-writing", element: <ContentWriting /> },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      // /dashboard/add-admin
      // Add more admin pages here
    ],
  },
]);

export default router;
