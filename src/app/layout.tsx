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
          colorDanger: '#ef4444',
          colorSuccess: '#22c55e',
          colorWarning: '#f59e0b',
          colorNeutral: '#64748b',
        },
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
          card: 'bg-slate-800 border border-slate-700 shadow-xl',
          headerTitle: 'text-white',
          headerSubtitle: 'text-slate-400',
          socialButtonsBlockButton: 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600',
          socialButtonsBlockButtonText: 'text-white',
          formFieldLabel: 'text-slate-300',
          formFieldInput: 'bg-slate-700 border-slate-600 text-white placeholder-slate-400',
          footerActionLink: 'text-blue-400 hover:text-blue-300',
          identityPreviewText: 'text-white',
          identityPreviewEditButton: 'text-blue-400',
          userButtonPopoverCard: 'bg-slate-800 border border-slate-700',
          userButtonPopoverActionButton: 'text-white hover:bg-slate-700',
          userButtonPopoverActionButtonText: 'text-white',
          userButtonPopoverActionButtonIcon: 'text-slate-400',
          userButtonPopoverFooter: 'hidden',
          userPreviewMainIdentifier: 'text-white',
          userPreviewSecondaryIdentifier: 'text-slate-400',
          avatarBox: 'border-2 border-slate-600',
          menuButton: 'text-white hover:bg-slate-700',
          menuItem: 'text-white hover:bg-slate-700',
          menuList: 'bg-slate-800 border border-slate-700',
        }
      }}
    >
      <html lang="en">
        <body className="bg-slate-900 text-white">{children}</body>
      </html>
    </ClerkProvider>
  )
}
