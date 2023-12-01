import React, { useEffect } from "react";
import Icon from "@/components/ui/Icon";
import { motion, useAnimationControls } from "framer-motion";
import useDarkMode from "@/hooks/useDarkMode";
import { FiMoon, FiSun } from "react-icons/fi";
import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";

const SwitchDark: React.FC = () => {
	const [isDark, setDarkMode] = useDarkMode();
	const controls = useAnimationControls()
	const { colorMode, toggleColorMode } = useColorMode()
	useEffect(() => {
		controls.start('pageInitial')
		setTimeout(() => {
			controls.start('pageAnimate')
		}, 200);
	}, [isDark])

	const handleThemeSwitch = () => {
		setDarkMode(!isDark)
		toggleColorMode()
		// if (isDark) {
		// 	useColorModeValue('Light','Dark')
		// }
	};

	return (
		<div className="css-nc-a0-2_2w-a9D-c" onClick={() => handleThemeSwitch()}>
{/* 
			<Button onClick={toggleColorMode}>
				Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
			</Button> */}

			<span className="css-n-anf-a0">
				<div className="lg:h-[22px] lg:w-[22px] dark:text-white text-slate-900 cursor-pointer rounded-full text-[22px] flex flex-col items-center justify-center">
					{isDark ?
						<motion.div
							initial="pageInitial"
							animate={controls}
							exit="pageExit"
							variants={{
								pageInitial: {
									opacity: 0,
									y: 100,
									rotate: 360,
									scale: 1
								},
								pageAnimate: {
									opacity: 1,
									y: 0,
									rotate: 0,
									scale: 1
								},
								pageExit: {
									opacity: 0,
									y: -100,
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
							<FiSun size={22} color="#4B5675" />
						</motion.div>
						:
						<motion.div
							initial="pageInitial"
							animate={controls}
							exit="pageExit"
							variants={{
								pageInitial: {
									opacity: 0,
									y: 100,
									rotate: 360,
									scale: 1
								},
								pageAnimate: {
									opacity: 1,
									y: 0,
									rotate: 0,
									scale: 1
								},
								pageExit: {
									opacity: 0,
									y: -100,
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
							<FiMoon size={22} color="#4B5675" />
						</motion.div>
					}
				</div>
			</span>
		</div>

	);
};

export default SwitchDark;