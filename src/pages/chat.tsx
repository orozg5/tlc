import React, { useState } from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import {
  Chat,
  MessageList,
  MessageInput,
  TypingIndicator,
  ChannelList,
  UserEntity,
} from "@pubnub/react-chat-components";
import { GetServerSideProps } from "next";
import IUserProps from "@/interfaces/IUserProps";
import { getMe } from "@/utils/getMe";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import RegHeader from "@/components/shared/RegHeader";
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Box, Flex } from "@chakra-ui/react";
import getMyStudents from "@/helpers/getMyStudents";
import getMyTutors from "@/helpers/getMyTutors";

export default function chat({ userData, publishKey, subscribeKey, users, channels }: IUserProps) {
  const pubnub = new PubNub({
    publishKey: publishKey,
    subscribeKey: subscribeKey,
    userId: userData?.first_name + " " + userData?.last_name,
  });
  const theme = "dark";

  const [currentChannel, setCurrentChannel] = useState(channels[0] || { id: "default" });

  return (
    <>
      <RegHeader userData={userData} />

      <PubNubProvider client={pubnub}>
        <Flex h="calc(100vh - 100px)">
          {channels && (
            <Chat currentChannel={currentChannel.id} users={users as UserEntity[]} theme={theme}>
              <Box w="264px">
                <ChannelList channels={channels} onChannelSwitched={(ch) => setCurrentChannel(ch)} />
              </Box>

              <Flex w="calc(100vw - 264px)" direction="column">
                <MessageList fetchMessages={25} enableReactions reactionsPicker={<Picker data={emojiData} />}>
                  <TypingIndicator/>
                </MessageList>
                <MessageInput typingIndicator emojiPicker={<Picker data={emojiData} />} />
              </Flex>
            </Chat>
          )}
        </Flex>
      </PubNubProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IUserProps> = async ({ req }) => {
  let session = await getMe(req);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const userData = await getCurrentUserInfo(req);
  const publishKey = process.env.REACT_APP_PUB_KEY;
  const subscribeKey = process.env.REACT_APP_SUB_KEY;

  let data;
  if (userData.role == "tutor") {
    data = await getMyStudents(userData.id);
  } else {
    data = await getMyTutors(userData.id);
  }
  const users = data.users;
  const channels = data.channels;

  return {
    props: {
      userData,
      publishKey,
      subscribeKey,
      users,
      channels,
    },
  };
};
