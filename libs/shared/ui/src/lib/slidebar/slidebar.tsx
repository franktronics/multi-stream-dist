import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Flex, Text } from '@chakra-ui/react';
import styles from './slidebar.module.scss';
import { AiOutlineHome, AiOutlineHistory, AiOutlineLineChart, AiOutlineBulb, AiOutlineWifi } from "react-icons/ai"
import { Ellipse } from '@multi-stream/shared/ui';
import { useDashboard } from 'apps/multi-stream/context/dashboard.context';

/* eslint-disable-next-line */
export interface SlidebarProps {
  className?: string,
  [key: string]: any
}

export type SlidebarOptions = Array<{
  id: string,
  section: string,
  children: Array<{
    id: string,
    childName: string,
    icon: JSX.Element,
    subChildren?: Array<{
      id: string,
      subChildrenName: string
    }>
  }>
}>

export function Slidebar(props: SlidebarProps) {
  const {className, ...rest} = props
  const dashBoardContext = useDashboard()

  const SlidebarOptions: SlidebarOptions = [
    {
      id: "sec1",
      section: "General",
      children: [
        {
          id: "child1",
          childName: "Aperçu",
          icon: <AiOutlineBulb size={20}/>
        },
        {
          id: "child2",
          childName: "Stream",
          icon: <AiOutlineWifi size={20}/>,
          subChildren: [
            {id: "sub1", subChildrenName: "Youtube"},
            {id: "sub2", subChildrenName: "Facebook"}
          ]
        }
      ]
    },
    {
      id: "sec2",
      section: "Dashboards",
      children: [
        {
          id: "child1",
          childName: "Home",
          icon: <AiOutlineHome size={20}/>
        },
        {
          id: "child2",
          childName: "Historique",
          icon: <AiOutlineHistory size={20}/>
        },
        {
          id: "child3",
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
          return <Box mb="28px" key={sec.id}>
            <Box>
              <Text color="black.40" fontSize={14} pb="8px">{sec.section}</Text>
            </Box>
            <Accordion allowMultiple>
              {sec.children.map((child) => {
                return <AccordionItem key={sec.id + child.id} border="none">
                    <h2 key={'title' + sec.id + child.id}>
                      <AccordionButton
                        _hover={{bg: "black.5"}}
                        paddingInline={"10px 5px"}
                        marginBlock="5px"
                        borderRadius="md"
                        bg={dashBoardContext.state === `${sec.id}.${child.id}`? "black.5": ""}
                        onClick={() => !child.subChildren && dashBoardContext.setState(`${sec.id}.${child.id}`)}
                      >
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
                          return <Box
                              key={sec.id + child.id + sub.id}
                              paddingBlock={"5px"}
                              marginBottom={"5px"}
                              _hover={{bg: "black.5"}}
                              cursor="pointer"
                              borderRadius="md"
                              padding={"5px 20px"}
                              bg={dashBoardContext.state === `${sec.id}.${child.id}.${sub.id}`? "black.5": ""}
                              onClick={() => dashBoardContext.setState(`${sec.id}.${child.id}.${sub.id}`)}
                            >
                              {sub.subChildrenName}
                            </Box>
                        })}
                      </AccordionPanel>
                    )}
                </AccordionItem>
              })}
            </Accordion>
          </Box>
        })}
      </Box>
    </Box>
  )
}

export default Slidebar;
