import Link from "next/link"
// import UserForm from "./components/UserForm"
import HotelForm from "./components/HotelForm"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Hotel Rate Input</h1>
        <HotelForm />
        <div className="mt-8">
          <Link href="/hotels" className="text-blue-600 hover:text-blue-800">
            View Submitted Hotels
          </Link>
        </div>
      </div>
    </main>
  )
}


// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
//         <h1 className="text-4xl font-bold mb-8">User Registration</h1>
//         <UserForm />
//         <div className="mt-8">
//           <Link href="/users" className="text-blue-600 hover:text-blue-800">
//             View Submitted Data
//           </Link>
//         </div>
//       </div>
//     </main>
//   )
// }