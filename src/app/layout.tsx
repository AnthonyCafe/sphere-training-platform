import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import './globals.css'

export const metadata = {
  title: 'Sphere Training Platform',
  description: 'Comprehensive training for UAE counterparty engagement',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
          card: 'bg-slate-800',
        }
      }}
    >
      <html lang="en">
        <body className="bg-slate-900 text-white">{children}</body>
      </html>
    </ClerkProvider>
  )
}
