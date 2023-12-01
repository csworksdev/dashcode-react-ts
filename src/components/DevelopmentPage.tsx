import VideoPlayer from "./partials/widget/VideoPlayer";
import DevelopmentAnimation from '@/assets/animation/animation_lo0buoni.json';
import Button from "./ui/Button";
import { motion, useAnimationControls } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useEffect} from 'react';

const DevelopmentPage = () => {
    const navigate = useNavigate();
    const controls = useAnimationControls()
    const location = useLocation()
    
    useEffect(() => {
		controls.start('pageInitial')
		setTimeout(() => {
			controls.start('pageAnimate')
		}, 200);
	}, [])

    return (
        <div className="css-cm-na-wold_fwj-1">
            <motion.div
                initial="pageInitial"
                animate={controls}
                exit="pageExit"
                variants={{
                    pageInitial: {
                        opacity: 0,
                        y: 100,
                        scale: 1
                    },
                    pageAnimate: {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    },
                    pageExit: {
                        opacity: 0,
                        y: -100,
                        scale: 2
                    },
                }}
                transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.5,
                }}
            >
                <VideoPlayer loop animationData={DevelopmentAnimation} play style={{ width: 300, height: 300 }} />
            </motion.div>
            <motion.div
                initial="pageInitial"
                animate={controls}
                exit="pageExit"
                variants={{
                    pageInitial: {
                        opacity: 0,
                        scale: 1,
                        y: 50,
                    },
                    pageAnimate: {
                        opacity: 1,
                        y: 0,
                    },
                    pageExit: {
                        opacity: 0,
                        scale: 0,
                        y: -50,
                    },
                }}
                transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.5,
                    delay: 0.3
                }}
            >
                <h1 className="css-nf-n-E_n-1a">Oops!.. Halaman Belum Tersedia</h1>
            </motion.div>
            <motion.div
                initial="pageInitial"
                animate={controls}
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
                transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.5,
                    delay: 0.6
                }}
            >
                <p className="css-n-nwo-f_30a--1">Halaman ini sedang dalam pengembangan. Mohon tunggu beberapa saat hingga kurun waktu <br /> yang tidak dapat ditentukan. Mohon maaf atas ketidaknyamanannya</p>
            </motion.div>
            <div className="css-nife-n-_f-e1">
                <motion.div
                    initial="pageInitial"
                    animate={controls}
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
                    transition={{
                        type: "tween",
                        ease: "easeInOut",
                        duration: 0.5,
                        delay: 0.9
                    }}
                >

                    <Link to={'/dashboard'}>
                        <Button>Halaman Dashboard</Button>
                    </Link>
                </motion.div>
                <motion.div
                    initial="pageInitial"
                    animate={controls}
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
                    transition={{
                        type: "tween",
                        ease: "easeInOut",
                        duration: 0.5,
                        delay: 1.2
                    }}
                >
                    <Button onClick={() => navigate(-1)} className="btn btn-light">Kembali</Button>
                </motion.div>
            </div>
        </div>
    )
};
export default DevelopmentPage;