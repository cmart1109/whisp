import { Box, Text, Image, Avatar } from "@chakra-ui/react"

export function Header() {
  return (
    <Box as="header" p={4} bg="brand.900" color="white" shadow="md">
      <Image
        src="/logo.png"
        alt="Whisp Logo"
        width="120px"
        height="40px"
        objectFit="contain"
      />
    </Box>
  )
}