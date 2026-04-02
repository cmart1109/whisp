"use client"

import { useSession, signOut } from 'next-auth/react'
import { Text, Box, Button, AvatarRoot, AvatarImage, AvatarFallback } from '@chakra-ui/react'

export default function ProfilePage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Text>Loading...</Text>
  }

  if (!session) {
    return <Text>You are not logged in.</Text>
  }

  return (
    <Box maxW="400px" mx="auto" mt={10} p={6} borderRadius="md" shadow="md" bg="brand.900" width="60%" textAlign="center">
      <Text fontSize="2xl" mb={6} color="brand.100">Profile</Text>

      <AvatarRoot
        size="xl"
        mb={4}
      >
        <AvatarImage
          src={`/profilepics/${session.user.profilePic}.png`}
          alt={session.user.name || 'User'}
        />
        <AvatarFallback>{session.user.name?.charAt(0) || 'U'}</AvatarFallback>
      </AvatarRoot>

      <Text fontSize="lg" color="brand.100" mb={2}>
        Name: {session.user.name}
      </Text>
      <Text fontSize="lg" color="brand.100" mb={2}>
        Username: {session.user.username}
      </Text>
      <Text fontSize="lg" color="brand.100" mb={4}>
        Email: {session.user.email}
      </Text>

      <Button
        onClick={() => signOut({ callbackUrl: '/' })}
        bg="brand.500"
        color="white"
        _hover={{ bg: "brand.600" }}
      >
        Sign Out
      </Button>
    </Box>
  )
}