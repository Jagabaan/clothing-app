import { Button } from "@/components/ui/button"
import { AlignJustify, LogOut } from "lucide-react"

function AdminHeader({onClose}) {
  return (
    <header className="flex items-center px-4 py-3 bg-background border-b">
      {/* Mobile Menu Button */}
      <Button
        aria-label="Open sidebar"
        onClick={() => onClose(true)}
        className="lg:hidden inline-flex items-center justify-center h-10 w-10 p-2 rounded-full
                   bg-muted text-foreground hover:bg-muted/80
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                   focus-visible:ring-primary transition"
      >
        <AlignJustify className="w-5 h-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      {/* Push logout button to the right */}
      <div className="flex flex-1 justify-end">
        <Button
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                     bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md
                     hover:from-primary/90 hover:to-primary/70 focus-visible:outline-none 
                     focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/40 
                     transition"
        >
          <span className="hidden sm:inline">Logout</span>
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader
