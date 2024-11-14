import React from 'react';


const loading = () => {
  return (
   
<div className="flex-col gap-4 flex items-center justify-center w-full fixed top-0 right-0 left-0 bottom-0 bg-black">
  <div
   className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
  >
    <div
      className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
    ></div>
  </div>
</div>

  )
}

export default loading
