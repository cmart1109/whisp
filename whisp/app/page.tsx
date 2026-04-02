'use client'
import { Box, VStack, Text, Button, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { PostCard } from './ui/posts/postCard'
import NavBar from './ui/layout/navBar'

export default function Home() {
  const [posts, setPosts] = useState([])

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
        
      <div style={{ padding: '1rem' }}>
      <NavBar/>
      </div>
      <div>
      <Box p={6} maxW="4xl" mx="auto">
        {posts.map((post: any) => (
          <PostCard key={post.id} content={post.content} likes={post.likes} />
        ))}
      </Box>
      </div>
    </div>
      
  )
}