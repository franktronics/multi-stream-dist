import { AspectRatio, Box } from '@chakra-ui/react';
import BounceLoader from "react-spinners/BounceLoader"

/* eslint-disable-next-line */
export interface VideoPlayerProps {}

export function VideoPlayer(props: VideoPlayerProps) {
  return (
    <AspectRatio bg="light" borderRadius="md" w="80%" ratio={16 / 9} boxShadow="base">
      <Box>
        <BounceLoader color="var(--chakra-colors-primary)"/>
      </Box>
    </AspectRatio>
  )
}

export default VideoPlayer;
