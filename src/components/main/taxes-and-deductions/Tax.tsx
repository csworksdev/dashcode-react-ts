import Flatpickr from "react-flatpickr";
import { useState, useEffect, useReducer } from 'react';
import Textinput from "@/components/ui/Textinput";
import { Select } from "chakra-react-select";
import NominalFormat from "../NominalFormat";
import Button from "@/components/ui/Button";
import { getPajakPotonganList } from "@/api/settings/pajak-potongan";
import _ from "lodash";
import { randomString } from "@/utils/stringConverter";
import { FiInfo, FiXCircle } from "react-icons/fi";
import SidebarTooltip from "@/components/ui/SidebarTooltip";

type Props = {
    Nilai: number;
    SelectedTax: PayloadPajakPotonganType[]
    setSelectedTax: (item: PayloadPajakPotonganType[]) => void
}

const Tax = (props: Props) => {
    const { Nilai, SelectedTax, setSelectedTax } = props
    const [ResponsePajak, setResponsePajak] = useState<ReactSelectType[]>([]);

    useEffect(() => {
        handleGetPajak()
    }, [])

    const handleGetPajak = () => {
        getPajakPotonganList('pajak').then(function (res) {
            const response: ResponsePajakPotonganListType[] = res.data
            let convertPajak = []
            for (let i = 0; i < response.length; i++) {
                convertPajak.push({
                    label: response[i].nama_pajak_potongan,
                    value: response[i].id_pajak_potongan
                })
            }
            setResponsePajak(convertPajak)
        }).catch(function (error) {

        }).finally(function () {

        })

    };

    const addPajakFields = () => {
        let frontend_id = randomString(10)
        let newfield: PayloadPajakPotonganType = { tipe: 'pajak', frontend_id: frontend_id, id_pajak_potongan: 0, name: '', percent: 0, id_billing: '', tanggal_billing: '', ntpm: '', tanggal_ntmp: '', nilai: 0 }
        setSelectedTax([...SelectedTax, newfield])
    }

    const handleFormChange = (index: number, name: string, value: any) => {
        let data: any = [...SelectedTax];
        data[index][name] = value;
        data[index]['nilai'] = Nilai * (SelectedTax[index].percent / 100);
        setSelectedTax(data);
    }

    const handleNilaiChange = (index: number, value: any) => {
        let data: any[] = [...SelectedTax];
        data[index]['nilai'] = (value);
        data[index]['percent'] = (value / Nilai) * 100;
        setSelectedTax(data)
    }

    const removeField = (frontend_id: string) => {
        let mockDeductions = SelectedTax
        let result = _.filter(mockDeductions, function (o) { return o.frontend_id !== frontend_id });
        setSelectedTax(result)
    };

    return (
        <>
            <div className="grid grid-cols-12 gap-10">
                {
                    SelectedTax && SelectedTax.map((item: any, index: number) => {
                        return (
                            <div className="col-span-12">
                                <div key={index} className="grid grid-cols-12 mt-5 gap-5 border p-2" style={{ borderRadius: 5 }}>
                                    <div className="col-span-12">
                                        <div className="css-mia--wj2wa_c-af">
                                            <span className="css-nc-n-_a92-cf badge badge-danger">Pajak {index + 1}</span>
                                            <FiXCircle size={25} onClick={() => removeField(item.frontend_id)} className="cursor-pointer" color="#FF2E63" />
                                        </div>
                                    </div>
                                    <div className="col-span-9">
                                        <label htmlFor="" className="block capitalize form-label">Jenis Pajak</label>
                                        <Select
                                            options={ResponsePajak}
                                            menuPlacement="top"
                                            value={{ label: item.name, value: item.id_pajak_potongan }}
                                            defaultValue={{ label: SelectedTax[index] != null ? SelectedTax[index].name : null, value: SelectedTax[index] != null ? SelectedTax[index].id_pajak_potongan : null }}
                                            placeholder="Pilih potongan disini ..."
                                            onChange={(e: any) => {
                                                handleFormChange(index, 'id_pajak_potongan', Number(e.value))
                                                handleFormChange(index, 'name', e.label)
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <label htmlFor="" className="block capitalize form-label">Presentase</label>
                                        {
                                            SelectedTax[index].id_pajak_potongan !== null && SelectedTax[index].id_pajak_potongan !== 0 ?
                                                <input className="form-control py-3" value={item.percent} type="number" defaultValue={SelectedTax[index] != null ? SelectedTax[index].percent : 0} onChange={(e: any) => {
                                                    let input = e.target.value;
                                                    if (!isNaN(input)) {
                                                        input = parseFloat(input);
                                                        if (input >= 0 && input <= 100) {
                                                            handleFormChange(index, 'percent', input)
                                                        }
                                                    }
                                                }} placeholder={'%'} /> :
                                                <input className="form-control py-3 disabled" disabled value={0} type="number" placeholder={'%'} />
                                        }
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="" className="block capitalize form-label">
                                            <div className="css-w0cn-2q-av-1a">
                                                <p>ID Billing</p>
                                                <SidebarTooltip
                                                    title={
                                                        <FiInfo />
                                                    }
                                                    className=""
                                                    content={<>
                                                        <p>Kode identifikasi yang diterbitkan melalui sistem e–Billing atas suatu jenis pembayaran atau setoran yang dilakukan oleh Wajib Pajak</p>
                                                    </>}
                                                    placement="top"
                                                    arrow
                                                />
                                            </div>
                                        </label>
                                        <Textinput className={'py-3'} defaultValue={SelectedTax[index] != null ? SelectedTax[index].id_billing : null} onChange={(e: any) => {
                                            handleFormChange(index, 'id_billing', e.target.value)
                                        }} placeholder={''} />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="" className="block capitalize form-label">Tanggal Billing</label>
                                        <Flatpickr
                                            data-enable-time={false}
                                            className='css-nc-c_DatePicker-C_a'
                                            placeholder='Pilih tanggal disini'
                                            defaultValue={SelectedTax[index] != null ? SelectedTax[index].tanggal_billing : ''}
                                            onChange={([date]) => {
                                                const originalDate = new Date(date);
                                                const year = originalDate.getFullYear();
                                                const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
                                                const day = originalDate.getDate().toString().padStart(2, '0');
                                                const supportDate = year + '-' + month + '-' + day
                                                // onChange(supportDate)
                                                handleFormChange(index, 'tanggal_billing', supportDate)
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="" className="block capitalize form-label">
                                            <div className="css-w0cn-2q-av-1a">
                                                <p>NTPN</p>
                                                <SidebarTooltip
                                                    title={
                                                        <FiInfo />
                                                    }
                                                    className=""
                                                    content={<>
                                                        <p>Nomor Transaksi Penerimaan Negara (NTPN) adalah nomor bukti transaksi penerimaan yang diterbitkan melalui Modul Penerimaan Negara</p>
                                                    </>}
                                                    placement="top"
                                                    arrow
                                                />
                                            </div>
                                        </label>
                                        <Textinput className={'py-3'} defaultValue={SelectedTax[index] != null ? SelectedTax[index].percent : null} onChange={(e: any) => {
                                            handleFormChange(index, 'ntpm', e.target.value)
                                        }} placeholder={''} />
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="" className="block capitalize form-label">Tanggal NTPN</label>
                                        <Flatpickr
                                            data-enable-time={false}
                                            className='css-nc-c_DatePicker-C_a'
                                            placeholder='Pilih tanggal disini'
                                            defaultValue={SelectedTax[index] != null ? SelectedTax[index].tanggal_ntmp : ''}
                                            onChange={([date]) => {
                                                const originalDate = new Date(date);
                                                const year = originalDate.getFullYear();
                                                const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
                                                const day = originalDate.getDate().toString().padStart(2, '0');
                                                const supportDate = year + '-' + month + '-' + day
                                                // onChange(supportDate)
                                                handleFormChange(index, 'tanggal_ntmp', supportDate)
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <div className="">
                                            {
                                                SelectedTax[index].id_pajak_potongan !== null && SelectedTax[index].id_pajak_potongan !== 0 ?
                                                    <>
                                                        <label htmlFor="" className="block capitalize form-label">Nilai</label>
                                                        <NominalFormat onValueChange={(e) => {
                                                            handleNilaiChange(index, Number(e.floatValue))
                                                        }} max={Nilai} value={item.nilai} prefix="Rp" displayType="input" className="form-control py-3" />
                                                        <p className="font-8 mt-2">Nilai diatas merupakan {String(item.percent) + '%'} dari <NominalFormat value={Nilai} prefix="Rp" displayType="text" className="-" /> (anggaran yang akan dikeluarkan) </p>
                                                    </> :
                                                    null
                                            }
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        {
                                            item.nilai > Nilai ?
                                                <div className="alert-light-danger css-mdno-an-e9-2n-a9ca">
                                                    <FiInfo style={{ width: 25 }} size={20} color="#FF2E63" />
                                                    <div>
                                                        <p className="font-12 text-danger font-semibold">Melebihi anggaran yang ingin dikeluarkan</p>
                                                        <p className="font-8 mt-1">Pajak ini melebihi anggaran yang telah Anda tentukan. Anda dapat menurunkan nilai pajak atau Anda dapat menambah jumlah anggaran yang ingin dikeluarkan</p>
                                                    </div>
                                                </div>
                                                : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Button className="btn btn-light btn-sm w-100 mt-4" onClick={() => addPajakFields()}>Tambah Pajak Lainnya</Button>
        </>
    )
};
export default Tax;