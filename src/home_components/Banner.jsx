import BannerImg1 from "../assets/banner.png";
import { useNavigate } from "react-router-dom";

const Banner = () => {

  const navigate = useNavigate()

  const handleCategoryClick = () => {
    navigate("/", { state: { scrollToCategory: true } });
  };

  const handleAboutClick = () => {
    navigate("/about", { state: { scrollToCategory: true } });
  }

  return (
    <section className="w-full bg-gradient-to-r from-zinc-200 to-stone-100">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-2 py-10 lg:py-20 min-h-[550px] px-6 sm:px-10 md:px-30">

        {/* Left: Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-700 mb-4 leading-tight">
            Experience Pure Sound
          </h1>
          <p className="text-stone-600 text-base md:text-lg mb-6 max-w-xl mx-auto lg:mx-0">
            Dive into immersive audio with our latest noise-cancelling headphones. Stylish design, crystal-clear clarity, and comfort all day long.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <button onClick={handleCategoryClick} className="bg-stone-800 text-white cursor-pointer px-6 py-3 rounded hover:bg-stone-700 transition text-sm md:text-base">
              Shop Now
            </button>
            <button onClick={handleAboutClick} className="border border-stone-700 cursor-pointer px-6 py-3 rounded hover:bg-stone-200 transition text-sm md:text-base">
              Learn More
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
          <div className="w-[280px] sm:w-[320px] md:w-[400px] h-[300px] sm:h-[350px] md:h-[400px] flex items-center justify-center">
            <img
              src={BannerImg1}
              alt="Headphones Banner"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;
