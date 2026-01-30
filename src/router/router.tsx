import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/homePage/Home";
import Layout from "../layout/Layout";
import AdminLayout from "../layout/AdminLayout";
import Service from "@/pages/service/Service";
import MonthlyService from "@/components/service-component/MonthlyService";
import LocalService from "@/components/service-component/LocalService";
import PpcService from "@/components/service-component/PpcService";
import ContentWriting from "@/components/service-component/ContentWriting";
import SEOAudit from "@/pages/aiSeoAuditPage/SEOAudit";
import Contact from "@/pages/contactPage/Contact";
import CaseStudies from "@/pages/caseStudiesPage/CaseStudies";
import Pricing from "@/pages/pricingPage/Pricing";

import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ResetPassword from "../pages/auth/ResetPassword";
import SimpleCheckout from "@/pages/simpleCheckoutPage/SimpleCheckout";
import AboutPage from "@/pages/aboutPage/AboutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "ai-seo-audit", element: <SEOAudit /> },
      { path: "contact", element: <Contact /> },
      { path: "case-studies", element: <CaseStudies /> },
      { path: "about", element: <AboutPage /> },
      { path: "pricing", element: <Pricing /> },
      { path: "simple-checkout", element: <SimpleCheckout /> },
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
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verify-otp", element: <VerifyOtp /> },
      { path: "reset-password", element: <ResetPassword /> },
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
