import { Box, Button, GridItem, Input, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react'
import { AiOutlineCopy } from 'react-icons/ai'
import styles from './source-connector.module.scss'
import { useUser } from "apps/multi-stream/context/user.context"
import { useState } from 'react'
import { motion } from "framer-motion"

/* eslint-disable-next-line */
export interface SourceConnectorProps {
  data: {rtmp: string, http: string, key: string},
  onSetData: Function,
  [rest: string]: any
}

export function SourceConnector(props: SourceConnectorProps) {
  const {data, onSetData, ...rest} = props
  const userContext = useUser()

  const handleClick = () => {
    const socketMachine = userContext.socketMachine
    socketMachine?.socket?.emit("get_source_params", "", (response: any) => {
      onSetData((d: any) => {return {
        ...d,
        key: response.key,
        rtmp: response.rtmp,
        http: response.http
      }})
    })
  }

  return (
    <Box className={styles['source-connector']} maxW="400px" {...rest}>
      {(data.key === '' || data.rtmp === '') && <>
        <Button onClick={handleClick} w="100%">Connecter une source</Button>
      </>}
      {data.key !== '' && data.rtmp !== '' && <motion.div
        initial={{ translateY: 10, opacity: 0}}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <Box
          h='40px'
          marginBlock="10px"
        >
          <GridItem>
            <InputGroup>
              <InputLeftAddon children='Serveur' />
              <Input
                readOnly
                borderRadius="md"
                bg="black.5"
                value={data.rtmp}
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
                readOnly
                borderRadius="md"
                bg="black.5"
                value={data.key}
                _focusVisible={{border: "1px solid", borderColor: "inherit"}}
              />
              <InputRightAddon children={<AiOutlineCopy size={25}/>} />
            </InputGroup>
          </GridItem >
        </Box>
      </motion.div>}
    </Box>
  )
}

export default SourceConnector
