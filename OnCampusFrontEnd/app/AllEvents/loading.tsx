import { RedirectingAnimation } from "@/components/Animation";

import React from 'react'

function loading() {
  return (
    <div className="bg-white flex flex-col pt-20 pl-72">
      <RedirectingAnimation />
      <p className="text-gray-600 text-lg ml-4 pl-16">Redirecting to All Events...</p>
    </div>
  )
}

export default loading
