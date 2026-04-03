import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          profilePic: true,
        }
      },
      likes: true,
      comments: {
        include: {
          user: {
            select: {
              name: true,
              username: true,
              profilePic: true,
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
  return Response.json(posts)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { content } = await req.json()

  if (!content || content.trim() === '') {
    return Response.json({ error: 'Content is required' }, { status: 400 })
  }

  const post = await prisma.post.create({
    data: {
      content,
      userId: parseInt(session.user.id)
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          profilePic: true,
        }
      }
    }
  })

  return Response.json(post)
}