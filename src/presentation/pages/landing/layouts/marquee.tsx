import { motion } from "framer-motion";

const Marquee = ({ text }) => {
  return (
    <div>
        <div className="w-{120%} rotate-6 overflow-hidden whitespace-nowrap bg-light-custom-primary py-2">
            <motion.div
                className="inline-block text-white text-xl font-semibold"
                animate={{ x: ["100%", "-100%"] }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
                {text} &nbsp; {text} &nbsp; {text} &nbsp;
            </motion.div>
        </div>

        <div className="w-{120%} relative -top-10 overflow-hidden whitespace-nowrap bg-indigo-800 py-2">
            <motion.div
                className="inline-block text-white text-lg font-semibold"
                animate={{ x: ["100%", "-100%"] }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
                {text} &nbsp; {text} &nbsp; {text} &nbsp;
            </motion.div>
        </div>
    </div>
  );
};

export default Marquee;
