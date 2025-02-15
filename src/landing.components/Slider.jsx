import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cls } from "../common/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const images = [
    { id: 1, image_url: "./slider/1.jpg" },
    { id: 2, image_url: "./slider/2.jpg" },
    { id: 3, image_url: "./slider/3.jpg" },
];

export default function Slider({ className = "" }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000); // Cambia cada 5s

        return () => clearInterval(interval);
    }, []);

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 50) {
            setCurrent((prev) => (prev - 1 + images.length) % images.length);
        } else if (info.offset.x < -50) {
            setCurrent((prev) => (prev + 1) % images.length);
        }
    };

    return (
        <div className={cls(" relative cursor-grab mx-auto overflow-hidden ", className)}>
            <AnimatePresence>
                <motion.img
                    key={images[current].id}
                    src={images[current].image_url}
                    className=" absolute z-0 inset-0 w-full h-full object-cover rounded-xl "
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.8 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                />
            </AnimatePresence>
            {/* Botones de navegación */}
            <DirectionButton setCurrent={setCurrent} images={images} />
            <DirectionButton right setCurrent={setCurrent} images={images} />
        </div>
    );
}

function DirectionButton({ right = false, setCurrent = () => {}, images = [] }) {
    return (
        <button
            className={cls(
                " absolute top-1/2 -translate-y-1/2 bg-gray-800 text-white flex justify-center items-center w-10 aspect-square rounded-full cursor-pointer hover:bg-gray-700 transition-colors duration-300",
                {
                    "left-2": !right,
                    "right-2": right,
                }
            )}
            onClick={() => setCurrent((prev) => (right ? (prev - 1 + images.length) % images.length : (prev + 1) % images.length))}
        >
            <FontAwesomeIcon icon={right ? faChevronRight : faChevronLeft} />
        </button>
    );
}
