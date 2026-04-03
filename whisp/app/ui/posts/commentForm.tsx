"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Input, Text, Box, Textarea } from '@chakra-ui/react'

import { Comment } from './commentCard'

interface CommentFormProps {
  postId: number
  onCommentCreated: (comment: Comment) => void
}

export default function CommentForm({ postId, onCommentCreated }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const { data: session } = useSession()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session?.user?.id) {
      setMessage({ type: 'error', text: 'Please log in to comment' })
      setTimeout(() => setMessage(null), 5000)
      return
    }

    if (!content.trim()) {
      setMessage({ type: 'error', text: 'Please write something before commenting' })
      setTimeout(() => setMessage(null), 5000)
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content })
      })

      if (!res.ok) {
        throw new Error('Failed to create comment')
      }

      const newComment = await res.json()
      onCommentCreated(newComment)
      setMessage({ type: 'success', text: 'Comment added successfully' })
      setContent('')
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to create comment' })
      setTimeout(() => setMessage(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box mt={3} p={3} borderRadius="md" bg="brand.800" border={1}>
      {message && (
        <Box 
          mb={3} 
          p={2} 
          borderRadius="md" 
          bg={message.type === 'success' ? 'green.500' : 'red.500'}
          color="white"
        >
          <Text>{message.text}</Text>
        </Box>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Textarea
          placeholder="Write a reply..."
          bg="charcoal.900"
          border={1}
          color="brand.100"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading}
          size="sm"
        />
        <Input
          textAlign="center"
          type="submit"
          value={isLoading ? 'Commenting...' : 'Comment'}
          bg="brand.500"
          border={1}
          color="white"
          cursor={isLoading ? 'not-allowed' : 'pointer'}
          fontWeight="bold"
          borderRadius="12px"
          opacity={isLoading ? 0.6 : 1}
          _hover={{
            bg: isLoading ? 'brand.500' : 'brand.600',
            transition: 'background-color 0.3s ease-in-out'
          }}
          disabled={isLoading}
        />
      </form>
    </Box>
  )
}
