import { IconButton } from "@chakra-ui/button";
import { Box, Link } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function BackToTopButton() {
    const [scrollPosition, setScrollPosition] = useState(0)
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return scrollPosition > 300 ? (
        <Link href='#top'>
            <Box position='fixed'
                bottom='20px'
                right={['16px', '84px']}
                zIndex={1}
            >
                <IconButton
                    borderRadius="25px"
                    colorScheme="blackAlpha"
                    aria-label="back to top"
                    fontSize="20px"
                    icon={<IoIosArrowUp />}
                />
            </Box>
        </Link>
    ) : null
}