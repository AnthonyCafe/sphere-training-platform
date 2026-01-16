# Sphere Training Platform

A comprehensive training platform for UAE counterparty engagement with user authentication, progress tracking, and AI-powered feedback.

## Features

- 🔐 **User Authentication** - Sign in with email, Google, or other providers via Clerk
- 📊 **Progress Tracking** - All progress saved to database, persists across sessions
- 🤖 **AI Feedback** - Get instant feedback on exercises and mastery assessments
- 👨‍💼 **Admin Dashboard** - Track all users' progress and scores
- 📱 **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Auth**: Clerk
- **Database**: Supabase (PostgreSQL)
- **AI**: Anthropic Claude API
- **Hosting**: Vercel

## Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd sphere-training-app
npm install
```

### 2. Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Copy the contents of `supabase-schema.sql` and run it
4. This creates all necessary tables

### 3. Configure Environment Variables

Create `.env.local` with your credentials (already provided, but update ANTHROPIC_API_KEY):

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Anthropic (for AI feedback)
ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel

1. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
5. Deploy!

## Admin Dashboard

Access the admin dashboard at `/admin` to:
- View all registered users
- Track individual progress
- See mastery assessment scores
- Export data as CSV

**Note**: Update the `adminEmails` array in `src/app/admin/page.tsx` with your admin email addresses.

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main training platform
│   ├── layout.tsx        # Root layout with Clerk provider
│   ├── admin/
│   │   └── page.tsx      # Admin dashboard
│   ├── api/
│   │   └── ai-feedback/  # AI feedback API route
│   ├── sign-in/          # Sign in page
│   └── sign-up/          # Sign up page
├── lib/
│   ├── pillars-data.ts   # Training content
│   ├── supabase.ts       # Database client
│   └── hooks.ts          # React hooks for data
└── middleware.ts         # Auth middleware
```

## Customization

### Adding Admin Users
Edit `src/app/admin/page.tsx`:
```typescript
const adminEmails = ['admin@yourcompany.com', 'another@admin.com']
```

### Modifying Training Content
Edit `src/lib/pillars-data.ts` to update pillars, sections, quizzes, etc.

### Styling
The app uses Tailwind CSS. Modify `src/app/globals.css` for global styles.

## Support

For issues or questions, contact your development team.
