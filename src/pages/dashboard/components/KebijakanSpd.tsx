import VideoPlayer from '@/components/partials/widget/VideoPlayer';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FiClock, FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import KebijakanSpdAnimation from '@/assets/animation/animation_lnn8xym9.json';
import { useEffect, useState } from 'react';
import { KebijakanSpdResponse } from '@/pages/pengaturan/types';
import { getKebijakanSpd } from '@/api/settings/kebijakan-spd';
import NoDataFound from '@/components/NoDataFound';

const KebijakanSpd = () => {
    const [Response, setResponse] = useState<KebijakanSpdResponse>();
    const [IsLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        handleGetKebijakanSpd()
    }, [])

    const handleGetKebijakanSpd = () => {
        setIsLoading(true);
        getKebijakanSpd().then(function (res: any) {
            if (res != null && res.data != null && res.data.length > 0) {
                setResponse(res.data[0]);
            }
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
                                <FiClock size={30} />
                                <p className='font-bold'>Kebijakan SPD</p>
                            </div>
                            <Menu>
                                <MenuButton variant={'ghost'} as={IconButton} icon={<FiMoreHorizontal className="w-100" size={30} />}></MenuButton>
                                <MenuList>
                                    <MenuItem as={Link} to={`/setting/kebijakan-spd`} icon={<FiMoreVertical size={17} />} command='⌘T'>
                                        <p className='text-md font-semibold'>Detail</p>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                        <div className='css-b0aw0_2j0q0a'>
                            <div>
                                <h5 className='font-bold mb-1'>{Response != null ? Response.nama_periode : 'Tidak Ditemukan'}</h5>
                                <span className="block font-12 mb-1 text-slate-600 dark:text-slate-300 font-semibold">
                                    {Response != null ? Response.nama_penerbitan_spd : 'Kebijakan SPD tidak ditemukan'}
                                </span>
                            </div>
                            <VideoPlayer loop animationData={KebijakanSpdAnimation} play style={{ width: 100, height: 100 }} />
                        </div>
                    </div> :
                    <div className="animate-pulse">
                        <div className="animate" style={{ height: 200, width: '100%', borderRadius: 7 }}></div>
                    </div>
            }
        </>

    )
};
export default KebijakanSpd;