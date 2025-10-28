import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Box,
  ShoppingCart,
  CheckSquare,
  Settings,
  ChartPie,
  LogOut,
  User
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";


const adminSidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <ChartPie size={18} />, 
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Box size={18} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCart size={18} />,
  },
  {
    id: "fulfilment",
    label: "Fulfilment",
    path: "/admin/fulfilment",
    icon: <CheckSquare size={18} />,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/admin/settings",
    icon: <Settings size={18} />,
  },
];

function MenuItems({ onClose }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-6 flex flex-col gap-2">
      {adminSidebarItems.map((item) => (
        <button
          type="button"
          key={item.id}
          onClick={() => {
            navigate(item.path);
            onClose ? onClose(false) : null;
          }}
          className="flex items-center gap-3 w-full text-sm p-2 rounded-lg transition-colors duration-150 group hover:bg-surface/60 focus:outline-none"
        >

          <span className="flex items-center justify-center w-9 h-9 rounded-md bg-gradient-to-br from-white/5 to-white/2 shadow-sm ring-1 ring-white/6 group-hover:from-primary/10">
            <span className="inline-flex items-center justify-center">{item.icon}</span>
          </span>

          <span className="flex-1 text-left font-medium tracking-wide">{item.label}</span>


          <span className="opacity-60 text-xs">&gt;</span>
        </button>
      ))}
    </nav>
  );
}

function AdminSidebar({ open, onClose }) {
  const navigate = useNavigate();

  return (
    <Fragment>

      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="left" className="w-72">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <div className="flex items-center gap-3 py-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center text-white shadow-md">
                  <Home size={18} />
                </div>
                <SheetTitle>
                  <span className="text-lg font-extrabold">Admin Panel</span>
                  <p className="text-xs text-muted-foreground">Control center</p>
                </SheetTitle>
              </div>
            </SheetHeader>

            <div className="p-4 flex-1 overflow-auto">
              <MenuItems onClose={onClose} />


              <div className="mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/admin/profile');
                    onClose ? onClose(false) : null;
                  }}
                  className="flex items-center gap-3 w-full text-sm p-2 rounded-lg hover:bg-surface/60"
                >
                  <span className="w-9 h-9 rounded-md bg-white/5 flex items-center justify-center"> <LogOut size={16} /> </span>
                  <span className="flex-1 text-left">Profile</span>
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden lg:flex lg:flex-col lg:w-72 border-r bg-background p-6">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-3 mb-6"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center text-white shadow-md">
            <Home size={20} />
          </div>

          <div>
            <div className="text-2xl font-extrabold">Admin Panel</div>
            <p className="text-xs text-muted-foreground">Manage products, orders & more</p>
          </div>
        </div>

        <MenuItems />

        <div className="mt-auto pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                <User size={16} />
              </div>
              <div>
                <div className="text-sm font-medium">Admin</div>
                <div className="text-xs text-muted-foreground">rim@gmail.com</div>
              </div>
            </div>

            <button type="button" className="p-2 rounded-md hover:bg-surface/60">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
