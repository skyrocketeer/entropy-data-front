import { IconButton } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { IoCreate } from 'react-icons/io5'
import NextLink from "next/link";

export default function FloatingButton() {
    return (
        <NextLink href='/reviews/new'>
            <Box position='fixed'
                bottom='50px'
                right={['16px', '20px']}
                zIndex={1}
            >
                <IconButton
                    borderRadius="50px"
                    colorScheme="teal"
                    h="60px"
                    w="60px"
                    aria-label="Call Sage"
                    fontSize="26px"
                    icon={<IoCreate />}
                />
            </Box>
        </NextLink>
    )
}