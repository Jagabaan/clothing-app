import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminFrontEndLayout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return <div className="flex min-h-screen w-full" >
    {/* admin sidebar */}
    <AdminSidebar open={isSidebarOpen} onClose={setIsSidebarOpen} />
    <div className="flex flex-1 flex-col" >
    {/* admin headre */}
    <AdminHeader onClose={setIsSidebarOpen}/>
    <main className="flex-1 flex bg-muted/40 p-4 md:p-6"> 
        <Outlet/>
    </main>
     </div>
    </div>;
}

export default AdminFrontEndLayout;