import { sql } from "@vercel/postgres"
import Link from "next/link"

async function getUsers() {
  const { rows } = await sql`SELECT * FROM users ORDER BY id DESC`
  return rows
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Submitted User Data</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          Back to Form
        </Link>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {users.map((user) => (
              <li key={user.id} className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

