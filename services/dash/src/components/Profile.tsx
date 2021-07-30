/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Tr, Td, useStyleConfig } from '@chakra-ui/react';

const Profile = () => {
  const style = useStyleConfig('taskColumn');

  return (
    <Tr bg = "bgblue" sx = {style}>
      <Td borderTopLeftRadius = "3xl" borderBottomLeftRadius = "3xl" paddingY = "13px">
        Test
      </Td>
      <Td>
        Spain
      </Td>
      <Td isNumeric>
        John Doe
      </Td>
      <Td isNumeric>
        johndoe@soulkiller.io
      </Td>
      <Td isNumeric>
        johndoe
      </Td>
      <Td isNumeric borderTopRightRadius = "3xl" borderBottomRightRadius = "3xl">
        07noi2sialetalebuzemoi
      </Td>
    </Tr>
  // <Box paddingY = "6px">
  //   <Box bg = "bgblue" borderRadius = "xl" sx = {styles} paddingY = "2px">
  //     <Box paddingX = "20px">
  //       <HStack>
  //         <Text>
  //         Test
  //         </Text>
  //         <Spacer />
  //         <Text isTruncated>
  //         Romania
  //         </Text>
  //         <Spacer />
  //         <Text isTruncated>
  //         John Doe
  //         </Text>
  //         <Spacer />
  //         <Text isTruncated>
  //         johndoe@soulkiller.io
  //         </Text>
  //         <Spacer />
  //         <Text isTruncated>
  //         username
  //         </Text>
  //         <Spacer />
  //         <Text isTruncated>
  //         0732057756
  //         </Text>
  //         <Box bg = "purple" borderRadius = "xl">
  //           <IconButton aria-label = "Search database" icon = {<FaTrash />} size = "sm" />
  //         </Box>
  //       </HStack>
  //     </Box>
  //   </Box>
  // </Box>
  );
};

export default Profile;
