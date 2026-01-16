import { ClerkProvider } from '@clerk/nextjs'
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
        variables: {
          colorPrimary: '#3b82f6',
          colorBackground: '#1e293b',
          colorInputBackground: '#334155',
          colorInputText: '#ffffff',
          colorText: '#ffffff',
          colorTextSecondary: '#94a3b8',
        },
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
          card: 'bg-slate-800 border border-slate-700',
          headerTitle: 'text-white',
          headerSubtitle: 'text-slate-400',
          socialButtonsBlockButton: 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600',
          formFieldLabel: 'text-slate-300',
          formFieldInput: 'bg-slate-700 border-slate-600 text-white',
          footerActionLink: 'text-blue-400 hover:text-blue-300',
          identityPreviewText: 'text-white',
          identityPreviewEditButton: 'text-blue-400',
        }
      }}
    >
      <html lang="en">
        <body className="bg-slate-900 text-white">{children}</body>
      </html>
    </ClerkProvider>
  )
}
