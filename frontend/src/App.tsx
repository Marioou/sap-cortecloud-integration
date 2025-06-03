import { ChakraProvider, Box, Container } from '@chakra-ui/react';
import ApiTester from './components/ApiTester';

function App() {
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        <Container maxW="container.xl" py={8}>
          <ApiTester />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
