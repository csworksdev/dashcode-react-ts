import Button from "@/components/ui/Button";
import { Select } from "chakra-react-select";
import { useState, useEffect } from 'react';
import NominalFormat from "@/components/main/NominalFormat";
import { getPajakPotonganList } from "@/api/settings/pajak-potongan";
import _ from "lodash";
import { randomString } from "@/utils/stringConverter";
import { FiInfo, FiXCircle } from "react-icons/fi";

type Props = {
    Nilai: number;
    SelectedDeductions: PayloadPajakPotonganType[]
    setSelectedDeductions: (item: PayloadPajakPotonganType[]) => void
}

const Deductions = (props: Props) => {
    const { Nilai, SelectedDeductions, setSelectedDeductions } = props
    const [ResponsePotongan, setResponsePotongan] = useState<ReactSelectType[]>([]);

    useEffect(() => {
        handleGetPotongan()
    }, [])

    const handleGetPotongan = () => {
        getPajakPotonganList('potongan').then(function (res) {
            const response: ResponsePajakPotonganListType[] = res.data
            let convertPotongan = []
            for (let i = 0; i < response.length; i++) {
                convertPotongan.push({
                    label: response[i].nama_pajak_potongan,
                    value: response[i].id_pajak_potongan
                })
            }
            setResponsePotongan(convertPotongan)
        }).catch(function (error) {

        }).finally(function () {

        })
    };

    const handleFormChange = (index: number, name: string, value: any) => {
        let data: any[] = [...SelectedDeductions];
        data[index][name] = value;
        data[index]['nilai'] = (Nilai * (SelectedDeductions[index].percent / 100)).toFixed(2);
        setSelectedDeductions(data)
    }

    const handleNilaiChange = (index: number, value: any) => {
        let data: any[] = [...SelectedDeductions];
        data[index]['nilai'] = (value);
        data[index]['percent'] = (value / Nilai) * 100;
        setSelectedDeductions(data)
    }

    const addFields = () => {
        let frontend_id = randomString(10)
        let newfield: PayloadPajakPotonganType = { tipe: 'potongan', frontend_id: frontend_id, id_pajak_potongan: 0, name: '', percent: 0, id_billing: '', tanggal_billing: '', ntpm: '', tanggal_ntmp: '', nilai: 0 }
        setSelectedDeductions([...SelectedDeductions, newfield])
    }

    const removeField = (frontend_id: string) => {
        let mockDeductions = SelectedDeductions
        let result = _.filter(mockDeductions, function (o) { return o.frontend_id !== frontend_id });
        setSelectedDeductions(result)
    };

    return (
        <>
            <div className="grid grid-cols-12">
                {
                    SelectedDeductions && SelectedDeductions.map((item: any, index: number) => {
                        return (
                            <div className="col-span-12">
                                <div key={index} className={`grid grid-cols-12 mt-5 gap-5 ${item.nilai > Nilai ? 'border-light-danger' : 'border'} p-2`} style={{ borderRadius: 5 }}>
                                    <div className="col-span-12">
                                        <div className="css-mia--wj2wa_c-af">
                                            <span className="css-nc-n-_a92-cf badge badge-orange">Potongan {index + 1}</span>
                                            <FiXCircle size={25} onClick={() => removeField(item.frontend_id)} className="cursor-pointer" color="#FF2E63" />
                                        </div>
                                    </div>
                                    <div className="col-span-9">
                                        <label htmlFor="" className="block capitalize form-label">Jenis Potongan</label>
                                        <Select
                                            options={ResponsePotongan}
                                            menuPlacement="top"
                                            defaultValue={{ label: SelectedDeductions[index] != null ? SelectedDeductions[index].name : null, value: SelectedDeductions[index] != null ? SelectedDeductions[index].id_pajak_potongan : null }}
                                            placeholder="Pilih potongan disini ..."
                                            value={{ label: item.name, value: item.id_pajak_potongan }}
                                            onChange={(e: any) => {
                                                handleFormChange(index, 'id_pajak_potongan', e.value)
                                                handleFormChange(index, 'name', e.label)
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <label htmlFor="" className="block capitalize form-label">Presentase</label>
                                        {
                                            SelectedDeductions[index].id_pajak_potongan !== null && SelectedDeductions[index].id_pajak_potongan !== 0 ?
                                                <input className="form-control p-2" value={item.percent} type="number" defaultValue={SelectedDeductions[index] != null ? SelectedDeductions[index].percent : 0} onChange={(e: any) => {
                                                    let input = e.target.value;
                                                    if (!isNaN(input)) {
                                                        input = parseFloat(input);
                                                        if (input >= 0 && input <= 100) {
                                                            handleFormChange(index, 'percent', input)
                                                        }
                                                    }
                                                }} placeholder={'%'} /> :
                                                <input className="form-control p-2 disabled" disabled value={0} type="number" placeholder={'%'} />
                                        }
                                    </div>
                                    <div className="col-span-12">
                                        <div className="">
                                            {
                                                SelectedDeductions[index].id_pajak_potongan !== null && SelectedDeductions[index].id_pajak_potongan !== 0 ?
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
                                                        <p className="font-8 mt-1">Potongan ini melebihi anggaran yang telah Anda tentukan. Anda dapat menurunkan nilai potongan atau Anda dapat menambah jumlah anggaran yang ingin dikeluarkan</p>
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
            <Button className="btn btn-light w-100 btn-sm mt-4" onClick={() => addFields()}>Tambah Potongan Lainnya</Button>
        </>
    )
};
export default Deductions;