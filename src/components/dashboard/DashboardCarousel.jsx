import { Carousel } from "react-bootstrap";
import slideImage from "../../assets/images/slide-image.png";

const DashboardCarousel = () => {
  const images = [slideImage, slideImage, slideImage, slideImage];
  return (
    <section>
      <div>
        <h3 className="heading text-center mb-5">Feature for you</h3>
      </div>

      <Carousel className="mb-4" pause="hover">
        {images.map((img, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={img} alt="" />
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default DashboardCarousel;
