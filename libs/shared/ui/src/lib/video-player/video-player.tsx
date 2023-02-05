import { AspectRatio, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import BounceLoader from "react-spinners/BounceLoader"

/* eslint-disable-next-line */
export interface VideoPlayerProps {
  data: {rtmp: string, http: string, key: string}
}

export function VideoPlayer(props: VideoPlayerProps) {
  const { data } = props

  return (
    <AspectRatio bg="light" borderRadius="md" w="80%" ratio={16 / 9} boxShadow="base">
      <Box>
        <BounceLoader color="var(--chakra-colors-primary)"/>
      </Box>
    </AspectRatio>
  )
}

export default VideoPlayer;
