import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/homePage/Home";
import Layout from "../layout/Layout";
import AdminLayout from "../layout/AdminLayout";
import Service from "@/pages/service/Service";
// import MonthlyService from "@/components/service-component/MonthlyService";
// import LocalService from "@/components/service-component/LocalService";
// import PpcService from "@/components/service-component/PpcService";
// import ContentWriting from "@/components/service-component/ContentWriting";
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
import CaseStudiesDetails from "@/pages/caseStudiesPage/CaseStudiesDetails";
import SuccessPage from "@/pages/successPage/SuccessPage";
import FailedPage from "@/pages/failedPage/FailedPage";

import Message from "@/pages/allDashboardPages/messagePage/Message";
import Account from "@/pages/allDashboardPages/accountPage/Account";
import ProgressAndTasks from "@/pages/allDashboardPages/progressTasksPage/ProgressAndTasks";
import MyService from "@/pages/allDashboardPages/servicePage/MyService";
import Report from "@/pages/allDashboardPages/reportPage/Report";
import Dashboard from "@/pages/allDashboardPages/dashboardPage/Dashboard";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import AllServices from "@/components/service-component/AllServices";
import NotFound from "@/pages/notFoundPage/NotFound";
import PrivacyPolicy from "@/pages/policyPages/PrivacyPolicy";
import TermsAndConditions from "@/pages/policyPages/TermsAndConditions";
import CookiePolicy from "@/pages/policyPages/CookiePolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "ai-seo-audit", element: <SEOAudit /> },
      { path: "contact", element: <Contact /> },
      { path: "case-studies", element: <CaseStudies /> },
      { path: "case-studies-details/:id", element: <CaseStudiesDetails /> },
      { path: "about", element: <AboutPage /> },
      { path: "pricing", element: <Pricing /> },
      { path: "simple-checkout", element: <SimpleCheckout /> },
      { path: "checkout-success", element: <SuccessPage /> },
      { path: "checkout-failed", element: <FailedPage /> },
      { path: "privacy", element: <PrivacyPolicy /> },
      { path: "terms", element: <TermsAndConditions /> },
      { path: "cookie-policy", element: <CookiePolicy /> },
      {
        path: "services",
        element: <Service />,
        children: [
          { path: ":slug", element: <AllServices /> },

          // { path: ":slug", element: <MonthlyService /> },
          // { path: ":slug", element: <LocalService /> },
          // { path: ":slug", element: <PpcService /> },
          // { path: ":slug", element: <ContentWriting /> },
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
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Dashboard/> },
      { path: "account", element: <Account /> },
      { path: "progress-and-tasks", element: <ProgressAndTasks /> },
      { path: "messages", element: <Message /> },
      { path: "reports", element: <Report/> },
      { path: "my-services", element: <MyService /> },
    ],
  },
  {
    path: "/user",
    element: <AdminLayout />,
    children: [
      { path: "services", element: <MyService /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
