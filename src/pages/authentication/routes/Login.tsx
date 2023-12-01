import LoginForm from "../components/LoginForm";
import LoginAnimation from "../components/LoginAnimation";
import PingPong from "../components/PingPong";
import {useEffect} from 'react';
import { reportToDiscord } from "@/utils/Discord";
import FormFooter from "../components/FormFooter";

const Login = () => {
    localStorage.setItem('skin', JSON.stringify('bordered'));

    useEffect(() => {
        reportToDiscord("Open the App", {})
    }, [])

    return (
        <div className="📦css-nfA-nw-29_k0c-d">
            <PingPong />
            <div className="📦css-und-d0j_dkw-a">
                <div className="📦css-9ww_c0a-aw-1 relative z-[1] ENIGMA">
                    <div className="📦css-0-cmEz-DN_c0d">
                        <LoginAnimation />
                    </div>
                </div>
                <div className="tailwind-rollback inject right-column relative">
                    <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                        <div className="auth-box h-full flex flex-col justify-center">
                            <div className="text-left 2xl:mb-10 mb-4">
                                <h4 className="font-bold">SIPD</h4>
                                <div className="text-sm text-slate-800 dark:text-slate-300 font-normal">
                                    Mohon masukkan informasi akun Anda untuk mulai menggunakan SIPD
                                </div>
                            </div>
                            <LoginForm />
                        </div>
                        <FormFooter />
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Login;