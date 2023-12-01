import { Controller, useForm } from "react-hook-form";
import RakModalFormIcon from "./RakModalFormIcon";

import { useState, useEffect } from 'react';
import NominalFormat from "@/components/main/NominalFormat";

type Props = {
    CanEdit: boolean;
    semesterMonth: any[];
    RakForms: any;
    handleRakFormsChange: (month: string, value: number) => void;
}

const RakFormSemesterModal = (props: Props) => {
    const { CanEdit, RakForms, semesterMonth, handleRakFormsChange } = props
    const { control } = useForm<any>();
    const [TotalSemester, setTotalSemester] = useState<any>({
        semester_1: 0,
        semester_2: 0,
    });

    useEffect(() => {
        setTotalSemester({
            semester_1: RakForms.januari + RakForms.februari + RakForms.maret + RakForms.april + RakForms.mei + RakForms.juni,
            semester_2: RakForms.juli + RakForms.agustus + RakForms.september + RakForms.oktober + RakForms.november + RakForms.desember,
        })
    }, [RakForms])

    return (
        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-6 order-last lg:order-first'>
                <div className="css-nc-jaw-c-triwulan-2c">
                    <div className="css-cj-w_fj-wa">
                        <p className='mb-3'>Semester I</p>
                        <div className="css-na-jfw-aw2-f">
                            <p className='txt-font-12 text-slate-300 dark:text-slate-300'>RAK</p>
                            <NominalFormat className='rak-font-12 text-slate-800 dark:text-slate-300 font-bold' displayType={'text'} value={TotalSemester.semester_1} prefix={'Rp'} />
                        </div>
                        <div className="css-na-jfw-aw2-f">
                            <p className='txt-font-12 text-slate-300 dark:text-slate-300'>Realisasi</p>
                            <NominalFormat className='rak-font-12 text-slate-800 dark:text-slate-300 font-bold' displayType={'text'} value={0} prefix={'Rp'} />
                        </div>
                    </div>
                    {
                        semesterMonth[0].map((item: any, index: number) => {
                            return (
                                <div className="merged mb-3" key={index}>
                                    <label htmlFor="ed_Januari" className="block capitalize form-label">{item}</label>
                                    <div className="flex items-stretch inputGroup has-prepend">
                                        <RakModalFormIcon />
                                        <div className="flex-1">
                                            <div className="relative fromGroup2">
                                                {
                                                    CanEdit ?
                                                        <Controller
                                                            name={item}
                                                            control={control}

                                                            render={({ field: { name, value } }) => (
                                                                <NominalFormat placeholder="000.000.000,00" className="input-group-control block w-full focus:outline-none py-2" prefix={'Rp'} onValueChange={(values) => {
                                                                    handleRakFormsChange(item, Number(values.value))
                                                                }} name={name} value={RakForms[item.toLowerCase()]} />
                                                            )}
                                                        /> :
                                                        <Controller
                                                            name={item}
                                                            control={control}

                                                            render={({ field: { name, value } }) => (
                                                                <NominalFormat displayType="text" placeholder="000.000.000,00" className="input-group-control block w-full focus:outline-none py-2 css-nsi-ns-_e2a" prefix={'Rp'} onValueChange={(values) => {
                                                                    handleRakFormsChange(item, Number(values.value))
                                                                }} name={name} value={RakForms[item.toLowerCase()]} />
                                                            )}
                                                        />
                                                }
                                                <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                                                    <span className="cursor-pointer text-secondary-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='col-span-6 order-last lg:order-first'>
                <div className="css-nc-jaw-c-triwulan-2c">
                    <div className="css-cj-w_fj-wa">
                        <p className='mb-3'>Semester II</p>
                        <div className="css-na-jfw-aw2-f">
                            <p className='txt-font-12 text-slate-300 dark:text-slate-300'>RAK</p>
                            <NominalFormat className='rak-font-12 text-slate-800 dark:text-slate-300 font-bold' displayType={'text'} value={TotalSemester.semester_2} prefix={'Rp'} />
                        </div>
                        <div className="css-na-jfw-aw2-f">
                            <p className='txt-font-12 text-slate-300 dark:text-slate-300'>Realisasi</p>
                            <NominalFormat className='rak-font-12 text-slate-800 dark:text-slate-300 font-bold' displayType={'text'} value={0} prefix={'Rp'} />
                        </div>
                    </div>
                    {
                        semesterMonth[1].map((item: any, index: number) => {
                            return (
                                <div className="merged mb-3" key={index}>
                                    <label htmlFor="ed_Januari" className="block capitalize form-label">{item}</label>
                                    <div className="flex items-stretch inputGroup has-prepend">
                                        <RakModalFormIcon />
                                        <div className="flex-1">
                                            <div className="relative fromGroup2">
                                                {
                                                    CanEdit ?
                                                        <Controller
                                                            name={item}
                                                            control={control}

                                                            render={({ field: { name, value } }) => (
                                                                <NominalFormat placeholder="000.000.000,00" className="input-group-control block w-full focus:outline-none py-2" prefix={'Rp'} onValueChange={(values) => {
                                                                    handleRakFormsChange(item, Number(values.value))
                                                                }} name={name} value={RakForms[item.toLowerCase()]} />
                                                            )}
                                                        /> :
                                                        <Controller
                                                            name={item}
                                                            control={control}

                                                            render={({ field: { name, value } }) => (
                                                                <NominalFormat displayType="text" placeholder="000.000.000,00" className="input-group-control block w-full focus:outline-none py-2 css-nsi-ns-_e2a" prefix={'Rp'} onValueChange={(values) => {
                                                                    handleRakFormsChange(item, Number(values.value))
                                                                }} name={name} value={RakForms[item.toLowerCase()]} />
                                                            )}
                                                        />
                                                }
                                                {/* <NominalFormat placeholder="000.000.000,00" className="input-group-control block w-full focus:outline-none py-2" prefix={'Rp'} /> */}
                                                <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                                                    <span className="cursor-pointer text-secondary-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};
export default RakFormSemesterModal;