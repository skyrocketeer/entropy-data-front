import CarouselComponent from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { CardImageOnly } from '~components/Card'
import type { ImageType } from '~types/common'

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        paritialVisibilityGutter: 60
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        paritialVisibilityGutter: 50
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        paritialVisibilityGutter: 30
    }
};

const Carousel = ({ imgSet }: { imgSet: ImageType[] }) => {
    return (
        <CarouselComponent
            ssr
            deviceType={"desktop"}
            itemClass="image-item"
            responsive={responsive}
        >
            {imgSet.map(image => (
                <CardImageOnly
                    key={image.name}
                    img={image}
                />
            ))
            }
        </CarouselComponent>

    )
}

export default Carousel