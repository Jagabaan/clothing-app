import { Outlet } from "react-router-dom";
import UserHeaderLayout from "./header";

function UserFrontEndLayout() {
  return <div className="flex flex-col bg-white overflow-hidden "  >
    {/* user User Header View */}
    <UserHeaderLayout/>
    <main className="flex-1 flex-col w-full "> 
        <Outlet/>
    </main>
  </div>;
}

export default UserFrontEndLayout;