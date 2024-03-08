import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function Sidenav() {
  return (
    <Flex bg="#93B1A6" direction="column">
      <Text>Instructions</Text>
      <Text>Calendar</Text>
      <Text>Chat</Text>
    </Flex>
  )
}
