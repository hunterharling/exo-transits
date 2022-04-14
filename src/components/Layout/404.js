import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const Page404 = (props) => {
  return (
    <Box 
      height={350}
      textAlign="center">
      <Heading height={70} mt={150} color="primary.400" fontSize="60px">404</Heading>

      <Text color="light.300">The page you are looking for does not exist...</Text>
    </Box>
  );
}

export default Page404;