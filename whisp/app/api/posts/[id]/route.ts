import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log('PATCH /api/posts/', params.id)
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    console.log('No session')
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const postId = Number(params.id)
  const userId = parseInt(session.user.id)
  console.log('User ID:', userId)

  // Check if user already liked this post
  const existingLike = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId
      }
    }
  })

  if (existingLike) {
    // Unlike the post
    await prisma.like.delete({
      where: {
        postId_userId: {
          postId,
          userId
        }
      }
    })
    console.log('Unliked post')
  } else {
    // Like the post
    await prisma.like.create({
      data: {
        postId,
        userId
      }
    })
    console.log('Liked post')
  }

  // Return updated post with like count
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: {
        select: {
          name: true,
          username: true,
          profilePic: true,
        }
      },
      likes: true,
      comments: true
    }
  })

  return Response.json(post)
}