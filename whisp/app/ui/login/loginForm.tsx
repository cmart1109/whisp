import { Input, InputGroup, Text, Box, Link} from '@chakra-ui/react'

export default function LoginForm() {
  return (
    <Box maxW="400px" mx="auto" mt={10} p={6} borderRadius="md" shadow="md" bg="brand.900" width="60%">
    <Text fontSize="2xl" mb={6} color="brand.100" textAlign="center">Login</Text>
    <form action="/login" method="POST"
    style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    }}
    >
        <Input placeholder="Username" mb={4} bg="charcoal.900" border={1} color="brand.100" />
        <Input type="password" placeholder="Password" mb={4} bg="charcoal.900" border={1} color="brand.100" />
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
        value="Login" 
        bg="brand.500" 
        border={1} 
        color="white" 
        cursor="pointer" 
        width="50%"
        fontWeight="bold"
        borderRadius="15px"
        _hover={{ 
          bg: "brand.600", 
          transition: "background-color 0.3s ease-in-out"
          }} />
        </div>
    </form>
    </Box>
  )
}