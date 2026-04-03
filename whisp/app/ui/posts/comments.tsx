import { VStack, Text, Box } from '@chakra-ui/react'
import CommentCard, { Comment } from './commentCard'

interface CommentsProps {
  comments: Comment[]
}

export default function Comments({ comments }: CommentsProps) {
  if (!comments || comments.length === 0) {
    return (
      <Box mt={3} p={3} borderRadius="md" bg="brand.800" border={1}>
        <Text color="brand.100" opacity={0.8} textAlign="center">No comments yet. Be the first to reply!</Text>
      </Box>
    )
  }

  return (
    <VStack align="stretch" mt={3}>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </VStack>
  )
}
