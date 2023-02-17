import React from 'react'

export default function (id) {
  return (
    <div key={id} >
        <div className="mx-auto my-2 flex h-full w-full max-w-sm animate-pulse cursor-pointer flex-col overflow-auto rounded-lg  text-xs shadow-lg transition duration-200 hover:scale-105 sm:max-w-md">
  <div className="relative flex h-1/5 items-center p-2">
    <div className="border-base-200 bg-base-100 flex flex-row gap-2 rounded-2xl border-2 px-2 py-1">
      <span className="flex items-center justify-center">
        <div className="h-3 w-8 rounded-2xl bg-base-200"></div>
      </span>
    </div>

    <div className="flex-1 flex items-center text-center">
      <div className="absolute left-0 right-0 mx-auto  h-2.5 w-36 rounded-full bg-base-200"></div>
    </div>
    
  </div>

  <div className="flex h-4/5 flex-col p-2">
    <div className="flex items-center justify-between px-2 py-2">
      <div className="flex w-8/12 items-center">
        <svg className="w-10 h-10 mr-2 text-base-200 " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>

        <div className="flex flex-col gap-[2px]">
          <p className="text-sm font-bold"><div className="w-12 h-3 bg-base-300 rounded-full  mr-3"></div></p>
          <p className="opacity-60 sm:block"><div className="w-16 h-2 bg-base-200 rounded-full  "></div></p>
        </div>
      </div>
      <div className="flex items-center justify-end"></div>
            <p className="text-center text-lg font-semibold sm:text-xl"> <div className="h-2.5 bg-base-300 rounded-full  w-16 ml-10"></div></p>
    </div>
    <div className="flex items-center justify-center">
      <span className="h-6 w-6 rounded-md p-1 text-center"></span>
    </div>
    
    <div className="flex items-center justify-between px-2 py-2">
      <div className="flex w-8/12 items-center">
        <svg className="w-10 h-10 mr-2 text-base-200 " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
        <div className="flex flex-col gap-[2px]">
          <p className="text-sm font-bold"><div className="w-12 h-3 bg-base-300 rounded-full  mr-3"></div></p>
          <p className="opacity-60 sm:block"><div className="w-16 h-2 bg-base-200 rounded-full  "></div></p>
        </div>
      </div>
      <div className="flex items-center justify-end"></div>
      <p className="text-center text-lg font-semibold sm:text-xl"> <div className="h-2.5 bg-base-300 rounded-full  w-16 ml-10"></div></p>
    </div>
  </div>

  <div className="relative flex h-1/5 items-center">
    <div className="flex-1 flex justify-center items-center p-4 text-center">
        <div className="absolute left-0 right-0 mx-auto  h-2.5 w-48 rounded-full bg-base-200"></div>
    </div>
  </div>
</div>

    </div>
  )
}
