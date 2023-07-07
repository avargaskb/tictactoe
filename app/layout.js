import './globals.css'
import { Shadows_Into_Light } from 'next/font/google'

const shadows = Shadows_Into_Light({weight: '400', subsets: ['latin'] })

export const metadata = {
  title: 'Tic Tac Toe',
  
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={shadows.className}>{children}</body>
    </html>
  )
}
