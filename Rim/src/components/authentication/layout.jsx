import { Outlet } from "react-router-dom";

function AuthLayout() { 
  return ( 
    <div className="flex min-h-screen w-full">
      {/* LEFT SIDE - Black background (only visible on large screens) */}
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            My Clothing App
          </h1>
        </div>
      </div>

      
        <Outlet />
      
    </div>
  ); 
}

export default AuthLayout;
