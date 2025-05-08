"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { todoItems as initialTodoItems, type TodoItem } from "@/lib/data"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Pencil, X, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// storage key for todos
const TODOS_STORAGE_KEY = "dashboard_todos"

export default function TodoPage() {
  const { toast } = useToast()
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  // Current user ID (hardcoded for demo)
  const currentUserId = "1"

  useEffect(() => {
    const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY)

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    } else {
      // Fall back if nothing in localStorage
      const userTodos = initialTodoItems.filter((todo) => todo.userId === currentUserId)
      setTodos(userTodos)
    }
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
    }
  }, [todos])

  const handleAddTodo = () => {
    if (!newTodo.trim()) return

    const newTodoItem: TodoItem = {
      id: Date.now().toString(),
      title: newTodo.trim(),
      status: "pending",
      userId: currentUserId,
      createdDate: new Date().toISOString(),
    }

    setTodos([...todos, newTodoItem])
    setNewTodo("")

    toast({
      title: "Task Added",
      description: "New task has been added to your list.",
    })
  }

  const handleToggleStatus = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: todo.status === "pending" ? "completed" : "pending" } : todo,
      ),
    )
  }

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))

    toast({
      title: "Task Deleted",
      description: "Task has been removed from your list.",
    })
  }

  const startEditing = (todo: TodoItem) => {
    setEditingId(todo.id)
    setEditText(todo.title)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditText("")
  }

  const saveEdit = (id: string) => {
    if (!editText.trim()) return

    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title: editText.trim() } : todo)))

    setEditingId(null)
    setEditText("")

    toast({
      title: "Task Updated",
      description: "Your task has been updated.",
    })
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">To-Do List</h1>
        <p className="text-muted-foreground mt-1">Manage your personal tasks and stay organized.</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
          <CardDescription>Add, edit, and manage your daily tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
            />
            <Button onClick={handleAddTodo}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="space-y-2">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between p-3 border rounded-md ${
                    todo.status === "completed" ? "bg-muted" : ""
                  }`}
                >
                  {editingId === todo.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
                        autoFocus
                      />
                      <Button size="icon" variant="ghost" onClick={() => saveEdit(todo.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={cancelEditing}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={todo.status === "completed"}
                          onCheckedChange={() => handleToggleStatus(todo.id)}
                          id={`todo-${todo.id}`}
                        />
                        <label
                          htmlFor={`todo-${todo.id}`}
                          className={`text-sm ${
                            todo.status === "completed" ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {todo.title}
                        </label>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button size="icon" variant="ghost" onClick={() => startEditing(todo)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(todo.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">No tasks yet. Add a task to get started.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
