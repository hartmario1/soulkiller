/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Center, Divider, HStack, Image, SimpleGrid, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';
import { MdUpdate } from 'react-icons/md';
import { RiChatSmile2Line } from 'react-icons/ri';
import { IoHammerOutline } from 'react-icons/io5';
import { BsMoon, BsCodeSlash } from 'react-icons/bs';
import { DiWindows } from 'react-icons/di';
import { ImAppleinc } from 'react-icons/im';
import FaqBox from '../components/FaqBox';
import FeatureBox from '../components/FeatureBox';
import Head from 'next/head';
import OsBox from '../components/OsBox';

const HomePage = () => {
  const Title = () => (
    <div>
      <Head>
        <title>
          Soulkiller
        </title>
      </Head>
    </div>
  );

  const Features = () => (
    <Box>
      <Divider />
      <Center paddingTop = "8">
        <Text fontSize = "3xl" fontWeight = "bold">
          An experience
          {' '}
          {'you\'d'}
          {' '}
          expect from an automation software.
        </Text>
      </Center>

      <SimpleGrid columns = {[1, null, 2]} spacing = "4" paddingY = "5" minChildWidth = "350px">
        <FeatureBox featureIcon = {<FaDiscord />} title = "Our Discord server" content = "Get access to our Discord server where you can talk to us and see upcoming drops." />

        <FeatureBox featureIcon = {<RiChatSmile2Line />} title = "Friendly online support" content = "Get in touch with us and we will help you with any problem relating our software." />

        <FeatureBox featureIcon = {<MdUpdate />} title = "Free updates forever" content = "You will receive constant updates that will improve the software." />

        <FeatureBox featureIcon = {<IoHammerOutline />} title = "Easy to use" content = "Soulkiller.AIO is built with simplicity in mind, so that anybody can use it." />

        <FeatureBox featureIcon = {<BsMoon />} title = "Light and Dark UI" content = "Optimized for multiple color modes. Use light or dark, your choice." />

        <FeatureBox featureIcon = {<BsCodeSlash />} title = "Reliable" content = "Join the team to consistently secure the releases you want." />
      </SimpleGrid>
    </Box>
  );

  const Faq = () => (
    <Box>
      <Divider />
      <Center paddingTop = "8">
        <Text fontSize = "3xl" fontWeight = "bold">
          Frequently asked questions (FAQs)
        </Text>
      </Center>

      <SimpleGrid columns = {[1, null, 2]} spacing = "8" paddingY = "5" paddingBottom = "20">
        <FaqBox title = "What payment methods do you accept upon purchase?" content = "PayPal is our one and only payment option. Alternatively, you may use PayPal Guest Check upon checkout which allows the use of Visa, Mastercard, and American Express." />

        <FaqBox title = "Can we do a group buy?" content = "Unfortunately due to our limited copys we cannot allow any group buys." />

        <FaqBox title = "What operating systems are supported?" content = "Soulkiller.AIO supports both Windows and MacOSX without any need of a third party software." />

        <FaqBox title = "Do i need to pay for any additional updates?" content = "No, as long as you have a membership valid our software updates will be free." />

        <FaqBox title = "How much does Soulkiller.AIO cost?" content = "Soulkiller.AIO has a price of 50€/month." />

        <FaqBox title = "Do you accept refunds on your application?" content = "Because of our monthly subscription all sales are final, but you can cancel the subscription any time." />
      </SimpleGrid>
    </Box>
  );


  return (
    <Box>
      <Title />

      <Wrap spacing = "50px" justify = "center" paddingY = "75px">
        <WrapItem paddingTop = "30px">
          <VStack>
            <Center>
              <Text fontWeight = "bold" fontSize = "4xl">
              The software that will help you get your
              </Text>
            </Center>
            <Center>
              <Text fontWeight = "bold" fontSize = "4xl">
                favorite releases.
              </Text>
            </Center>
            <Center>
              <HStack>
                <OsBox os = "Windows" osIcon = {<DiWindows />} />
                <OsBox os = "MacOSX" osIcon = {<ImAppleinc />} />
              </HStack>
            </Center>
          </VStack>
        </WrapItem>
        <WrapItem>
          <Center>
            <Image src = "/Soulkiller.png" maxWidth = "350px" />
          </Center>
        </WrapItem>
      </Wrap>

      {/* <Box paddingTop = "70px" paddingBottom = "40px">
        <Grid h = "300px"
          templateRows = "repeat(2, 1fr)"
          templateColumns = "repeat(2, 1fr)"
          gap = {4}
        >
          <GridItem colStart = {1} w = "700px">

          </GridItem>
          <GridItem colStart = {1} w = "700px"> */}
      {/* <Center paddingTop = "20px"> */}

      {/* </Center> */}
      {/* </GridItem>
          <GridItem colStart = {2} rowStart = {1} rowSpan = {2}>
          </GridItem>
        </Grid>
      </Box> */}

      <Features />
      <Faq />
    </Box>
  );
};

export default HomePage;
