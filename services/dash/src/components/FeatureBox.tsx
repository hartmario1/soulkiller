import { Box, Center, HStack, Icon, Text, useStyleConfig } from '@chakra-ui/react';

const FeatureBox = ({ title, content, featureIcon }: { title: string; content: string; featureIcon: JSX.Element }) => {
  const styles = useStyleConfig('featureBox');

  return (
    <Box sx = {styles} shadow = "dark-lg" borderRadius = "lg" bg = "purple">
      <HStack spacing = "-25px">
        <Center>
          <Icon boxSize = "20" viewBox = "0 0 24 24" paddingTop = "21px" paddingLeft = "8px">
            {featureIcon}
          </Icon>
        </Center>
        <Box>
          <Text fontSize = "xl" fontWeight = "bold" paddingTop = "2" paddingX = "3">
            {title}
          </Text>
          <Text fontSize = "m" paddingBottom = "2" paddingX = "3">
            {content}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default FeatureBox;
