import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = formData.get('name')?.toString()?.trim() || ''
    const username = formData.get('username')?.toString()?.trim() || ''
    const email = formData.get('email')?.toString()?.trim() || ''
    const password = formData.get('password')?.toString() || ''
    const profilePic = formData.get('profilePic')?.toString()?.trim() || 'default'

    if (!name || !username || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Username or email is already in use' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        profilePic,
      },
    })

    return NextResponse.json({ success: true, user: { id: newUser.id, username: newUser.username } }, { status: 201 })
  } catch (error) {
    console.error('Registration error', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
