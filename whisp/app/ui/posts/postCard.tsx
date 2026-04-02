import { CardRoot, CardHeader, CardBody, CardFooter, Text, AvatarRoot, AvatarImage, AvatarFallback, Flex } from '@chakra-ui/react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';

export function PostCard({ content, likes }: { content: string; likes: number }) {
    return (
        <CardRoot mx="auto" mt={4} p={4} borderRadius="md" shadow="md" bg="charcoal.900" color="brand.100" border={1}>
            <CardHeader display="flex" flexDirection="row" alignItems="center" gap={4}>
                <AvatarRoot>
                  <AvatarImage src="/avatar.png" alt="User avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </AvatarRoot>
                <Text fontWeight="bold">User</Text>
            </CardHeader>
            <CardBody>
                <Text>{content}</Text>
            </CardBody>
            <CardFooter>
                <FavoriteBorderIcon />
                <Text>{likes}</Text>
                <CommentIcon style={{ marginLeft: '16px' }} />
                

            </CardFooter>
        </CardRoot>
    )
}