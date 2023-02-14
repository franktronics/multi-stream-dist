import { AspectRatio, Box } from '@chakra-ui/react';
import BounceLoader from "react-spinners/BounceLoader"
import ReactPlayer from 'react-player'

/* eslint-disable-next-line */
export interface VideoPlayerProps {
  data: {rtmp: string, http: string, key: string},
  streamId: string
}

export function VideoPlayer(props: VideoPlayerProps) {
  const { data, streamId } = props

  return (
    <AspectRatio bg="light" borderRadius="md" w="80%" ratio={16 / 9} boxShadow="base">
      <Box>
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
