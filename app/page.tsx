"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { tickets, todoItems as initialTodoItems } from "@/lib/data"
import { TicketCheck, ListTodo, Users, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Storage key for todos (same as in todo/page.tsx)
const TODOS_STORAGE_KEY = "dashboard_todos"

export default function Dashboard() {
  // hardcoded user data for demo
  const [currentUser, setCurrentUser] = useState({
    id: "1",
    name: "John Smith",
  })

  const [openTickets, setOpenTickets] = useState(0)
  const [pendingTasks, setPendingTasks] = useState(0)
  const [activeStaff, setActiveStaff] = useState(0)
  const [recentActivities, setRecentActivities] = useState<any[]>([])

  useEffect(() => {
    const openTicketsCount = tickets.filter((ticket) => ticket.status === "Open").length
    setOpenTickets(openTicketsCount)

    // todos from localStorage or use initial data if not available
    const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY)
    const userTodos = savedTodos
      ? JSON.parse(savedTodos)
      : initialTodoItems.filter((todo) => todo.userId === currentUser.id)

    const pendingTasksCount = userTodos.filter(
      (todo: any) => todo.userId === currentUser.id && todo.status === "pending",
    ).length
    setPendingTasks(pendingTasksCount)

    // active staff (hardcoded for demo)
    setActiveStaff(3)

    // Combine tickets and todos for recent activities
    const ticketActivities = tickets.map((ticket) => ({
      type: "ticket",
      title: ticket.title,
      date: new Date(ticket.createdDate),
      status: ticket.status,
    }))

    const todoActivities = userTodos.map((todo) => ({
      type: "todo",
      title: todo.title,
      date: new Date(todo.createdDate),
      status: todo.status,
    }))

    const combined = [...ticketActivities, ...todoActivities]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5)

    setRecentActivities(combined)
  }, [currentUser.id])

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {currentUser.name}</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your dashboard today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <TicketCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
            <p className="text-xs text-muted-foreground">Items on your to-do list</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStaff}</div>
            <p className="text-xs text-muted-foreground">Team members online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Login</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">At 9:30 AM</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest updates and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    {activity.type === "ticket" ? (
                      <TicketCheck className="h-5 w-5 text-primary" />
                    ) : (
                      <ListTodo className="h-5 w-5 text-primary" />
                    )}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.type === "ticket"
                          ? `Ticket ${activity.status}`
                          : activity.status === "pending"
                            ? "Task Pending"
                            : "Task Completed"}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDistanceToNow(activity.date, { addSuffix: true })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">No recent activities</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
