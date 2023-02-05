import { Avatar, Box, Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import ReceiverConnector from '../receiver-connector/receiver-connector'
import SourceConnector from '../source-connector/source-connector'
import VideoPlayer from '../video-player/video-player'
import styles from './home-dash.module.scss'
import type { RCProps } from "@multi-stream/shared/ui"
import { useUser } from 'apps/multi-stream/context/user.context'

export const ReceiverCard = ({receiver}: {receiver: RCProps}) => {

  return <Box
    display="flex"
    alignItems="center"
    marginBlock="10px"
    p="10px"
    borderRadius="md"
    bg="light"
  >
    <Box>
      <Box w="50px" h="50px" borderRadius="md" mr="10px">
        <Avatar name={receiver.name}/>
      </Box>
    </Box>
    <Box>
      <Text fontSize="lg">{receiver.name}</Text>
      <Text>{receiver.server}</Text>
    </Box>
  </Box>
}

/* eslint-disable-next-line */
export interface HomeDashProps {}

export function HomeDash(props: HomeDashProps) {
  const userContext = useUser()
  const [data, setData] = useState({
    key: '',
    rtmp: '',
    http: ''
  })
  const [receivers, setReceivers] = useState<Array<RCProps>>([])
  const addReceiver = (receiver: RCProps) => {
    setReceivers(r => {return [...r, {...receiver}]})
  }
  const connectReceiver = () => {
    const socketMachine = userContext.socketMachine
    socketMachine?.socket?.emit("connect_receiver", {receivers: receivers, source: data}, (response: any) => {
      //
    })
  }

  return (
    <div className={styles['home-dash']}>
      <Box className={styles['home-dash__left']}>
        <VideoPlayer data={data}/>
        <Box alignSelf="start">
          <Text fontSize="2xl" mt="12px">Title video</Text>
        </Box>
        <SourceConnector onSetData={setData} data={data} mt="20px"/>
      </Box>
      <Box className={styles['home-dash__right']}>
        {data.rtmp !== "" && <ReceiverConnector addReceiver={addReceiver}/>}
        {receivers.map(r => {
          return <ReceiverCard key={r.server} receiver={r}/>
        })}
        {receivers.length >= 1 && (
          <Button onClick={connectReceiver}>Connecter</Button>
        )}
      </Box>
    </div>
  )
}

export default HomeDash
