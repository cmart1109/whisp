import { CardRoot, CardBody, Text, AvatarRoot, AvatarImage, AvatarFallback, VStack, Box } from '@chakra-ui/react'

export interface Comment {
  id: number
  content: string
  createdAt: string
  user: {
    name: string | null
    username: string
    profilePic: string
  }
}

interface CommentCardProps {
  comment: Comment
}

export default function CommentCard({ comment }: CommentCardProps) {
  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <CardRoot w="100%" borderRadius="md" shadow="sm" bg="brand.900" border={1} color="brand.100">
      <CardBody>
        <Box display="flex" gap={3} alignItems="center" mb={2}>
          <AvatarRoot>
            <AvatarImage
              src={`/profilepics/${comment.user.profilePic}.png`}
              alt={comment.user.name || comment.user.username}
            />
            <AvatarFallback>{comment.user.name?.charAt(0) || comment.user.username.charAt(0)}</AvatarFallback>
          </AvatarRoot>
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="bold" fontSize="sm">{comment.user.name || comment.user.username}</Text>
            <Text fontSize="xs" color="brand.100" opacity={0.7}>@{comment.user.username} · {formatDate(comment.createdAt)}</Text>
          </VStack>
        </Box>
        <Text>{comment.content}</Text>
      </CardBody>
    </CardRoot>
  )
}