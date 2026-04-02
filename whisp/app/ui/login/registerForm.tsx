"use client"

import { useState } from 'react'
import { Input, InputGroup, Text, Box, Link} from '@chakra-ui/react'

export default function registerForm() {
  const [profilePic, setProfilePic] = useState('default')
  const profilePicMap: Record<string,string> = {
    default: '/profilepics/avatar.png',
    cat: '/profilepics/cat.png',
    cow: '/profilepics/cow.png',
    dog: '/profilepics/dog.png',
    crow: '/profilepics/crow.png',
    fish: '/profilepics/fish.png',
    robot: '/profilepics/robot.png',
  }

  return (
    <Box maxW="400px" mx="auto" mt={10} p={6} borderRadius="md" shadow="md" bg="brand.900" width="60%">
    <Text fontSize="2xl" mb={6} color="brand.100" textAlign="center">Register</Text>
    <form action="/api/register" method="POST"
    style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    }}
    >
        <Input placeholder="Name" mb={4} bg="charcoal.900" border={1} color="brand.100" name="name" />
        <Input placeholder="Username" mb={4} bg="charcoal.900" border={1} color="brand.100" name="username" />
        <Input placeholder="Email" mb={4} bg="charcoal.900" border={1} color="brand.100" name="email" />
        <Input type="password" placeholder="Password" mb={4} bg="charcoal.900" border={1} color="brand.100" name="password" />

        <Text fontSize="xl" mb={6} color="brand.100" textAlign="center">Profile Picture</Text>
        <select
          name="profilePic"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#1a202c',
            color: '#edf2f7',
            borderRadius: '8px',
            border: '1px solid #4a5568',
          }}
        >
          <option value="default">Default</option>
          <option value="cat">Cat</option>
          <option value="cow">Cow</option>
          <option value="dog">Dog</option>
          <option value="crow">Crow</option>
          <option value="fish">Fish</option>
          <option value="robot">Robot</option>
        </select>

        <Box display="flex" justifyContent="center" mt={3}>
          <img
            src={profilePicMap[profilePic]}
            alt={profilePic + ' avatar'}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #d6bcfa',
            }}
          />
        </Box>
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
        value="Register" 
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