import { Box, Text } from '@chakra-ui/react';

const LegalBox = ({ title, ...rest }: { title: string } & Record<string, string>) => {
  const Components = Object
    .values(rest)
    .map(text => (
      <Text paddingY = "5px">
        {text}
      </Text>
    ));

  return (
    <Box paddingY = "10px">
      <Text fontWeight = "bold" fontSize = "3xl">
        {title}
      </Text>
      {Components}
    </Box>
  );
};

export default LegalBox;
