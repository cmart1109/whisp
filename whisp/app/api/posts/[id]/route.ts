import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const post = await prisma.post.update({
    where: { id: Number(params.id) },
    data: { likes: { increment: 1 } }
  })

  return Response.json(post)
}