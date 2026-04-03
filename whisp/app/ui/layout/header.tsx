"use client"

import { Box, Text, Image, Flex, Button, AvatarRoot, AvatarImage, AvatarFallback } from "@chakra-ui/react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <header>
    <Box as="header" p={4} bg="black" color="white" shadow="md">
      <Flex justify="space-between" align="center">
        <Image
          src="/logo.png"
          alt="Whisp Logo"
          width="120px"
          height="40px"
          objectFit="contain"
          cursor="pointer"
          onClick={() => router.push('/')}
          />
        
        {session?.user ? (
          <AvatarRoot
            size="md"
            cursor="pointer"
            onClick={() => router.push('/profile')}
            _hover={{ opacity: 0.8 }}
          >
            <AvatarImage
              src={`/profilepics/${session.user.profilePic || 'default'}.png`}
              alt={session.user.name || 'User'}
              />
            <AvatarFallback>{session.user.name?.charAt(0) || 'U'}</AvatarFallback>
          </AvatarRoot>
        ) : (
          <Button
            bg="brand.500"
            color="white"
            _hover={{ bg: "brand.600" }}
            onClick={() => signIn()}
          >
            Log In
          </Button>
        )}
      </Flex>
    </Box>
</header>
  )
}