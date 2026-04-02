import { CardRoot, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react'

export function PostCard({ content, likes }: { content: string; likes: number }) {
    return (
        <CardRoot>
            <CardHeader>
                <Text fontWeight="bold">Post</Text>
            </CardHeader>
            <CardBody>
                <Text>{content}</Text>
            </CardBody>
            <CardFooter>
                <Text>{likes} likes</Text>
            </CardFooter>
        </CardRoot>
    )
}