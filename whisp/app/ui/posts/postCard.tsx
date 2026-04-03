import { CardRoot, CardHeader, CardBody, CardFooter, Text, AvatarRoot, AvatarImage, AvatarFallback, Flex, IconButton, VStack, HStack } from '@chakra-ui/react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

interface Post {
  id: number
  content: string
  createdAt: string
  user: {
    name: string | null
    username: string
    profilePic: string
  }
  likes: Array<any>
  comments: Array<any>
}

interface PostCardProps {
  post: Post
  currentUserId?: string
  onLike?: (postId: number) => void
}

export function PostCard({ post, currentUserId, onLike }: PostCardProps) {
  const userLiked = post.likes.some((like: any) => like.userId.toString() === currentUserId)
  const likesCount = post.likes.length
  const commentsCount = post.comments.length

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
    <CardRoot mx="auto" mt={4} p={4} borderRadius="md" shadow="md" bg="brand.900" color="brand.100" border={1}>
      <CardHeader display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" gap={4}>
        <Flex alignItems="center" gap={4}>
          <AvatarRoot>
            <AvatarImage 
              src={`/profilepics/${post.user.profilePic}.png`} 
              alt={post.user.name || post.user.username}
            />
            <AvatarFallback>{post.user.name?.charAt(0) || post.user.username.charAt(0)}</AvatarFallback>
          </AvatarRoot>
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="bold">{post.user.name || post.user.username}</Text>
            <Text fontSize="sm" color="brand.100" opacity={0.7}>@{post.user.username}</Text>
          </VStack>
        </Flex>
        <Text fontSize="xs" color="brand.100" opacity={0.6}>{formatDate(post.createdAt)}</Text>
      </CardHeader>
      <CardBody>
        <Text>{post.content}</Text>
      </CardBody>
      <CardFooter display="flex" gap={6} justifyContent="flex-start">
        <HStack gap={2}>
          <IconButton
            size="sm"
            variant="ghost"
            onClick={() => onLike?.(post.id)}
            aria-label="Like post"
            _hover={{ opacity: 0.8 }}
          >
            {userLiked ? <FavoriteIcon style={{ color: '#FF6B6B' }} /> : <FavoriteBorderIcon style={{ color: '#e0f2fe' }} />}
          </IconButton>
          <Text>{likesCount}</Text>
        </HStack>
        <HStack gap={2}>
          <CommentIcon style={{ cursor: 'pointer', opacity: 0.7 }} />
          <Text>{commentsCount}</Text>
        </HStack>
      </CardFooter>
    </CardRoot>
  )
}