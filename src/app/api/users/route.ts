import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  try {
    const { userIds } = await request.json()
    
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json({ users: {} })
    }

    const users: Record<string, { name: string; email: string }> = {}
    
    // Fetch each user from Clerk
    for (const userId of userIds) {
      try {
        const user = await clerkClient.users.getUser(userId)
        const name = user.firstName && user.lastName 
          ? `${user.firstName} ${user.lastName}`
          : user.firstName || user.emailAddresses[0]?.emailAddress?.split('@')[0] || 'Unknown'
        const email = user.emailAddresses[0]?.emailAddress || ''
        users[userId] = { name, email }
      } catch (e) {
        // User not found or error - use fallback
        users[userId] = { name: `User ${userId.slice(0, 8)}`, email: '' }
      }
    }

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ users: {} }, { status: 500 })
  }
}
