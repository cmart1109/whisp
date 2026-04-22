import { PostCard } from "@/app/ui/posts/postCard"

async function getPost(id: string) {
  const res = await fetch(`http://localhost:3000/api/posts`)
  const posts = await res.json()
  return posts.find((p: any) => p.id === Number(id))
}

export default async function PostPage({ params }: any) {
  const post = await getPost(params.id)

  return (
    <div>
      <PostCard post={post}/>
    </div>
  )
}