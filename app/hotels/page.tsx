import { sql } from "@vercel/postgres"
import Link from "next/link"

async function getHotels() {
  const { rows } = await sql`SELECT * FROM hotels ORDER BY id DESC`
  return rows
}

export default async function HotelsPage() {
  const hotels = await getHotels()

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Submitted Hotels</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          Back to Form
        </Link>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BB</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HB</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FB</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PDF</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hotel.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    S: {hotel.bb_single}, D: {hotel.bb_double}, T: {hotel.bb_triple}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    S: {hotel.hb_single}, D: {hotel.hb_double}, T: {hotel.hb_triple}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    S: {hotel.fb_single}, D: {hotel.fb_double}, T: {hotel.fb_triple}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hotel.pdf_url ? (
                      <a
                        href={hotel.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View PDF
                      </a>
                    ) : (
                      "No PDF"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

