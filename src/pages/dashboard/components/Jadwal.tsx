import VideoPlayer from '@/components/partials/widget/VideoPlayer';
import { IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { FiCalendar, FiClock, FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import JadwalAnimation from '@/assets/animation/animation_lnn6u8l9.json';
import { useEffect, useState } from 'react';
import { getJadwal } from '@/api/settings/jadwal';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import moment from 'moment';
import NoDataFound from '@/components/NoDataFound';
import { DateTime } from 'luxon';
registerLocale("id", id);
setDefaultLocale("id");

const Jadwal = () => {
    const [Response, setResponse] = useState<JadwalListResponseType>();
    const [IsLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        handleGetJadwal()
    }, [])

    const handleGetJadwal = () => {
        setIsLoading(true);
        getJadwal().then(function (res: any) {
            let response = res.data[0]

            var targetTime = new Date(response.waktu_mulai_jadwal);
            var currentTime = new Date();
            if (targetTime < currentTime) {
                response.is_pass = false
            } else {
                response.is_pass = true
            }
            setResponse(response);
        }).catch(function (error: any) {

        }).finally(function () {
            setIsLoading(false);
        });
    };

    return (
        <>
            {
                !IsLoading ?
                    <div className={`css-n-f-a93_cj-aj-21-d`}>
                        <div className='css-n-an-awn0aw-d-wjq2-1'>
                            <div className='css-na-wna-wj-2rdq2wd_a'>
                                <FiCalendar size={30} />
                                <p className='font-bold'>Jadwal</p>
                            </div>
                            <Menu>
                                <MenuButton variant={'ghost'} as={IconButton} icon={<FiMoreHorizontal className="w-100" size={30} />}></MenuButton>
                                <MenuList>
                                    <MenuItem as={Link} to={`/setting/jadwal`} icon={<FiMoreVertical size={17} />} command='⌘T'>
                                        <p className='text-md font-semibold'>Detail</p>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                        <div className='css-b0aw0_2j0q0a'>
                            <div>
                                <h5 className='font-bold mb-1'>
                                    {
                                        Response != null ?
                                            <CountdownTimer startTime={moment(Response.waktu_mulai_jadwal, "YYYY-MM-DD HH:mm:ss")} finishTime={moment(Response.waktu_selesai_jadwal, "YYYY-MM-DD HH:mm:ss")} locked={Response.is_locked}  is_pass={Response.is_pass} /> :
                                            'Tidak Ditemukan'
                                    }
                                </h5>
                                {
                                    Response != null ? Response.is_locked === 1 ?
                                        <span className="block font-12 mb-1 text-slate-600 dark:text-slate-300 font-semibold">
                                            Berakhir Pada {DateTime.fromISO(Response.waktu_selesai_jadwal).setLocale('id').toFormat('dd LLLL yyyy')}
                                        </span> :
                                        Response.is_pass === false ?
                                            <span className="block font-12 mb-1 text-slate-600 dark:text-slate-300 font-semibold">
                                                Jadwal Sedang Berjalan
                                            </span> :
                                            <span className="block font-12 mb-1 text-slate-600 dark:text-slate-300 font-semibold">
                                                Akan Dimulai Pada {DateTime.fromISO(Response.waktu_mulai_jadwal).setLocale('id').toFormat('dd LLLL yyyy')}
                                            </span>
                                        : <span className="block font-12 mb-1 text-slate-600 dark:text-slate-300 font-semibold">
                                            Jadwal Tidak Ditemukan
                                        </span>
                                }
                            </div>
                            <VideoPlayer loop animationData={JadwalAnimation} play style={{ width: 100, height: 100 }} />
                        </div>
                    </div> :
                    <div className="animate-pulse">
                        <div className="animate" style={{ height: 200, width: '100%', borderRadius: 7 }}></div>
                    </div>
            }

        </>
    )
};
export default Jadwal;

const CountdownTimer = ({ startTime, finishTime, locked, is_pass }: any) => {
    const [currentTime, setCurrentTime] = useState(moment());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    let duration = moment.duration(currentTime.diff(startTime));
    if (locked === 1) {
        duration = moment.duration(finishTime.diff(startTime));
    }

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    console.log('is_pass', is_pass)
    return (
        <div>
            {
                is_pass === true ?
                <p>Belum Dimulai</p> :
                Math.floor(duration.asDays()) < 0 ?
                    <p>Sudah Ditutup</p> :
                    <p>{`${days} Hari ${locked === 1 ? 'Lagi' : ''}`}</p>
            }

        </div>
    );
};