import { AspectRatio, Badge, Box } from '@chakra-ui/react';
import BounceLoader from "react-spinners/BounceLoader"
import ReactPlayer from 'react-player'

/* eslint-disable-next-line */
export interface VideoPlayerProps {
  data: {rtmp: string, http: string, key: string},
  streamId: string,
  streamStatus: "ofline" | "live"
}

export function VideoPlayer(props: VideoPlayerProps) {
  const { data, streamId, streamStatus } = props

  return (
    <AspectRatio bg="light" borderRadius="md" w="80%" ratio={16 / 9} boxShadow="base">
      <Box position="relative">
      <Badge variant="solid" colorScheme='red' position="absolute" right="10px" top="10px">
        {streamStatus}
      </Badge>
        {data.http !== "" && streamId === "" && (
          <BounceLoader color="var(--chakra-colors-primary)"/>
        )}
        {data.http !== "" && streamId !== "" && (
          <ReactPlayer
            url = {data.http}
            heigh = "100%"
            width = "100%"
            playing={true}
            muted={true}
          />
        )}
      </Box>
    </AspectRatio>
  )
}

export default VideoPlayer;
