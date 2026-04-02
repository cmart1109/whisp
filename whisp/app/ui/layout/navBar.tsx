
import { Link, Text } from "@chakra-ui/react";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';

export default function NavBar() {
  return (
    <nav style={{
        display: 'flex',
    }}>
      <ul >
        <li>
            <Link href="/"
            padding={4}
            colorScheme="brand.800"
            transition="all 0.3s ease-in-out"
            _hover={{
            background: "brand.500",
            color: "white",
            }}
            >
            <HomeIcon sx={{ color: 'white' }} />
            <Text color="white">Home</Text>
            </Link>
        </li>
        <li>
            <Link href="/"
            padding={4}
            colorScheme="brand.800"
            transition="all 0.3s ease-in-out"
            _hover={{
            background: "brand.500",
            color: "white",
            }}
            >
            <SearchIcon sx={{ color: 'white' }} />
            <Text color="white">Search</Text>
            </Link>
        </li>
        <li>
            <Link href="/"
            padding={4}
            colorScheme="brand.800"
            transition="all 0.3s ease-in-out"
            _hover={{
            background: "brand.500",
            color: "white",
            }}
            >
            <AddIcon sx={{ color: 'white' }} />
            <Text color="white">Create</Text>
            </Link>
        </li>
        <li>
            <Link href="/login"
            padding={4}
            colorScheme="brand.800"
            transition="all 0.3s ease-in-out"
            _hover={{
            background: "brand.500",
            color: "white",
            }}
            >
            <PersonIcon sx={{ color: 'white' }} />
            <Text color="white">Profile</Text>
            </Link>
        </li>
      </ul>
    </nav>
  );
}
