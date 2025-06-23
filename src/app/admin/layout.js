import '../globals.css'

export const metadata = {
  title: 'Admin Panel',
  description: 'Manage portfolio content',
}

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="min-h-screen">
          <AdminNavbar />
          {children}
        </div>
      </body>
    </html>
  )
}

function AdminNavbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Portfolio Admin</h1>
        <div className="flex gap-4">
          <a href="/admin" className="hover:text-purple-300">Dashboard</a>
          <a href="/admin/projects" className="hover:text-purple-300">Projects</a>
          <a href="/" className="hover:text-purple-300">View Portfolio</a>
        </div>
      </div>
    </nav>
  )
}