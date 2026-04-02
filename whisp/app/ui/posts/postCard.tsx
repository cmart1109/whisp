import { CardRoot, CardHeader, CardBody, CardFooter, Text, AvatarRoot, AvatarImage, AvatarFallback, Flex } from '@chakra-ui/react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LoopIcon from '@mui/icons-material/Loop';

export function PostCard({ content, likes }: { content: string; likes: number }) {
    return (
        <CardRoot>
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
                <LoopIcon />

            </CardFooter>
        </CardRoot>
    )
}