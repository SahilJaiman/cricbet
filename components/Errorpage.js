'use client';
import { useRouter } from 'next/navigation';
export default function Error() {
  const router = useRouter();
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
      <main className="grid min-h-full place-items-center  py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-2xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-base-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button onClick={() => router.push('/')}  className="btn btn-active btn-primary normal-case">Go back home</button>
            <a href="#" className="text-sm font-semibold ">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
