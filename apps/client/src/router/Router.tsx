import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import { routes } from "./routes.ts";
import Login from "../pages/login/Login.tsx";
import Register from "../pages/register/Register.tsx";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import Error404 from "../pages/error/error404/Error404.tsx";
import ProtectedRoute from "../components/protected-route/ProtectedRoute.tsx";
import AuthLayout from "../components/auth-layout/AuthLayout.tsx";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={routes.auth}
        element={
          // TODO: Create public layout component or auth layout
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        }
      >
        <Route index element={<Login />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
      </Route>
      <Route
        path={routes.root}
        element={
          // TODO: Create app layout component
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path={"*"} element={<Error404 />} />
    </>,
  ),
);
