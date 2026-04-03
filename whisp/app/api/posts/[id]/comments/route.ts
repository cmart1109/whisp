import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/route'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  const postId = Number(resolvedParams.id)

  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { content } = await req.json()
  const userId = parseInt(session.user.id)

  if (!content || content.trim() === '') {
    return Response.json({ error: 'Comment cannot be empty' }, { status: 400 })
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      userId
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

  return Response.json(comment)
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  const postId = Number(resolvedParams.id)

  const comments = await prisma.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          profilePic: true,
        }
      }
    },
    orderBy: { createdAt: 'asc' }
  })

  return Response.json(comments)
}
