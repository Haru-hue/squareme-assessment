import { ReactNode } from "react"
import { Box, Flex } from "@chakra-ui/react"

const LayoutView = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <Flex direction="column" w="full" h="full">
            <NavBar />
            <Flex w="full" h="full" pt="20">
                <SideBar />
                <Box w="full" pl={{ md: "263px" }}>
                    {children}
                </Box>
            </Flex>
        </Flex>
    )
}

export default LayoutView