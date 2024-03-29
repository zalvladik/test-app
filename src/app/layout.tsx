import { Open_Sans } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import TheHeader from 'src/components/TheHeader'

import ReduxProvider from 'src/redux/provider'

import 'src/app/globals.css'
import 'react-toastify/dist/ReactToastify.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--var-openSans',
})

export const metadata = {
  title: 'Test-app',
  description: 'Generated by Next.js',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={openSans.variable}>
        <ReduxProvider>
          <TheHeader />
          <main>{children}</main>
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  )
}

export default RootLayout
