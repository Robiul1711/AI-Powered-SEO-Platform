import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/homePage/Home";
import AdminLayout from "../layout/AdminLayout";
import AuthLayout from "../layout/AuthLayout";
import PageLoader from "@/components/common/PageLoader";

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const Service = lazy(() => import("@/pages/service/Service"));
const SEOAudit = lazy(() => import("@/pages/aiSeoAuditPage/SEOAudit"));
const Contact = lazy(() => import("@/pages/contactPage/Contact"));
const CaseStudies = lazy(() => import("@/pages/caseStudiesPage/CaseStudies"));
const Pricing = lazy(() => import("@/pages/pricingPage/Pricing"));

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ResetPassword from "../pages/auth/ResetPassword";



const SimpleCheckout = lazy(() => import("@/pages/simpleCheckoutPage/SimpleCheckout"));
const AboutPage = lazy(() => import("@/pages/aboutPage/AboutPage"));
const CaseStudiesDetails = lazy(() => import("@/pages/caseStudiesPage/CaseStudiesDetails"));
const SuccessPage = lazy(() => import("@/pages/successPage/SuccessPage"));
const FailedPage = lazy(() => import("@/pages/failedPage/FailedPage"));

const Message = lazy(() => import("@/pages/allDashboardPages/messagePage/Message"));
const Account = lazy(() => import("@/pages/allDashboardPages/accountPage/Account"));
const MyPlan = lazy(() => import("@/pages/allDashboardPages/myPlanPage/MyPlan"));
const ProgressAndTasks = lazy(() => import("@/pages/allDashboardPages/progressTasksPage/ProgressAndTasks"));
const MyService = lazy(() => import("@/pages/allDashboardPages/servicePage/MyService"));
const Report = lazy(() => import("@/pages/allDashboardPages/reportPage/Report"));
const Dashboard = lazy(() => import("@/pages/allDashboardPages/dashboardPage/Dashboard"));
const MyCampaigns = lazy(() => import("@/pages/allDashboardPages/myCampaignsPage/MyCampaigns"));
const CampaignDetails = lazy(() => import("@/pages/allDashboardPages/campaignDetailsPage/CampaignDetails"));
const PaymentHistory = lazy(() => import("@/pages/allDashboardPages/paymentHistoryPage/PaymentHistory"));
const BookingHistory = lazy(() => import("@/pages/allDashboardPages/bookingHistoryPage/BookingHistory"));
const AllServices = lazy(() => import("@/components/service-component/AllServices"));
const NotFound = lazy(() => import("@/pages/notFoundPage/NotFound"));
const PrivacyPolicy = lazy(() => import("@/pages/policyPages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("@/pages/policyPages/TermsAndConditions"));
const CookiePolicy = lazy(() => import("@/pages/policyPages/CookiePolicy"));
const SEOCampaign = lazy(() => import("@/components/service-component/SEOCampaign"));
const GuestPostingServices = lazy(() => import("@/components/service-component/GuestPostingServices"));
const LinkBuilding = lazy(() => import("@/components/service-component/LinkBuilding"));
const MarketingSolutions = lazy(() => import("@/components/service-component/MarketingSolutions"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "ai-seo-audit", element: withSuspense(SEOAudit) },
      { path: "contact", element: withSuspense(Contact) },
      { path: "case-studies", element: withSuspense(CaseStudies) },
      { path: "case-studies-details/:id", element: withSuspense(CaseStudiesDetails) },
      { path: "about", element: withSuspense(AboutPage) },
      { path: "pricing", element: withSuspense(Pricing) },
      { path: "simple-checkout", element: withSuspense(SimpleCheckout) },
      { path: "checkout", element: withSuspense(SimpleCheckout) },
      { path: "checkout-success", element: withSuspense(SuccessPage) },
      { path: "checkout-failed", element: withSuspense(FailedPage) },
      { path: "privacy", element: withSuspense(PrivacyPolicy) },
      { path: "terms", element: withSuspense(TermsAndConditions) },
      { path: "cookie-policy", element: withSuspense(CookiePolicy) },
      {
        path: "services",
        element: withSuspense(Service),
        children: [
          { path: ":slug", element: withSuspense(AllServices) },

          { path: "seo-campaign", element: withSuspense(SEOCampaign) },
          { path: "guest-posting", element: withSuspense(GuestPostingServices) },
          { path: "link-building", element: withSuspense(LinkBuilding) },
          { path: "smm-marketing", element: withSuspense(MarketingSolutions) },
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
      { path: "", element: withSuspense(Dashboard) },
      { path: "account", element: withSuspense(Account) },
      { path: "my-plan", element: withSuspense(MyPlan) },
      { path: "progress-and-tasks", element: withSuspense(ProgressAndTasks) },
      { path: "messages", element: withSuspense(Message) },
      { path: "reports", element: withSuspense(Report) },
      { path: "my-services", element: withSuspense(MyService) },
      { path: "my-campaigns", element: withSuspense(MyCampaigns) },
      { path: "my-campaigns/:id", element: withSuspense(CampaignDetails) },
      { path: "payment-history", element: withSuspense(PaymentHistory) },
      { path: "booking-history", element: withSuspense(BookingHistory) },
    ],
  },
  {
    path: "/user",
    element: <AdminLayout />,
    children: [{ path: "services", element: withSuspense(MyService) }],
  },
  {
    path: "*",
    element: withSuspense(NotFound),
  },
]);

export default router;

