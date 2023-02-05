import { AspectRatio, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import BounceLoader from "react-spinners/BounceLoader"

/* eslint-disable-next-line */
export interface VideoPlayerProps {
  data: {rtmp: string, http: string, key: string}
}

export function VideoPlayer(props: VideoPlayerProps) {
  const { data } = props

  useEffect(() => {
    if(data.http !== ""){

    }
  }, [data.http])

  return (
    <AspectRatio bg="light" borderRadius="md" w="80%" ratio={16 / 9} boxShadow="base">
      <Box>
        <video id="player-stream" data-setup='{}' controls width="100%" style={{aspectRatio: "16/9"}}>
          <source src={data.http} type="video/flv"/>
        </video>
        <BounceLoader color="var(--chakra-colors-primary)"/>
      </Box>
    </AspectRatio>
  )
}

export default VideoPlayer;
