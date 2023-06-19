import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <html data-theme="winter" className="scroll-smooth transition-colors ease-in-out duration-200" lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

