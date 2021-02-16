import { Box, Center, HStack, Icon, Text } from '@chakra-ui/react';

const OsBox = ({ os, osIcon }: { os: string; osIcon: JSX.Element }) => (
  <Box shadow = "dark-lg" borderRadius = "lg">
    <HStack spacing = "-25px">
      <Center>
        <Icon boxSize = "20" viewBox = "0 0 24 24" paddingTop = "21px" paddingLeft = "8px">
          {osIcon}
        </Icon>
      </Center>
      <Box>
        <Text fontSize = "xs" paddingTop = "2" paddingX = "3" paddingLeft = "30px">
          Available for
        </Text>
        <Text fontSize = "2xl" fontWeight = "bold" paddingBottom = "2" paddingX = "3">
          {os}
        </Text>
      </Box>
    </HStack>
  </Box>
);

export default OsBox;
