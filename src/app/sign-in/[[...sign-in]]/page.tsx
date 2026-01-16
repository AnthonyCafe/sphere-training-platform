import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Sphere Training Platform</h1>
        <p className="text-slate-400 mb-8">Sign in to access your training</p>
        <SignIn />
      </div>
    </div>
  )
}
