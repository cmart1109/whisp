'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CardRoot, CardHeader, CardBody, CardFooter, Text, AvatarRoot, AvatarImage, AvatarFallback, Flex, IconButton, VStack, HStack, Box } from '@chakra-ui/react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import Comments from './comments'
import CommentForm from './commentForm'
import { Comment } from './commentCard'

interface Like {
  userId: number | string
}

type PostComment = Comment

interface Post {
  id: number
  content: string
  createdAt: string
  user: {
    name: string | null
    username: string
    profilePic: string
  }
  likes: Like[]
  comments: PostComment[]
}

interface PostCardProps {
  post: Post
  currentUserId?: string
  onLike?: (postId: number) => void
}

export function PostCard({ post, currentUserId, onLike }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<PostComment[]>(post.comments || [])
  const [likes, setLikes] = useState<Like[]>(post.likes || [])
  const router = useRouter()

  const userLiked = likes.some((like) => like.userId.toString() === currentUserId)
  const likesCount = likes.length

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const toggleComments = () => {
    if (!currentUserId) {
      router.push('/login')
      return
    }
    setShowComments((prev) => !prev)
  }

  const handleCommentCreated = (newComment: PostComment) => {
    setComments((prev) => [...prev, newComment])
  }

  const handleLike = async () => {
  if (!onLike) return  

  if (userLiked) {
    setLikes((prev) => prev.filter((l) => l.userId.toString() !== currentUserId))
  } else {
    setLikes((prev) => [...prev, { userId: currentUserId ?? 'temp' }])
  }

  onLike(post.id)
}
  console.log('currentUserId:', currentUserId)
  console.log('likes:', likes)
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
            onClick={() => {
              if (!currentUserId) {
                router.push('/login')
              } else {
                handleLike()
              }
            }}
            _hover={{ opacity: 0.8 }}
          >
            {userLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Text>{likesCount}</Text>
        </HStack>
        <HStack gap={2} onClick={toggleComments} style={{ cursor: 'pointer' }}>
          <CommentIcon style={{ opacity: 0.7 }} />
          <Text>{comments.length}</Text>
        </HStack>
      </CardFooter>

      <Box mt={1}>
        {showComments && (
          <CommentForm postId={post.id} onCommentCreated={handleCommentCreated} />
        )}
        <Comments comments={comments} />
      </Box>
    </CardRoot>
  )
}