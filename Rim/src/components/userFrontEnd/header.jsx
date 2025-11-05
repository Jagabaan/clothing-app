import { Home, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { userViewHeaderMenuItems } from "../../config/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { logoutUser } from "@/storage/authSlice";

function MenuItem() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {userViewHeaderMenuItems.map((menuItem) => (
        <Link
          key={menuItem.id}
          to={menuItem.path}
          className="text-sm font-medium text-neutral-700 tracking-tight transition-all hover:text-black relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
        >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className="flex items-center gap-3">
      {/* Cart Button */}
      <Button
        variant="outline"
        size="icon"
        className="relative border-neutral-300 bg-white hover:border-black hover:bg-neutral-100 transition-all rounded-full shadow-sm hover:shadow-md"
      >
        <ShoppingCart className="w-5 h-5 text-neutral-800 hover:text-black transition-transform hover:scale-110" />
        <span className="sr-only">User cart</span>
      </Button>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer transition-transform hover:scale-105">
            <AvatarFallback className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary to-indigo-500 text-white font-bold text-sm shadow-md border border-white/30 uppercase tracking-wide">
              {user?.userName ? user.userName[0] : "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          align="end"
          className="w-56 border border-neutral-200 shadow-lg bg-white/95 backdrop-blur-lg rounded-xl p-1"
        >
          <DropdownMenuLabel className="text-neutral-700 font-medium px-3 py-2">
            Logged in as{" "}
            <span className="font-semibold text-black">{user?.userName}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-neutral-200" />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="hover:bg-neutral-100 cursor-pointer rounded-lg"
          >
            <UserCog className="mr-2 h-4 w-4 text-neutral-700" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-neutral-200" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="hover:bg-red-50 cursor-pointer rounded-lg text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function UserHeaderLayout() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-neutral-200 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section: Logo + Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden border-neutral-300 hover:border-black hover:bg-neutral-100 rounded-full"
              >
                <Menu className="h-6 w-6 text-neutral-900" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full max-w-xs bg-white/95 backdrop-blur-lg border-r border-neutral-200"
            >
              <MenuItem />
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link
            className="flex items-center gap-2 hover:opacity-90 transition-all"
            to="/shop/home"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center text-white shadow-md">
              <Home className="h-4 w-4" />
            </div>
            <span className="font-extrabold text-neutral-900 text-lg tracking-tight">
              Rim
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <MenuItem />
        </div>

        {/* Right Section: Cart + Avatar (Always visible) */}
        <HeaderRightContent />
      </div>
    </header>
  );
}

export default UserHeaderLayout;
