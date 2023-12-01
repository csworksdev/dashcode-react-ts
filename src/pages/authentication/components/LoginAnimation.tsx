import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import NewLogoSvg3 from "./NewLogoSvg3";

const LoginAnimation = () => {
    return (
        <>
            <div className="📦css-3f0f-c_c9J-cmJ_Dw">
                <div className="📦css--vja-v_Vk-38h_f-w">
                    <motion.div
                        initial="pageInitial"
                        animate="pageAnimate"
                        exit="pageExit"
                        className="📦css-nc-3_c-fne-1_c0-a"
                        variants={{
                            pageInitial: {
                                opacity: 0,
                                y: 50,
                                scale: 2
                            },
                            pageAnimate: {
                                opacity: 1,
                                y: 0,
                                scale: 1
                            },
                            pageExit: {
                                opacity: 0,
                                y: -50,
                                scale: 2
                            },
                        }}
                        transition={{
                            type: "tween",
                            ease: "easeInOut",
                            duration: 0.5,
                            delay: 1
                        }}
                    >
                        <span
                            className="📦css-firm-c_w4-mc_a cross"
                            style={{
                                top: "15.9193054136874361%",
                                left: "11.14583333333333%",
                                animationDelay: "-3.3s"
                            }}
                        />
                        <span
                            className="📦css-firm-c_w4-mc_a circle"
                            style={{
                                top: "71.30745658835546%",
                                left: "15.15625%",
                                animationDelay: "-1.75s"
                            }}
                        />
                        <span
                            className="📦css-firm-c_w4-mc_a circle"
                            style={{
                                top: "19.009193054136876%",
                                left: "83.90625%",
                                animationDelay: "-1.05s"
                            }}
                        />
                        <span
                            className="📦css-firm-c_w4-mc_a square"
                            style={{
                                top: "71.51174668028601%",
                                left: "83.59375%",
                                animationDelay: "-0.35s"
                            }}
                        />
                    </motion.div>
                </div>
                <div className="📦css-naf-naw-fn-1">

                    <div className="📦css-a_4f-a-cn_f-ajma">
                        <motion.div
                            initial="pageInitial"
                            animate="pageAnimate"
                            exit="pageExit"
                            className="📦css-cj3F_dj-2Ms"
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
                            }}
                        >
                            {/* <LogoSvg /> */}
                            {/* <NewLogoSvg /> */}
                            {/* <NewLogoSvg2 /> */}
                            <NewLogoSvg3 />
                            {/* <img width={170} src="/assets/images/new-logo.png" alt="" /> */}
                        </motion.div>
                        <motion.div
                            initial="pageInitial"
                            animate="pageAnimate"
                            exit="pageExit"
                            className="📦css-cj3F_dj-2Ms"
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
                            }}
                        >
                            {/* <img className="login-pages-logo-kemendagri" src={LogoKemendagri} alt="" /> */}
                        </motion.div>
                    </div>

                    <div className="📦css-vn20-fn-_c0w2-HCk-f">
                        <motion.div
                            className="📦css-cj3F_dj-2Ms"
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
                            transition={{
                                type: "tween",
                                ease: "easeInOut",
                                duration: 0.5,
                                delay: 0
                            }}
                        >
                            <div className="📦css-naf-nwa-n2-c">
                                <TypeAnimation
                                    sequence={[
                                        '',
                                        500,
                                        'Sistem',
                                    ]}
                                    wrapper="span"
                                    speed={1}
                                    cursor={false}
                                    className="📦css-f-3-fj0a-2a_vDs montserrat-700"
                                />
                                <TypeAnimation
                                    sequence={[
                                        '',
                                        500,
                                        'Informasi',
                                    ]}
                                    wrapper="span"
                                    speed={1}
                                    cursor={false}
                                    className="📦css-f-3-fj0a-2a_vDs montserrat-700"
                                />
                            </div>
                            <div className="📦css-naf-nwa-n2-c">
                                <TypeAnimation
                                    sequence={[
                                        '',
                                        500,
                                        'Pemerintahan',
                                    ]}
                                    wrapper="span"
                                    speed={1}
                                    cursor={false}
                                    className="📦css-eoj02-c-D_fka montserrat-700"
                                />
                                <TypeAnimation
                                    sequence={[
                                        '',
                                        500,
                                        'Daerah',
                                    ]}
                                    wrapper="span"
                                    speed={1}
                                    cursor={false}
                                    className="📦css-eoj02-c-D_fka montserrat-700"
                                />
                            </div>
                        </motion.div>
                    </div>
                    <motion.div
                        initial="pageInitial"
                        animate="pageAnimate"
                        className="📦css-cj3F_dj-2Ms"
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
                            delay: 0.5
                        }}
                    >
                        {/* <h6 className="📦css-f--e01-cv0v3-cma-2">Kementerian Dalam Negeri Republik Indonesia</h6> */}
                        <h6 className="📦css-f--e01-cv0v3-cma-2 montserrat-400">Republik Indonesia</h6>
                    </motion.div>
                    <div className="📦css-w9fj_9fl-af0-wf">
                        <video className="📦css-3fk0_fk-q2-ca" style={{ objectFit: 'cover' }} autoPlay muted loop>
                            <source src="/assets/video/ctxa_6.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </>
    )
};
export default LoginAnimation;