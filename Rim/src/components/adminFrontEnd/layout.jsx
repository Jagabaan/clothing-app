import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

function AdminFrontEndLayout() {
  return <div className="flex min-h-screen w-full" >
    {/* admin sidebar */}
    <AdminSidebar></AdminSidebar>
    <div className="flex flex-1 flex-col" >
    {/* admin headre */}
    <AdminHeader/>
    <main className="flex-1 flex bg-muted/40 p-4 md:p-6"> 
        <Outlet/>
    </main>
     </div>
    </div>;
}

export default AdminFrontEndLayout;