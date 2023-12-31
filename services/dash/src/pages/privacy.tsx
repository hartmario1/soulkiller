/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { Box, Center, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import StandardLayout from 'components/Layouts/Standard';
import LegalBox from 'components/LegalBox';
import Head from 'next/head';

const PrivacyPolicy = () => {
  const Title = () => (
    <div>
      <Head>
        <title>
            Privacy of Policy
        </title>
      </Head>
    </div>
  );

  return (
    <StandardLayout>
      <Box>
        <Title />

        <Box paddingBottom = "20px">
          <Center>
            <Text fontWeight = "bold" fontSize = "5xl" align = "center">
            Privacy Policy
            </Text>
          </Center>
          <Center>
            <Text align = "center" fontStyle = "italic">
            Updated at 2021-02-18
            </Text>
          </Center>
          <Center paddingTop = "7px">
            <Text align = "center">
            Soulkiller (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Soulkiller.
            </Text>
          </Center>
          <Center paddingTop = "7px">
            <Text align = "center">
          This Privacy Policy applies to our website, and its associated subdomains (collectively, our “Service”) alongside our application, Soulkiller. By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy and our Terms of Service.
            </Text>
          </Center>
        </Box>

        <Box paddingBottom = "20px">
          <Text fontWeight = "bold" fontSize = "3xl">
          Definitions and key terms
          </Text>
          <Text paddingY = "5px">
          To help explain things as clearly as possible in this Privacy Policy, every time any of these terms are referenced, are strictly defined as:
          </Text>
          <UnorderedList>
            <ListItem>
            Cookie: small amount of data generated by a website and saved by your web browser. It is used to identify your browser, provide analytics, remember information about you such as your language preference or login information.
            </ListItem>
            <ListItem>
            Company: when this policy mentions “Company,” “we,” “us,” or “our,” it refers to Soulkiller, that is responsible for your information under this Privacy Policy.
            </ListItem>
            <ListItem>
            Customer: refers to the company, organization or person that signs up to use the Soulkiller Service to manage the relationships with your consumers or service users.
            </ListItem>
            <ListItem>
            Device: any internet connected device such as a phone, tablet, computer or any other device that can be used to visit Soulkiller and use the services.
            </ListItem>
            <ListItem>
            IP address: Every device connected to the Internet is assigned a number known as an Internet protocol (IP) address. These numbers are usually assigned in geographic blocks. An IP address can often be used to identify the location from which a device is connecting to the Internet.
            </ListItem>
            <ListItem>
            Personnel: refers to those individuals who are employed by Soulkiller or are under contract to perform a service on behalf of one of the parties.
            </ListItem>
            <ListItem>
            Personal Data: any information that directly, indirectly, or in connection with other information — including a personal identification number — allows for the identification or identifiability of a natural person.
            </ListItem>
            <ListItem>
            Service: refers to the service provided by Soulkiller as described in the relative terms (if available) and on this platform.
            </ListItem>
            <ListItem>
            Third-party service: refers to advertisers, contest sponsors, promotional and marketing partners, and others who provide our content or whose products or services we think may interest you.
            </ListItem>
            <ListItem>
            Website: site, which can be accessed via this URL: www.soulkiller.io
            </ListItem>
            <ListItem>
            You: a person or entity that is registered with Soulkiller to use the Services.
            </ListItem>
          </UnorderedList>
        </Box>

        <Box paddingBottom = "20px">
          <Text fontWeight = "bold" fontSize = "3xl">
          What Information Do We Collect?
          </Text>
          <Text paddingY = "5px">
        We collect information from you when you visit our website, register on our site, place an order, subscribe to our newsletter, respond to a survey or fill out a form.
          </Text>
          <UnorderedList>
            <ListItem>
            Personal Data
            </ListItem>
            <ListItem>
            Analytics
            </ListItem>
          </UnorderedList>
          <Text>
          While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (“Personal Data”).
          </Text>
        </Box>

        <LegalBox title = "Do we share the information we collect with third parties?"
          content1 = "Data may be sent to our payment processor, Stripe (Stripe.com), whose privacy policy can be viewed at https://stripe.com/privacy" />

        <LegalBox title = "Where and when is information collected from customers and end users?"
          content1 = "We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification."
          content2 = "We don’t share any personally identifying information publicly or with third-parties, except when required to by law or with your full consent." />

        <LegalBox title = "How Long Do We Keep Your Information?"
          content1 = "We keep your information only so long as we need it to provide Soulkiller to you and fulfill the purposes described in this policy. This is also the case for anyone that we share your information with and who carries out services on our behalf. When we no longer need to use your information and there is no need for us to keep it to comply with our legal or regulatory obligations, we’ll either remove it from our systems or depersonalize it so that we can't identify you."
          content2 = "You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services." />

        <LegalBox title = "Tracking & Cookies Data"
          content1 = "We use cookies and similar tracking technologies to hold certain information."
          content2 = "Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service."
          content3 = "You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service."
          content4 = "We use cookies for sessions and security purposes." />

        <LegalBox title = "Kids' Privacy"
          content1 = "Our Service does not address anyone under the age of 18 (“Children”)."
          content2 = "We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers." />

        <LegalBox title = "Contact"
          contact = "If you wish to perform a subject access request, please email [soulkilleroffice@gamil.com] in order to receive a timely response." />

      </Box>
    </StandardLayout>
  );
};

export default PrivacyPolicy;
