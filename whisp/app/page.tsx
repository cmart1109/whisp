'use client'
import { Box, VStack, Text, Button, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

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
    <Box p={6} maxW="4xl" mx="auto">
      <VStack align="stretch">
        {posts.map((post: any) => (
          <Box key={post.id} p={4} borderWidth={1} borderRadius="lg" shadow="sm">
            <Text mb={3}>{post.content}</Text>
            <HStack>
              <Button
                colorScheme="red"
                variant="outline"
                size="sm"
                onClick={() => likePost(post.id)}
              >
                {post.likes}
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}