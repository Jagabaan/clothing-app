import { Navigate, useLocation } from "react-router-dom";

function AuthValidation({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  if (
    !isAuthenticated &&
    !(
      path.includes("/login") ||
      path.includes("/register") ||
      path.includes("/auth")
    )
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  if (
    isAuthenticated &&
    (path.includes("/login") || path.includes("/register"))
  ) {
    return <Navigate to="/shop/home" replace />;
  }

  if (path.startsWith("/admin")) {

    if (!isAuthenticated) {
      return <Navigate to="/auth/login" replace />;
    }

    if (user?.role === "admin") {
      if (path === "/admin" || path === "/admin/") {
        return <Navigate to="/admin/dashboard" replace />;
      }
    } else {
      return <Navigate to="/unauthorize" replace />;
    }
  }

  if (path.startsWith("/shop") && user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}

export default AuthValidation;
