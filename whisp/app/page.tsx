'use client'
import { Box, VStack, Text, Button, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { PostCard } from './ui/posts/postCard'
import NavBar from './ui/layout/navBar'

export default function Home() {
  const [posts, setPosts] = useState([])
  const { data: session, status } = useSession()

  const loadPosts = async () => {
    const res = await fetch('/api/posts')
    const data = await res.json()
    setPosts(data)
  }

  const likePost = async (id: number) => {
    console.log('Liking post', id)
    const res = await fetch(`/api/posts/${id}`, { method: 'PATCH' })
    console.log('Like response status:', res.status)
    if (res.ok) {
      const updatedPost = await res.json()
      console.log('Updated post:', updatedPost)
      loadPosts()
    } else {
      console.error('Failed to like post')
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 4fr' }} minH="100vh">
      <Box>
        <NavBar />
      </Box>
      <Box>
        <Box p={{ base: 4, md: 6 }} maxW="4xl" mx="auto">
          {status === 'loading' ? (
            <Text>Loading...</Text>
          ) : posts.length === 0 ? (
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
      </Box>
    </Box>
      
  )
}