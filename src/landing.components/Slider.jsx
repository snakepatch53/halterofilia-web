import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Slider() {
    const speed = 1000;
    const delay = 5000;
    const images = [
        { id: 1, image_url: "./slider/1.jpg" },
        { id: 2, image_url: "./slider/2.jpg" },
        { id: 3, image_url: "./slider/3.jpg" },
    ];
    return (
        <div className=" relative w-full h-[calc(100vh-var(--header-height))] ">
            <Swiper
                className="w-full h-full "
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay }}
                speed={speed}
                spaceBetween={0}
                slidesPerView={1}
                // onSlideChange={() => console.log("slide change")}
                // onSwiper={(swiper) => console.log(swiper)}
            >
                {images.map(({ id, image_url }) => (
                    <SwiperSlide key={id} className="w-full h-full">
                        <img src={image_url} className="w-full h-full object-cover" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className=" absolute z-10 inset-0 flex flex-col items-center justify-center w-full max-w-96 aspect-video p-10 m-auto bg-black/50 rounded-md backdrop-blur-sm ">
                <img className=" w-full aspect-video object-contain mb-2 " src="./logo.png" alt="Logo de Ideasoft" />
                <h2 className=" text-4xl font-custom1 text-[--c1] leading-6 uppercase ">Ideasoft</h2>
                <h3 className=" text-2xl font-custom1 text-[--c3] leading-6 uppercase ">Halterofilia</h3>
                <Link to="/about" className=" mt-2 px-4 py-2 text-lg font-custom1 text-[--c1] bg-black/60 rounded-md hover:bg-[--c2] transition-all ">
                    Competición actual
                </Link>
            </div>
        </div>
    );
}
