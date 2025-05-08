// Mock data for the staff dashboard

// Staff members data
export type StaffMember = {
  id: string
  name: string
  username: string
  email: string
  password: string
  role: string
  status: "active" | "inactive"
  staffType: "admin" | "manager" | "employee"
  lastLogin: string
  driveStorage: {
    used: number
    total: number
  }
  deviceType: string
}

export const staffMembers: StaffMember[] = [
  {
    id: "1",
    name: "John Smith",
    username: "johnsmith",
    email: "john.smith@company.com",
    password: "password123",
    role: "IT Manager",
    status: "active",
    staffType: "admin",
    lastLogin: "2023-05-05T14:30:00Z",
    driveStorage: {
      used: 5.2,
      total: 15,
    },
    deviceType: "MacBook Pro",
  },
  {
    id: "2",
    name: "Jane Sam",
    username: "janesam",
    email: "jane.sam@company.com",
    password: "password123",
    role: "HR Specialist",
    status: "active",
    staffType: "manager",
    lastLogin: "2023-05-04T09:15:00Z",
    driveStorage: {
      used: 8.7,
      total: 15,
    },
    deviceType: "Windows Laptop",
  },
  {
    id: "3",
    name: "Michael Johnson",
    username: "michaelj",
    email: "michael.johnson@company.com",
    password: "password123",
    role: "Software Developer",
    status: "active",
    staffType: "employee",
    lastLogin: "2023-05-05T11:45:00Z",
    driveStorage: {
      used: 10.3,
      total: 15,
    },
    deviceType: "Dell XPS",
  },
  {
    id: "4",
    name: "Emily Davis",
    username: "emilyd",
    email: "emily.davis@company.com",
    password: "password123",
    role: "Marketing Specialist",
    status: "inactive",
    staffType: "employee",
    lastLogin: "2023-04-28T16:20:00Z",
    driveStorage: {
      used: 3.8,
      total: 15,
    },
    deviceType: "iPad Pro",
  },
  {
    id: "5",
    name: "Robert Wilson",
    username: "robertw",
    email: "robert.wilson@company.com",
    password: "password123",
    role: "Finance Manager",
    status: "active",
    staffType: "manager",
    lastLogin: "2023-05-05T08:30:00Z",
    driveStorage: {
      used: 7.1,
      total: 15,
    },
    deviceType: "ThinkPad X1",
  },
]

// Ticket data
export type TicketStatus = "Open" | "In Progress" | "Resolved"

export type IssueType = "Hardware Issue" | "Software Issue" | "Network Issue" | "Account Access" | "Other"

export type Ticket = {
  id: string
  username: string
  status: TicketStatus
  issueType: IssueType
  title: string
  description: string
  createdDate: string
}

export const tickets: Ticket[] = [
  {
    id: "1",
    username: "johnsmtih",
    status: "Open",
    issueType: "Hardware Issue",
    title: "Laptop not turning on",
    description: "My laptop won't turn on even when plugged in.",
    createdDate: "2025-05-01T09:30:00Z",
  },
  {
    id: "2",
    username: "janesam",
    status: "In Progress",
    issueType: "Software Issue",
    title: "Cannot access email",
    description: "Getting an error when trying to access my company email.",
    createdDate: "2025-02-02T14:15:00Z",
  },
  {
    id: "3",
    username: "michaelj",
    status: "Resolved",
    issueType: "Network Issue",
    title: "WiFi connection dropping",
    description: "My WiFi connection keeps dropping every few minutes.",
    createdDate: "2025-03-28T11:45:00Z",
  },
  {
    id: "4",
    username: "johnsmith",
    status: "Open",
    issueType: "Account Access",
    title: "Password reset needed",
    description: "I need to reset my password for the CRM system.",
    createdDate: "2025-04-04T16:20:00Z",
  },
  {
    id: "5",
    username: "johnsmith",
    status: "In Progress",
    issueType: "Other",
    title: "Printer not working",
    description: "The office printer is showing an error and won't print documents.",
    createdDate: "2025-01-03T10:30:00Z",
  },
]

// Todo data
export type TodoItem = {
  id: string
  title: string
  status: "pending" | "completed"
  userId: string
  createdDate: string 
}

export const todoItems: TodoItem[] = [
  {
    id: "1",
    title: "Complete quarterly report",
    status: "pending",
    userId: "1",
    createdDate: "2025-05-05T10:30:00Z",
  },
  {
    id: "2",
    title: "Schedule team meeting",
    status: "completed",
    userId: "1",
    createdDate: "2025-04-04T14:15:00Z",
  },
  {
    id: "3",
    title: "Review project proposal",
    status: "pending",
    userId: "1",
    createdDate: "2025-05-03T09:45:00Z",
  },
  {
    id: "4",
    title: "Update client presentation",
    status: "pending",
    userId: "2",
    createdDate: "2025-04-02T16:20:00Z",
  },
  {
    id: "5",
    title: "Submit expense reports",
    status: "completed",
    userId: "1",
    createdDate: "2025-02-01T11:10:00Z",
  },
]
