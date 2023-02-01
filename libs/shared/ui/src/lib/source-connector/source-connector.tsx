import { Box, Button, GridItem, Input, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react'
import { AiOutlineCopy } from 'react-icons/ai'
import styles from './source-connector.module.scss'
import { useUser } from "apps/multi-stream/context/user.context"

/* eslint-disable-next-line */
export interface SourceConnectorProps {
  [key: string]: string
}

export function SourceConnector(props: SourceConnectorProps) {
  const {...rest} = props
  const userContext = useUser()
  const handleClick = () => {
    const socketMachine = userContext.socketMachine
    socketMachine?.socket?.emit("get_source_params", "", (response: any) => {
      console.log(response); // "bien reçu !"
    })
  }

  return (
    <Box className={styles['source-connector']} maxW="400px" {...rest}>
      <Button onClick={handleClick} w="100%">Connecter une source</Button>
      <Box
        h='40px'
        marginBlock="10px"
      >
        <GridItem>
          <InputGroup>
            <InputLeftAddon children='Serveur' />
            <Input
              borderRadius="md"
              bg="black.5"
              _focusVisible={{border: "1px solid", borderColor: "inherit"}}
            />
            <InputRightAddon children={<AiOutlineCopy size={25}/>} />
          </InputGroup>
        </GridItem >
      </Box>
      <Box
        h='40px'
        marginBlock="10px"
      >
        <GridItem>
          <InputGroup>
            <InputLeftAddon children='Cle' />
            <Input
              borderRadius="md"
              bg="black.5"
              _focusVisible={{border: "1px solid", borderColor: "inherit"}}
            />
            <InputRightAddon children={<AiOutlineCopy size={25}/>} />
          </InputGroup>
        </GridItem >
      </Box>
    </Box>
  )
}

export default SourceConnector
