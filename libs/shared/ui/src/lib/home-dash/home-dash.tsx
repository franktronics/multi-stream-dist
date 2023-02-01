import { Box, Text } from '@chakra-ui/react'
import { useState } from 'react'
import SourceConnector from '../source-connector/source-connector'
import VideoPlayer from '../video-player/video-player'
import styles from './home-dash.module.scss'

/* eslint-disable-next-line */
export interface HomeDashProps {}

export function HomeDash(props: HomeDashProps) {
  const [data, setData] = useState({
    key: '',
    rtmp: '',
    http: ''
  })

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
        right
      </Box>
    </div>
  )
}

export default HomeDash
