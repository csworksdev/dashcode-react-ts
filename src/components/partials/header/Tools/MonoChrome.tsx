import {useEffect} from "react";
import useMonoChrome from "@/hooks/useMonoChrome";
import { FiAperture, FiLifeBuoy } from "react-icons/fi";
import { motion, useAnimationControls } from "framer-motion";

const MonoChrome: React.FC = () => {
	const [isMonoChrome, setMonoChrome] = useMonoChrome();

	const controls = useAnimationControls()

	useEffect(() => {
        controls.start('pageInitial')
        setTimeout(() => {
            controls.start('pageAnimate')
        }, 200);
    }, [isMonoChrome])

	return (
		<div className="css-nc-a0-2_2w-a9D-c" onClick={() => setMonoChrome(!isMonoChrome)}>
			<div className="dark:text-white text-slate-900 cursor-pointer rounded-full flex flex-col items-center justify-center">
				{
					isMonoChrome ?
						<motion.div
							initial="pageInitial"
							animate={controls}
							exit="pageExit"
							variants={{
								pageInitial: {
									opacity: 0,
									rotate: 360,
									scale: 1
								},
								pageAnimate: {
									opacity: 1,
									rotate: 0,
									scale: 1
								},
								pageExit: {
									opacity: 0,
									rotate: -360,
									scale: 2
								},
							}}
							transition={{
								type: "tween",
								ease: "easeInOut",
								duration: 0.5,
							}}
						>

							<FiLifeBuoy size={22} color="#4B5675" />
						</motion.div> :
						<motion.div
							initial="pageInitial"
							animate={controls}
							exit="pageExit"
							variants={{
								pageInitial: {
									opacity: 0,
									rotate: 360,
									scale: 1
								},
								pageAnimate: {
									opacity: 1,
									rotate: 0,
									scale: 1
								},
								pageExit: {
									opacity: 0,
									rotate: -360,
									scale: 2
								},
							}}
							transition={{
								type: "tween",
								ease: "easeInOut",
								duration: 0.5,
							}}
						>
							<FiAperture size={22} color="#4B5675" />
						</motion.div>
				}
			</div>
		</div>
	);
};

export default MonoChrome;