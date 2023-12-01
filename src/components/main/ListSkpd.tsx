import { getPendapatanList } from '@/api/penatausahaan/dpa/penerimaan/Pendapatan';
import { HeaderInfoDpaType } from '@/pages/penatausahaan/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import NoDataFound from '../NoDataFound';
import TableShimmer from '../skeleton/TableShimmer';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import NominalFormat from './NominalFormat';
import { FiFileText, FiTrendingUp } from 'react-icons/fi';
import PaginationCustom from '../ui/PaginationCustom';
import { setCookie, setCookieArray } from '@/utils/cookie';
import { getSkpd } from '@/api/settings/skpd';
import useProfile from '@/hooks/useProfile';
import ScrollableTable from './tables/ScrollableTable';
import InputGroup from '../ui/InputGroup';
import { Icon } from '@iconify/react';
import PaginationFrontend from '../ui/PaginationFrontend';

type Props = {
    SkpdTableView?: SkpdTableViewList
    DetailLinkTo: string
    IsLoading: boolean
    setHeaderInfo: (data: HeaderInfoDpaType) => void
    setIsLoading: (loading: boolean) => void
}

const ListSkpd = (props: Props) => {
    const { setHeaderInfo, setIsLoading, IsLoading, DetailLinkTo, SkpdTableView = {
        anggaran: true,
        rak: true,
        status: true,
    } } = props
    const [SkpdListResponse, setSkpdResponse] = useState<SkpdResponseList[]>();
    const navigate = useNavigate();
    const [PerPage, setPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [TotalPage, setTotalPage] = useState<number>(0);
    const [FilteredData, setFilteredData] = useState<SkpdResponseList[]>();
    const [Profile] = useProfile();

    const handleGetList = () => {
        setIsLoading(true)
        getSkpd(Profile.id_daerah, Profile.tahun).then(function (res: any) {
            const response = res.data
            setTotalPage(Math.ceil(response.length / PerPage))

            const locked = response.reduce((count: number, obj: any) => {
                if (obj.status === 1) {
                    return count + 1;
                } else {
                    return count;
                }
            }, 0);

            const unlocked = response.reduce((count: number, obj: any) => {
                if (obj.status === 0) {
                    return count + 1;
                } else {
                    return count;
                }
            }, 0);

            setHeaderInfo({
                akumulasi_anggaran: response.reduce((accumulator: any, object: SkpdResponseList) => {
                    return accumulator + object.nilai
                }, 0),
                akumulasi_rak: response.reduce((accumulator: any, object: SkpdResponseList) => {
                    return accumulator + object.nilai_rak
                }, 0),
                total_skpd: response.length,
                locked: locked,
                unlocked: unlocked,
            })
            setFilteredData(response)
            setSkpdResponse(response)
        }).catch(function () {
            toast.error('Oops!.. Gagal memproses daftar SKPD')
        }).finally(function () {
            setIsLoading(false)
        })
    };

    useEffect(() => {
        if (Profile != null) {
            handleGetList()
        }
    }, [Profile])

    const handleNavigation = (item: any, link: string) => {
        setCookieArray('X-SIPD-SKPD-INFO', item, 1)
        navigate(link);
    };

    const handleSearchValue = (value: string) => {
        if (SkpdListResponse == null) {
            return
        }

        const filtered = SkpdListResponse.filter((item: SkpdResponseList) =>
            item.nama_skpd.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredData(filtered);
    };

    return (
        <>
            <div className="col-span-5">
                <InputGroup
                    id="search-access-control"
                    type="text"
                    onChange={(e: any) => handleSearchValue(e.target.value)}
                    placeholder="Pencarian ..."
                    prepend={<Icon icon="heroicons-outline:search" />}
                    merged
                />
            </div>
            {
                !IsLoading ?
                    FilteredData != null && FilteredData.length > 0 ?
                        <ScrollableTable>
                            <thead>
                                <tr>
                                    <th className="table-th table-thd">SKPD</th>
                                    {SkpdTableView.anggaran && <th className="table-th table-thd">Alokasi Anggaran</th>}
                                    {SkpdTableView.rak && <th className="table-th table-thd">Rencana Anggaran Kas (RAK)</th>}
                                    {SkpdTableView.status && <th className="table-th table-thd">Status</th>}
                                    <th className="table-th"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 ">
                                {
                                    FilteredData.map((item: SkpdResponseList, index: number) => {
                                        const linkDetail = DetailLinkTo + item.id_skpd
                                        return (
                                            <tr key={index} style={{ display: (index >= (currentPage - 1) * PerPage && index < currentPage * PerPage) ? 'table-row' : 'none' }}>
                                                <td className="table-td py-2" style={{ width: (!SkpdTableView.anggaran && !SkpdTableView.rak && !SkpdTableView.status) ? '100%' : 400 }}>
                                                    <div>
                                                        <span className="inline-flex items-center">
                                                            <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                                                <img src="/assets/images/aMHhm8fp7D8EO347U.min.webp" alt={item.nama_skpd} className="object-cover w-full h-full rounded-md" />
                                                            </span>
                                                            <div className="container-table-td-2-column">
                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.nama_skpd}</span>
                                                                <span className="txt-font-12 text-slate-300 dark:text-slate-300">{item.kode_skpd}</span>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </td>
                                                {
                                                    SkpdTableView.anggaran &&
                                                    <td className="table-td py-2">
                                                        <div>
                                                            <span className="inline-flex">
                                                                <div className="container-icon-table-list">
                                                                    <FiTrendingUp size={25} color="#4669fa" />
                                                                </div>
                                                                <div className="container-table-td-2-column">
                                                                    <NominalFormat className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold" displayType='text' prefix={'Rp'} value={item.nilai} />
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </td>
                                                }

                                                {
                                                    SkpdTableView.rak &&
                                                    <td className="table-td py-2">
                                                        <div>
                                                            <span className="inline-flex">
                                                                <div className="container-icon-table-list">
                                                                    <FiFileText size={25} color="#3FC1C9" />
                                                                </div>
                                                                <div className="container-table-td-2-column">
                                                                    <NominalFormat className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold" displayType='text' prefix={'Rp'} value={item.nilai_rak} />
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </td>
                                                }
                                                {
                                                    SkpdTableView.status &&
                                                    <td className="table-td py-2">
                                                        <div>
                                                            <span className="inline-flex items-center">
                                                                {
                                                                    item.status === 1 ?
                                                                        <div className="badge badge-danger css-c-awn-39a">
                                                                            <p>Terkunci</p>
                                                                        </div> :
                                                                        <div className="badge badge-light css-c-awn-39a">
                                                                            <p>Belum Dikunci</p>
                                                                        </div>
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>
                                                }

                                                <td>
                                                    <div className="container-action-button">
                                                        <div className="frontline-table-action-gap">
                                                            <div onClick={() => handleNavigation(item, linkDetail)}>
                                                                <Button className="btn btn-sm btn-primary" type="button">Detail</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </ScrollableTable>
                        : <NoDataFound />
                    : <TableShimmer />
            }
            {
                FilteredData != null ?
                    <PaginationFrontend
                        currentPage={Number(currentPage)}
                        setCurrentPage={setCurrentPage}
                        perPage={PerPage}
                        setPerPage={setPerPage}
                        data={FilteredData}
                    />
                    : null
            }
        </>
    )
};
export default ListSkpd;