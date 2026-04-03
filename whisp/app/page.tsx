'use client'
import { Box, VStack, Text, Button, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { PostCard } from './ui/posts/postCard'
import NavBar from './ui/layout/navBar'

export default function Home() {
  const [posts, setPosts] = useState([])
  const { data: session } = useSession()

  const loadPosts = async () => {
    const res = await fetch('/api/posts')
    const data = await res.json()
    setPosts(data)
  }

  const likePost = async (id: number) => {
    await fetch(`/api/posts/${id}`, { method: 'PATCH' })
    loadPosts()
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: '1fr 4fr',
      minHeight: '100vh' }}>
        
      <div>
      <NavBar/>
      </div>
      <div>
      <Box p={6} maxW="4xl" mx="auto">
        {posts.length === 0 ? (
          <Box textAlign="center" py={20}>
            <Text fontSize="2xl" color="brand.100" mb={4}>No posts yet</Text>
            <Text color="brand.100" opacity={0.7}>Be the first to say something funny!</Text>
          </Box>
        ) : (
          posts.map((post: any) => (
            <PostCard key={post.id} post={post} currentUserId={session?.user?.id} onLike={likePost} />
          ))
        )}
      </Box>
      </div>
    </div>
      
  )
}