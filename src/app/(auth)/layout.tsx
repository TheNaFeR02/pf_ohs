import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], })

export const metadata: Metadata = {
  title: 'Ocuppational Health & Safety',
  description: 'Ocuppational Health & Safety web application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`tracking-wider`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}