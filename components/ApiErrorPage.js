'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
export default function ApiErrorPage() {
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
            <main className="flex flex-1 flex-col justify-center items-center min-h-full ">
                <div className="flex flex-col justify-center text-center">
                    <p className="text-2xl font-semibold text-primary">Oops</p>
                    <div className='flex justify-center' >
                        <img width={240} height={240} src={"/sad.svg"} />
                    </div>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-3xl">API Request Failed</h1>
                    <p className="mt-6 text-base leading-7 text-base-600">Sorry, we can't fetch data at this moment.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button onClick={() => router.push('/')} className="btn btn-active btn-primary normal-case">Go back home</button>
                        <a href="#" className="text-sm font-semibold ">
                            Contact support <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
            </main>
        </>
    )
}
