import { Box, Text } from '@chakra-ui/react'
import { useState } from 'react'
import ReceiverConnector from '../receiver-connector/receiver-connector'
import SourceConnector from '../source-connector/source-connector'
import VideoPlayer from '../video-player/video-player'
import styles from './home-dash.module.scss'
import type { RCProps } from "@multi-stream/shared/ui"

/* eslint-disable-next-line */
export interface HomeDashProps {}

export function HomeDash(props: HomeDashProps) {
  const [data, setData] = useState({
    key: '',
    rtmp: '',
    http: ''
  })
  const [receivers, setReceivers] = useState<Array<RCProps>>([])
  const addReceiver = (receiver: RCProps) => {
    setReceivers(r => {return [...r, {...receiver}]})
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
        <ReceiverConnector addReceiver={addReceiver}/>
        {receivers.map(r => {
          return <Box key={r.server}>
            {r.name}
            {r.server}
            {r.key}
          </Box>
        })}
      </Box>
    </div>
  )
}

export default HomeDash
