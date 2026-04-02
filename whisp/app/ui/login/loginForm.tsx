"use client"

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Input, Text, Box, Link } from '@chakra-ui/react'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    setIsLoading(false)

    if (result?.error) {
      setError('Invalid username or password')
    } else {
      // Redirect to profile or home
      window.location.href = '/profile'
    }
  }

  return (
    <Box maxW="400px" mx="auto" mt={10} p={6} borderRadius="md" shadow="md" bg="brand.900" width="60%">
      <Text fontSize="2xl" mb={6} color="brand.100" textAlign="center">Login</Text>
      {error && <Text color="red.400" mb={4} textAlign="center">{error}</Text>}
      <form onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          bg="charcoal.900"
          border={1}
          color="brand.100"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          bg="charcoal.900"
          border={1}
          color="brand.100"
        />
        <Text>
          Don't have an account? <Link
            href="/register"
            color="brand.500">Register</Link>
        </Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          <Input
            textAlign="center"
            type="submit"
            value={isLoading ? "Logging in..." : "Login"}
            bg="brand.500"
            border={1}
            color="white"
            cursor={isLoading ? "not-allowed" : "pointer"}
            width="50%"
            fontWeight="bold"
            borderRadius="15px"
            _hover={{
              bg: isLoading ? "brand.500" : "brand.600",
              transition: "background-color 0.3s ease-in-out"
            }}
            disabled={isLoading}
          />
        </div>
      </form>
    </Box>
  )
}