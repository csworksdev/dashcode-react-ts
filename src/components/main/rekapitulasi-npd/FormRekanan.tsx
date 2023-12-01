import { getDaftarRekanan } from "@/api/penatausahaan/daftar-rekanan";
import InputGroup from "@/components/ui/InputGroup";
import { Select } from "chakra-react-select";
import { useEffect, useState } from 'react';
import ListRekanan from "./ListRekanan";
import Button from "@/components/ui/Button";
import { FiBook, FiBriefcase, FiCommand, FiCreditCard, FiGitBranch, FiUser } from "react-icons/fi";

type Props = {
    mainIndex: number
    setPayload: (data: any) => void
}

const FormRekanan = (props: Props) => {
    const { mainIndex, setPayload } = props
    const [Response, setResponse] = useState<any[]>([]);
    const [ToogleRekananModal, setToogleRekananModal] = useState<boolean>(false);
    const [SelectedRekananModal, setSelectedRekananModal] = useState<any>();

    useEffect(() => {
        if (SelectedRekananModal != null) {
            
        }
    }, [SelectedRekananModal])

    return (
        <>
            <div className="col-span-12 mt-4">
                <label className="block capitalize form-label">Rekanan</label>
                {
                    SelectedRekananModal != null ?
                        <div className="grid grid-12 border p-3" style={{ borderRadius: 5 }}>
                            <div className="col-span-4 mt-4">
                                <div className="css-nieoa-e-na_2na">
                                    <div className="css-nicws_ajp-n1ca">
                                        <FiBriefcase size={20} />
                                    </div>
                                    <div>
                                        <p className="font-12 font-normal">Nama Perusahaan</p>
                                        <p className="text-sm font-bold">{SelectedRekananModal.nama_perusahaan}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 mt-4">
                                <div className="css-nieoa-e-na_2na">
                                    <div className="css-nicws_ajp-n1ca">
                                        <FiCreditCard size={20} />
                                    </div>
                                    <div>
                                        <p className="font-12 font-normal">NPWP</p>
                                        <p className="text-sm font-bold">{SelectedRekananModal.npwp}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 mt-4">
                                <div className="css-nieoa-e-na_2na">
                                    <div className="css-nicws_ajp-n1ca">
                                        <FiCommand size={20} />
                                    </div>
                                    <div>
                                        <p className="font-12 font-normal">Nama Bank</p>
                                        <p className="text-sm font-bold">{SelectedRekananModal.nama_bank}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 mt-10">
                                <div className="css-nieoa-e-na_2na">
                                    <div className="css-nicws_ajp-n1ca">
                                        <FiGitBranch size={20} />
                                    </div>
                                    <div>
                                        <p className="font-12 font-normal">Nama Cabang</p>
                                        <p className="text-sm font-bold">{SelectedRekananModal.cabang_bank}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 mt-10">
                                <div className="css-nieoa-e-na_2na">
                                    <div className="css-nicws_ajp-n1ca">
                                        <FiBook size={20} />
                                    </div>
                                    <div>
                                        <p className="font-12 font-normal">Nomor Rekening</p>
                                        <p className="text-sm font-bold">{SelectedRekananModal.nomor_rekening}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 mt-10">
                                <div className="css-nieoa-e-na_2na">
                                    <div className="css-nicws_ajp-n1ca">
                                        <FiUser size={20} />
                                    </div>
                                    <div>
                                        <p className="font-12 font-normal">Nama Rekening</p>
                                        <p className="text-sm font-bold">{SelectedRekananModal.nama_rekening}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 mt-7">
                                <div className="css-jc-ja_a-wfa"></div>
                            </div>
                            <Button onClick={() => setToogleRekananModal(true)} className="btn btn-light btn-sm mt-2">Ubah</Button>
                        </div> :
                        <div onClick={() => setToogleRekananModal(true)} className="css-na-awj-f9-a">
                            <p className="css-noc-E_jc-an-1a">Pilih salah satu rekanan disini ...</p>
                        </div>
                }
            </div>

            <ListRekanan
                mainIndex={mainIndex}
                setPayload={setPayload}
                ToogleModal={ToogleRekananModal}
                SelectedRekananModal={SelectedRekananModal}
                setToogleModal={setToogleRekananModal}
                setSelectedRekananModal={setSelectedRekananModal}
            />
        </>
    )
};
export default FormRekanan;