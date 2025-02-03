"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type RateType = {
  single: string
  double: string
  triple: string
}

export default function HotelForm() {
  const [name, setName] = useState("")
  const [bb, setBB] = useState<RateType>({ single: "", double: "", triple: "" })
  const [hb, setHB] = useState<RateType>({ single: "", double: "", triple: "" })
  const [fb, setFB] = useState<RateType>({ single: "", double: "", triple: "" })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/hotels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        bb_single: bb.single,
        bb_double: bb.double,
        bb_triple: bb.triple,
        hb_single: hb.single,
        hb_double: hb.double,
        hb_triple: hb.triple,
        fb_single: fb.single,
        fb_double: fb.double,
        fb_triple: fb.triple,
      }),
    })
    if (response.ok) {
      alert("Hotel data submitted successfully!")
      setName("")
      setBB({ single: "", double: "", triple: "" })
      setHB({ single: "", double: "", triple: "" })
      setFB({ single: "", double: "", triple: "" })
      router.push("/hotels")
    } else {
      alert("Error submitting hotel data")
    }
  }

  const RateInputs = ({
    type,
    state,
    setState,
  }: { type: string; state: RateType; setState: React.Dispatch<React.SetStateAction<RateType>> }) => (
    <div className="space-y-2">
      <h3 className="font-semibold">{type}</h3>
      <div className="grid grid-cols-3 gap-2">
        <input
          type="number"
          value={state.single}
          onChange={(e) => setState({ ...state, single: e.target.value })}
          placeholder="Single"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={state.double}
          onChange={(e) => setState({ ...state, double: e.target.value })}
          placeholder="Double"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={state.triple}
          onChange={(e) => setState({ ...state, triple: e.target.value })}
          placeholder="Triple"
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Hotel Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <RateInputs type="Bed & Breakfast (BB)" state={bb} setState={setBB} />
      <RateInputs type="Half Board (HB)" state={hb} setState={setHB} />
      <RateInputs type="Full Board (FB)" state={fb} setState={setFB} />
      <button
        type="submit"
        className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Hotel Data
      </button>
    </form>
  )
}

