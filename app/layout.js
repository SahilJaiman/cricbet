import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" className="scroll-smooth transition-colors ease-in-out duration-200" lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  )
}

