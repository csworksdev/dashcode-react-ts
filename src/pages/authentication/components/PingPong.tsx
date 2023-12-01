import { useEffect, useState } from 'react';
import axios from "axios";
import { CONST_SERVICE_AUTH_URL, CONST_SERVICE_MASTER_DATA_URL, CONST_SERVICE_PEGAWAI_URL, CONST_SERVICE_RBAC_URL, CONST_SERVICE_REFERENSI_URL } from "@/constant/environment";

const PingPong = () => {
    const [PingPongText, setPingPongText] = useState<string>('Ping ...');
    const [PingFinish, setPingFinish] = useState<boolean>(false);
    const [ServiceHealth, setServiceHealth] = useState<boolean[]>([
        false, false, false, false, false
    ]);
    
    const servicePath = [CONST_SERVICE_AUTH_URL, CONST_SERVICE_MASTER_DATA_URL, CONST_SERVICE_PEGAWAI_URL, CONST_SERVICE_RBAC_URL, CONST_SERVICE_REFERENSI_URL]
    function checkServiceOnline(iteration: number) {
        axios.get(servicePath[iteration]).catch((error) => {
            if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
                setPingFinish(true)
                return
            } else {
                if (iteration < servicePath.length) {
                    setServiceHealth((prevState: any) => ({
                        ...prevState,
                        [iteration]: true,
                    }));
                    setTimeout(() => {
                        checkServiceOnline(iteration + 1)
                    }, 2000);
                } else {
                    setPingFinish(true)
                }
            }
        });
    }

    useEffect(() => {
        if (!PingFinish) {
            if (PingPongText === 'Ping ...') {
                setPingPongText('Pong !..')
            } else {
                setPingPongText('Ping ...')
            }
        }
    }, [ServiceHealth])

    useEffect(() => {
        if (PingFinish) {
            let containsFalse = false
            for (const key in ServiceHealth) {
                if (ServiceHealth.hasOwnProperty(key) && ServiceHealth[key] === false) {
                    containsFalse = true;
                    break;
                }
            }

            if (!containsFalse) {
                setPingPongText('All System Online')
            } else {
                setPingPongText('System Unavailable')
            }
            console.clear()
        }

    }, [PingFinish])

    const handlePing = (iteration: number) => {
        setPingPongText('Ping ...')
        setPingFinish(false)
        checkServiceOnline(iteration)
    };

    useEffect(() => {
        setTimeout(() => {
            handlePing(0) 
        }, 1000);
    }, [])

    return (
        <div className="📦css-s-fa_o-w1r4" style={{ zIndex: 100000000 }}>
            {
                (PingPongText === 'Ping ...') ?
                    <div className="📦css-c0-va_KD-cw"></div> :
                    (PingPongText === 'Pong !..') ?
                        <div className="📦css-n-a49_i8J-d"></div> :
                        (PingPongText === 'All System Online') ?
                            <div className="📦css-0c-avD-C_d-wa3d"></div> :
                            <div className="📦css-cs-D-fm_vo-2sc"></div>
            }
            <button disabled={!PingFinish} className={`📦css-ak-w_ci-1d ${!PingFinish && 'css-ncf-an2Y-c_C'} `} onClick={() => PingFinish ? handlePing(0) : null}>{PingPongText}</button>
        </div>
    )
};
export default PingPong;