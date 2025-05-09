# Staff Dashboard

This is a staff dashboard application built with Next.js, React, and TailwindCSS.
Reusable components: https://ui.shadcn.com/ is used for custom source code components under ui.
lucide-react icons
Simulated async (e.g., setTimeout) for ticket submission in app/it-request/page.tsx

hosted on: https://v0-staff-dashboard-five.vercel.app

## Prerequisites

1. Node.js (LTS version, e.g., v18.x or v20.x)
2. npm (comes with Node.js)
"react": "^18.2.0",
"react-dom": "^18.2.0",

## Setup Instructions

npm install
npm run build
npm run start

Open your browser and navigate to: http://localhost:3000

# Staff Dashboard

## Summary of Features Completed
- **Sample Data**: Uses sample data from `lib/data.ts` to simulate tickets and to-do items.

1. Dashboard Page
○ Welcome banner
○ Quick summary: Open tickets, tasks pending, latest updates

2. Staff Directory Page
○ List of staff (cards or table)
○ Info: Name, Role, Email, Status (active/inactive)
○ Bonus: Show “last login”, “Drive storage used”, “device type”

3. IT Request Page
○ Form with:
■ Issue Type (dropdown)
■ Description (textarea)
■ File input (simulate upload)
○ “Submit Request” button

4. Tickets Page
○ List of submitted tickets
○ Show: Issue Type, Status (Open, In Progress, Resolved), Created Date

5. To-Do List Page
○ Add/Edit/Delete tasks
○ Mark task as complete

## Assumptions Made
- The `lib/data.ts` file contains static sample data for tickets and to-do items, as no database integration was specified.
- The `currentUser` is hardcoded for demonstration purposes.
- Active staff count is hardcoded to `3` for simplicity.
- All pages are accessible by every staff.

## Missing Features and Potential Improvements
- **Database Integration**: Replace the sample data with a real database to persist tickets and to-do items.
- **Authentication**: Add user authentication to dynamically fetch data for the logged-in user.
- **Dynamic Staff Count**: Implement real-time tracking of active staff members.
- **Permissions**: Pages and rendering based on user types.
