import heroImage from "../../assets/image copy 5.png";
import Button from "../ui/Button";

const HeroSection = () => {
  return (
    <section
      className="relative flex min-h-[600px] items-center justify-center overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay Content - Left Side */}
      <div className="z-10 flex w-full items-center px-6 py-12 lg:px-12">
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
            FIND YOUR INSPIRATION
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-black/90">
            Discover a wide range of high-quality products combining performance,
            innovation, and affordability for every tech enthusiast.
          </p>
          <Button
            size="lg"
            className="bg-black text-black hover:bg-gray-900"
          >
            Explore All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

