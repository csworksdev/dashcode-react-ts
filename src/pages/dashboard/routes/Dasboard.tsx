import { useEffect, useState } from 'react';
import MainCard from "@/pages/dashboard/components/MainCard";
import useBreadcumb from '@/hooks/useBreadcumb';
import { getDashboardStatistic } from '@/api/dashboard';
import { FiAperture, FiDivideCircle, FiPocket, FiShoppingBag } from 'react-icons/fi';
import { DashboardResponseType } from '../types'
import useProfile from '@/hooks/useProfile';
import { reportToDiscord } from '@/utils/Discord';
import PanduanCallToAction from '../components/PanduanCallToAction';
import KebijakanSpd from '../components/KebijakanSpd';
import Jadwal from '../components/Jadwal';
import GraphApbd from '../components/GraphApbd';
import NoDataFound from '@/components/NoDataFound';
import { ToTitleCase } from '@/utils/stringConverter';


const Dashboard = () => {
    const [, setBreadcumb] = useBreadcumb();
    const [StatisticResponse, setStatisticResponse] = useState<DashboardStatisticType[]>([
        {
            type: 0,
            id: 'pendapatan',
            title: "Pendapatan Daerah",
            count: 0,
            color: "#4669FA",
            text: "text-primary-500 text-bold",
            percent: "25.67%",
            icon: FiPocket,
            percentClass: "text-bold",
        },
        {
            type: 1,
            id: 'belanja',
            title: "Belanja Daerah",
            count: 0,
            color: "#FF2E63",
            text: "text-primary-500",
            percent: "8.67%",
            icon: FiShoppingBag,
            percentClass: "text-primary-500",
        },
        {
            type: 2,
            id: 'penerimaan-pembiayaan',
            title: "Penerimaan Pembiayaan",
            count: 0,
            color: "#2B2E4A",
            text: "text-danger-500",
            percent: "1.67%",
            icon: FiAperture,
            percentClass: "text-danger-500",
        },
        {
            type: 3,
            id: 'pengeluaran-pembiayaan',
            title: "Pengeluaran Pembiayaan",
            count: 0,
            color: "#00ADB5",
            text: "text-primary-500",
            percent: "11.67%",
            icon: FiDivideCircle,
            percentClass: "text-primary-500",
        },
    ]);
    const [Profile] = useProfile();
    const [IsLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const breadcumb: BreadcumbType[] = [
            {
                title: 'Dashboard',
                link: '#!'
            }
        ]
        setBreadcumb(breadcumb)
        reportToDiscord("Dashboard", {})
    }, [])

    useEffect(() => {
        handleGetStatistic()
    }, [])

    const handleGetStatistic = () => {
        setIsLoading(true)
        const statistics: DashboardStatisticType[] = StatisticResponse

        getDashboardStatistic().then(function (res: any) {
            const response: DashboardResponseType = res.data
            statistics[0].count = response.pendapatan
            statistics[1].count = response.belanja
            statistics[2].count = response.penerimaan
            statistics[3].count = response.pengeluaran
            setStatisticResponse(statistics)
        }).finally(function () {
            setIsLoading(false)
        })
    };

    const useProvinsiLavel = [0, 6, 9, 11, 12, 16]
    let foundItem = useProvinsiLavel.some(assignedArray => assignedArray === Profile?.id_role)

    return (
        <div>
            <div className="space-y-5">
                <div className="grid grid-cols-12 gap-5">
                    <div className="lg:col-span-12 col-span-12 space-y-5 mb-5">
                        <p className='dsahboard-main-text'>Ringkasan APBD {(foundItem ? ToTitleCase(Profile?.nama_daerah || '-') : ToTitleCase(Profile?.nama_skpd || '-'))}</p>
                        <div className="grid xl:grid-cols-4 lg:grid-cols-2 col-span-1 gap-3">
                            {
                                !IsLoading ?
                                    StatisticResponse != null && StatisticResponse.length > 0 ?
                                        <MainCard statistic={StatisticResponse} /> : <NoDataFound /> :
                                    [1, 2, 3, 4].map(() => {
                                        return (
                                            <div className="animate-pulse">
                                                <div className="animate" style={{ height: 200, width: '100%', borderRadius: 7 }}></div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                    <div className="lg:col-span-8 col-span-12 space-y-5 mb-5">
                        {
                            !IsLoading ?
                                StatisticResponse != null && StatisticResponse.length > 0 ?
                                    <GraphApbd data={StatisticResponse} /> :
                                    <div className='border' style={{ height: 425 }}>
                                        <NoDataFound />
                                    </div>
                                :
                                <div className="animate-pulse">
                                    <div className="animate" style={{ height: 425, width: '100%', borderRadius: 7 }}></div>
                                </div>
                        }
                    </div>
                    <div className="lg:col-span-4 col-span-12 space-y-5 mb-5">
                        <Jadwal />
                        <KebijakanSpd />
                    </div>
                    <div className="lg:col-span-12 col-span-12 space-y-5 mb-5">
                        <PanduanCallToAction />
                    </div>
                    
                </div>
            </div>
        </div>
    )
};
export default Dashboard;