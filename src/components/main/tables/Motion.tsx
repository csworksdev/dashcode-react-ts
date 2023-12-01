import { motion } from "framer-motion";

type Props = {
    children: JSX.Element | JSX.Element[],
};

const Motion = ({ children }: Props) => {
    return (
        <motion.div
            initial="pageInitial"
            animate="pageAnimate"
            exit="pageExit"
            variants={{
                pageInitial: {
                    opacity: 0,
                    y: 50,
                },
                pageAnimate: {
                    opacity: 1,
                    y: 0,
                },
                pageExit: {
                    opacity: 0,
                    y: -50,
                },
            }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            {children}
        </motion.div>
    )
};
export default Motion;