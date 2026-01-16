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
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'blockButton',
        },
        variables: {
          colorPrimary: '#3b82f6',
          colorText: '#1e293b',
          colorTextOnPrimaryBackground: '#ffffff',
          colorTextSecondary: '#475569',
          colorBackground: '#ffffff',
          colorInputBackground: '#f8fafc',
          colorInputText: '#1e293b',
        },
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium',
          card: 'bg-white shadow-xl border-0',
          headerTitle: 'text-slate-900 font-bold',
          headerSubtitle: 'text-slate-600',
          socialButtonsBlockButton: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50',
          socialButtonsBlockButtonText: 'text-slate-700 font-medium',
          formFieldLabel: 'text-slate-700 font-medium',
          formFieldInput: 'bg-white border border-slate-300 text-slate-900',
          footerActionLink: 'text-blue-600 hover:text-blue-700 font-medium',
          identityPreviewText: 'text-slate-900',
          identityPreviewEditButton: 'text-blue-600',
          userButtonPopoverCard: 'bg-white border border-slate-200 shadow-lg',
          userButtonPopoverActionButton: 'text-slate-700 hover:bg-slate-100',
          userButtonPopoverActionButtonText: 'text-slate-700',
          userButtonPopoverActionButtonIcon: 'text-slate-500',
          userPreviewMainIdentifier: 'text-slate-900 font-medium',
          userPreviewSecondaryIdentifier: 'text-slate-500',
        }
      }}
    >
      <html lang="en">
        <body className="bg-slate-900 text-white">{children}</body>
      </html>
    </ClerkProvider>
  )
}
