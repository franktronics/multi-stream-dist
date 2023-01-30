import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Flex, Text } from '@chakra-ui/react';
import styles from './slidebar.module.scss';
import { AiOutlineHome, AiOutlineHistory, AiOutlineLineChart, AiOutlineBulb, AiOutlineWifi } from "react-icons/ai"
import { Ellipse } from '@multi-stream/shared/ui';

/* eslint-disable-next-line */
export interface SlidebarProps {
  className?: string,
  [key: string]: any
}
export type SlidebarOptions = Array<{
  section: string,
  children: Array<{
    childName: string,
    icon: JSX.Element,
    subChildren?: Array<{subChildrenName: string}>
  }>
}>

export function Slidebar(props: SlidebarProps) {
  const {className, ...rest} = props
  const SlidebarOptions: SlidebarOptions = [
    {
      section: "General",
      children: [
        {
          childName: "Aperçu",
          icon: <AiOutlineBulb size={20}/>
        },
        {
          childName: "Stream",
          icon: <AiOutlineWifi size={20}/>,
          subChildren: [
            {subChildrenName: "test 1"},
            {subChildrenName: "test 2"}
          ]
        }
      ]
    },
    {
      section: "Dashboards",
      children: [
        {
          childName: "Home",
          icon: <AiOutlineHome size={20}/>
        },
        {
          childName: "Historique",
          icon: <AiOutlineHistory size={20}/>
        },
        {
          childName: "Statistiques",
          icon: <AiOutlineLineChart size={20}/>
        }
      ]
    }
  ]

  return (
    <Box as="aside" className={styles['slidebar'] + ` ${className || ''}`} {...rest}>
      <Flex alignItems={"center"} columnGap="8px">
        <Avatar size={"sm"} name='Dan Adrien' src='https://bit.ly/dan-abramov' />
        <Text color="black.100" fontSize={14}>Adrien</Text>
      </Flex>
      <Box mt="20px" p="6px">
        {SlidebarOptions.map((sec) => {
          return <Box mb="28px">
            <Box key={sec.section}>
              <Text color="black.40" fontSize={14} pb="8px">{sec.section}</Text>
            </Box>
            <Accordion allowToggle allowMultiple>
              {sec.children.map((child) => {
                return <>
                  <AccordionItem key={child.childName} border="none">
                    <h2>
                      <AccordionButton _hover={{bg: "black.5"}} paddingInline={"10px 5px"} marginBlock="5px" borderRadius="md">
                        {child.subChildren? <>
                          <AccordionIcon color="black.40" position="relative" left="-6px"/>
                          <Box position="relative" left="-3px" mr="5px">{child.icon}</Box>
                        </>: <>
                          <Ellipse color='var(--chakra-colors-black-40)'/>
                          <Box ml="10px" mr="10px">{child.icon}</Box>
                        </>}
                        <Box as="span" flex='1' textAlign='left'>
                          {child.childName}
                        </Box>
                      </AccordionButton>
                    </h2>
                    {child.subChildren && (
                      <AccordionPanel pb={"16px"} pt="0">
                        {child.subChildren?.map((sub) => {
                          return <>
                            <AccordionButton paddingBlock={"5px"} _hover={{bg: "black.5"}} borderRadius="md" padding={"5px 20px"}>{sub.subChildrenName}</AccordionButton>
                          </>
                        })}
                      </AccordionPanel>
                    )}
                  </AccordionItem>
                </>
              })}
            </Accordion>
          </Box>
        })}
      </Box>
    </Box>
  )
}

export default Slidebar;
