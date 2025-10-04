import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '연구 기회 검색 플랫폼',
  description: '맞춤형 연구 기회와 공모전 정보를 찾아보세요',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}