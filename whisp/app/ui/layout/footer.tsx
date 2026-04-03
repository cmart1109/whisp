import { Box, Text, Image, Avatar } from "@chakra-ui/react"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export function Footer() {
  return (
    <Box as="footer" p={4} bg="brand.900" color="white" shadow="md"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text textAlign="center">© 2026 Whisp. All rights reserved.</Text>
      <Box display="flex" justifyContent="center" mt={2} gap={4}>
        <a href="https://github.com/cmart1109/whisp.git" target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
        </a>
        <a href="https://www.linkedin.com/in/ch-martinez2002/" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </a>
      </Box>
    </Box>
  )
}