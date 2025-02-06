import { motion } from "framer-motion";

export default function AnimateElement({ fade = true, ...props }) {
    let initial = { opacity: 0 };
    let animate = { opacity: 1 };
    let transition = { duration: 0.5 };

    if (!fade) {
        initial = { x: window.innerWidth };
        animate = { x: 0 };
        transition = { delay: 0 };
    }

    return <motion.div {...props} initial={initial} animate={animate} transition={transition} />;
}
