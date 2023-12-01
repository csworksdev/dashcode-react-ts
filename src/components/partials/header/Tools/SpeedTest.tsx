import { useEffect, useState } from 'react'

type Props = {
    outputType?: string;
    pingInterval?: number;
    thresholdUnit?: string;
    threshold: number;
    imageUrl: string;
    downloadSize: number;
}

const SpeedTest = (props: Props) => {
    const { outputType, pingInterval, thresholdUnit, threshold, imageUrl, downloadSize } = props
    const [isNetworkDown, setisNetworkDown] = useState(false)
    const [Speed, setSpeed] = useState<number>(0);
    const [SpeedLevel, setSpeedLevel] = useState<'FAST' | 'LOW' | 'DOWN'>('DOWN');
    let intervalFun: any

    window.addEventListener('offline', () => setisNetworkDown(true));
    window.addEventListener('online', () => setisNetworkDown(false));

    const startCalculating = () => {
        return window.setTimeout(MeasureConnectionSpeed, pingInterval);
    }

    useEffect(() => {
        intervalFun = startCalculating()
        return () => window.clearInterval(intervalFun)
    }, [])

    const MeasureConnectionSpeed = () => {
        var startTime: any, endTime;
        var download = new Image();
        startTime = (new Date()).getTime();

        var cacheBuster = '?nnn=' + startTime;
        download.src = imageUrl + cacheBuster;

        download.onload = function (d) {
            endTime = (new Date()).getTime();
            showResults(startTime, endTime);
        }

        download.onerror = function (err: any, msg) {
            setSpeed(0)
            setSpeedLevel('DOWN')
            window.clearInterval(intervalFun)
        }
        startCalculating()
    }

    const showResults = (startTime: any, endTime: any) => {
        const duration = (endTime - startTime) / 1000;

        const bitsLoaded = downloadSize * 8;
        const speedBps: any = (bitsLoaded / duration).toFixed(2);
        const speedKbps: any = (speedBps / 1024).toFixed(2);
        const speedMbps = (speedKbps / 1024).toFixed(2);

        setNetworStatus(speedBps, speedKbps, speedMbps)
    }

    const setNetworStatus = (speedBps: any, speedKbps: any, speedMbps: any) => {
        if (thresholdUnit === 'byte') {
            if (speedBps < threshold) {
                setisNetworkDown(true)
                setSpeedLevel('LOW')
            } else {
                setisNetworkDown(false)
            }
            setSpeed(speedBps)
        }
        else if (thresholdUnit === 'kilobyte') {
            if (speedKbps < threshold) {
                setisNetworkDown(true)
                setSpeedLevel('LOW')
            } else {
                setisNetworkDown(false)
            }
            setSpeed(speedKbps)
        } else {
            if (Number(speedMbps) < threshold) {
                setisNetworkDown(true)
                setSpeedLevel('LOW')
            } else {
                setSpeedLevel('FAST')
                setisNetworkDown(false)
            }
            setSpeed(speedMbps)
        }
    }

    return (
        <div className='css-mc-_a0F-d_c9JCs'>
            {
                SpeedLevel === 'FAST' ?
                    <img src="/assets/images/internet-fast-min.webp" width={8} alt="" /> :
                    SpeedLevel === 'LOW' ?
                        <img src="/assets/images/internet-low-min.webp" width={8} alt="" /> :
                        <img src="/assets/images/internet-down-min.webp" width={8} alt="" />
            }
            <p className={`css-cHC8_d-j8D-da9_ca ${SpeedLevel.toLowerCase()}`}>
                {Speed} <span className='css-j0fq_c-2j-1c'>ms</span>
            </p>
        </div>
    )
}
export default SpeedTest;