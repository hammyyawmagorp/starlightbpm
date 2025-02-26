'use client'

import { useEffect } from 'react'

export default function ErrorPage() {
  useEffect(() => {
    console.error('An unexpected error has occurred.')
  }, [])

  return (
    <div className="flexCenter flex-col py-20">
      <h1 className="text-4xl font-bold">Something Went Wrong</h1>
      <p className="text-lg my-5">
        Sorry, there was an unexpected error on the server.
      </p>
    </div>
  )
}
