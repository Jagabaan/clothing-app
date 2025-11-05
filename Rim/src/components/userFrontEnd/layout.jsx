import { Outlet } from "react-router-dom";
import UserHeaderLayout from "./header";

function UserFrontEndLayout() {
  return (
    <div className="flex flex-col bg-white h-screen overflow-hidden">
      {/* User Header View */}
      <UserHeaderLayout />
      <main className="flex-1 w-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default UserFrontEndLayout;
