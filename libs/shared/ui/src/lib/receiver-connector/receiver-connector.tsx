import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import styles from './receiver-connector.module.scss';
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'

/* eslint-disable-next-line */
export interface ReceiverConnectorProps {
  addReceiver: Function
}
export type RCProps = {
  name: string,
  server: string,
  key: string
}
let RCSchema = yup.object().shape({
  name: yup.string().required("L'intituléest obligatoire"),
  server: yup.string().required("Entrez l'adresse du serveur")
})

export function ReceiverConnector(props: ReceiverConnectorProps) {
  const { addReceiver } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RCProps>({
    resolver: yupResolver(RCSchema)
  })
  const onSubmit = (data: RCProps) => {
    addReceiver(data)
    reset()
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen}>Ajouter une destination</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Information sur la destination</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mt="20px">
                <FormLabel>Intitulé</FormLabel>
                <Input type='text' {...register("name")}/>
              </FormControl>
              <FormControl mt="20px">
                <FormLabel>Serveur</FormLabel>
                <Input type='text' {...register("server")}/>
              </FormControl>
              <FormControl mt="20px">
                <FormLabel>Clé</FormLabel>
                <Input type='password' {...register("key")}/>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="cansel" mr={3} onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit">Ajouter</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ReceiverConnector;
