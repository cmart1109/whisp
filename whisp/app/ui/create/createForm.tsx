"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Input, Text, Box, Textarea } from '@chakra-ui/react'

export default function CreateForm() {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!session?.user?.id) {
      setMessage({ type: 'error', text: 'Please log in to create a post' })
      setTimeout(() => setMessage(null), 5000)
      return
    }

    if (!content.trim()) {
      setMessage({ type: 'error', text: 'Please write something before posting' })
      setTimeout(() => setMessage(null), 5000)
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content })
      })

      if (!res.ok) {
        throw new Error('Failed to create post')
      }

      setMessage({ type: 'success', text: 'Post created successfully' })
      setContent('')
      setTimeout(() => router.push('/'), 1500)
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to create post' })
      setTimeout(() => setMessage(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box maxW="400px" mx="auto" mt={10} p={6} borderRadius="md" shadow="md" bg="brand.900" width="60%">
      {message && (
        <Box 
          mb={4} 
          p={3} 
          borderRadius="md" 
          bg={message.type === 'success' ? 'green.500' : 'red.500'}
          color="white"
        >
          <Text>{message.text}</Text>
        </Box>
      )}
      <Text fontSize="2xl" mb={6} color="brand.100" textAlign="center">What do you want to say?</Text>
      <form onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Textarea
          placeholder="What's funny?"
          mb={10}
          bg="charcoal.900"
          border={1}
          color="brand.100"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          <Input
            textAlign="center"
            type="submit"
            value={isLoading ? 'Posting...' : 'Post'}
            bg="brand.500"
            border={1}
            color="white"
            cursor={isLoading ? 'not-allowed' : 'pointer'}
            width="50%"
            fontWeight="bold"
            borderRadius="15px"
            opacity={isLoading ? 0.6 : 1}
            _hover={{
              bg: isLoading ? 'brand.500' : 'brand.600',
              transition: "background-color 0.3s ease-in-out"
            }}
            disabled={isLoading}
          />
        </div>
      </form>
    </Box>
  )
}