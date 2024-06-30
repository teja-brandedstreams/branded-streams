import { Inter } from 'next/font/google';
import './ui/globals.css';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Branded Streams',
  description: 'Branded Streams',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap');
        </style>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}