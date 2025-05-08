"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, TicketCheck, ListTodo, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()
  const { open, setOpen } = useSidebar()

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Admin Directory",
      href: "/staff",
      icon: Users,
    },
    {
      title: "IT Requests",
      href: "/it-request",
      icon: HelpCircle,
    },
    {
      title: "Tickets",
      href: "/tickets",
      icon: TicketCheck,
    },
    {
      title: "To-Do List",
      href: "/todo",
      icon: ListTodo,
    },
  ]

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          <h2 className="text-lg font-semibold">Staff Dashboard</h2>
          <Button variant="ghost" size="icon" className="ml-auto opacity-60" onClick={() => setOpen(false)}>
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Collapse sidebar</span>
          </Button>
        </div>
        <nav className="flex-1 overflow-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {!open && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-40 opacity-60"
          onClick={() => setOpen(true)}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Expand sidebar</span>
        </Button>
      )}
    </>
  )
}
