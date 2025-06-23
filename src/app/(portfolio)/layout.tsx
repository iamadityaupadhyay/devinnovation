import "../globals.css"
import Navbar from "@/app/(portfolio)/components/Layout/Navbar"
import Footer from "./components/Layout/Footer"

export const metadata = {
  title: 'DevTeam Portfolio',
  description: 'Our amazing developer team portfolio',
}

export default function RootLayout({ children }:any) {
  let theme = 'dark' 
  theme='light'// This can be dynamically set based on user preference or system settings
  return (
    <html lang="en">
      
      <body>
        <Navbar/>
      <div className={`min-h-screen  ${theme === 'dark' ? 'bg-[url("/bg.png")]' : 'bg-white'}`}>
        {children}
      </div>
        <Footer/>
      </body>
    </html>
  )
}