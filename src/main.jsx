import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./auth/sign-in/index.jsx";
import Home from "./home/index.jsx";
import Dashboard from "./dashboard/index.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import EditResume from "./dashboard/resume/[resumeId]/edit/index.jsx";
import ViewResume from "./my-resume/[resumeId]/view/index.jsx";
import AdminHome from "./admin/AdminHome.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminPlans from "./admin/AdminPlans.jsx";
import AdminAnalytics from "./admin/AdminAnalytics.jsx";
import AdminPlanCreate from "./admin/AdminPlanCreate.jsx";
import PaymentSuccess from "./payment/PaymentSuccess.jsx";
import PaymentCanceled from "./payment/PaymentCanceled.jsx";
import PurchasePlans from "./components/plans/PurchasePlans.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <AdminHome />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/analytics",
        element: <AdminAnalytics />,
      },
      {
        path: "/admin/plans",
        element: <AdminPlans />,
        children: [
          {
            path: "/admin/plans/:planId/edit",
            element: <div>Admin Plan edit</div>,
          },
          // {
          //   path: "/admin/plans/create",
          //   element: <AdminPlanCreate />,
          // },
        ],
      },
      {
        path: "/admin/plans/create",
        element: <AdminPlanCreate />
      },
    ],
  },
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      },
    ],
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/my-resume/:resumeId/view",
    element: <ViewResume />,
  },
  {
    path: "/payment/success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment/canceled",
    element: <PaymentCanceled />,
  },
  {
    path: "/plans",
    element: <PurchasePlans />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
