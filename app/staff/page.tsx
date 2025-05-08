"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { staffMembers, type StaffMember } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, HardDrive, Smartphone } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function StaffDirectory() {
  const [searchTerm, setSearchTerm] = useState("")

  // search term
  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Directory</h1>
        <p className="text-muted-foreground mt-1">View and search for team members.</p>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, email, or role..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStaff.map((staff) => (
          <StaffCard key={staff.id} staff={staff} />
        ))}
      </div>
    </div>
  )
}

function StaffCard({ staff }: { staff: StaffMember }) {
  const lastLoginDate = new Date(staff.lastLogin)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{staff.name}</CardTitle>
            <CardDescription>{staff.role}</CardDescription>
          </div>
          <Badge variant={staff.status === "active" ? "default" : "secondary"}>{staff.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{staff.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{staff.deviceType}</span>
          </div>

          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Drive Storage</span>
                <span>
                  {staff.driveStorage.used} / {staff.driveStorage.total} GB
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(staff.driveStorage.used / staff.driveStorage.total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground pt-2">
            Last login: {formatDistanceToNow(lastLoginDate, { addSuffix: true })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
