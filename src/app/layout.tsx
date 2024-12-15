import Navbar from "../components/Navigation/Navbar"
import "./globals.css"

import {Inter} from 'next/font/google'

const inter = Inter({
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`${inter.className}`}>
        <header className={`bg-gray-100 shadow-md mx-auto`}>
          <Navbar></Navbar>
        </header>
        <main className="container mx-auto p-10">
          {children}
        </main>
        <footer className="text-gray-400 text-center text-xs py-5">
          <p>&copy; {new Date().getUTCFullYear()} - l4h7</p>
        </footer>
      </body>
    </html>
  )
}