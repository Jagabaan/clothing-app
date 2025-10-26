import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100">

      <div className="hidden lg:flex flex-1 bg-white items-center justify-center p-12 border-r border-gray-200">
        <div className="text-center text-gray-900 max-w-md space-y-6">
          <h1 className="text-6xl font-extrabold leading-tight">RIM</h1>
          <p className="text-lg text-gray-600">
            Discover, shop, and express your style effortlessly.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 sm:px-10 py-16 min-h-0">
        <div className="w-full max-w-xl xl:max-w-2xl bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-8 lg:p-12 border border-gray-100
                        max-h-[calc(100vh-120px)] overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
