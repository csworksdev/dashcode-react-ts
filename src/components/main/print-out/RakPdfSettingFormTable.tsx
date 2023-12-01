import Textinput from "@/components/ui/Textinput";
import { StyleItemType } from "../../../pages/penatausahaan/types";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginFileValidateSize);

type Props = {
    InjectedStyle: StyleItemType
    setInjectedStyle: (data: any) => void
}

const RakPdfSettingFormTable = (props: Props) => {
    const { InjectedStyle, setInjectedStyle } = props
    const acceptedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    const handleFileChange = (files: any) => {
        if (files != null && files.length > 0) {
            if (files[0].file.type === 'application/octet-stream') {
                return
            }

            let supportedWatermark: any[] = []
            for (let i = 0; i < files.length; i++) {
                supportedWatermark.push(files[i].file)
            }
            setInjectedStyle((prevCount: any) => ({
                ...prevCount,
                watermark: supportedWatermark,
            }))
        }
    };

    return (
        <div className="css-ncf-na-w2a">
            <p className="text-md font-bold mb-5">Pengaturan Kertas PDF</p>
            <div className="grid grid-cols-12 gap-5 mb-5">
                <div className="col-span-2">
                    <Textinput value={InjectedStyle.fontSize} defaultValue={InjectedStyle.fontSize} label={'Ukuran Font'} placeholder={'Ukuran font'} type="number"
                        onChange={(e: any) => setInjectedStyle((prevCount: StyleItemType) => ({
                            ...prevCount,
                            fontSize: Number(e.target.value),
                        }))} />
                </div>
                <div className="col-span-2">
                    <Textinput value={InjectedStyle.borderWidth} defaultValue={InjectedStyle.borderWidth} label={'Ketebalan Garis'} placeholder={'Ketebalan Garis'} type="number"
                        onChange={(e: any) => setInjectedStyle((prevCount: any) => ({
                            ...prevCount,
                            borderWidth: Number(e.target.value),
                        }))} />
                </div>
                <div className="col-span-2">
                    <Textinput value={InjectedStyle.borderColor} defaultValue={InjectedStyle.borderColor} className={'css-ca-answc-aw'} label={'Warna Garis'} placeholder={'Warna Garis'} type="color"
                        onChange={(e: any) => setInjectedStyle((prevCount: any) => ({
                            ...prevCount,
                            borderColor: e.target.value,
                        }))} />
                </div>
                <div className="col-span-2">
                    <Textinput value={InjectedStyle.fontColor} defaultValue={InjectedStyle.fontColor} className={'css-ca-answc-aw'} label={'Warna Tulisan'} placeholder={'Warna Tulisan'} type="color"
                        onChange={(e: any) => setInjectedStyle((prevCount: any) => ({
                            ...prevCount,
                            fontColor: e.target.value,
                        }))} />
                </div>
                <div className="col-span-2">
                    <Textinput value={InjectedStyle.frameMargin} defaultValue={InjectedStyle.frameMargin} className={'css-ca-answc-aw'} label={'Jarak Frame'} placeholder={'Jarak Frame'} type="number"
                        onChange={(e: any) => setInjectedStyle((prevCount: any) => ({
                            ...prevCount,
                            frameMargin: Number(e.target.value),
                        }))} />
                </div>
                <div className="col-span-2">
                    <Textinput value={InjectedStyle.columnPadding} defaultValue={InjectedStyle.columnPadding} className={'css-ca-answc-aw'} label={'Jarak Kolom'} placeholder={'Jarak Kolom'} type="number"
                        onChange={(e: any) => setInjectedStyle((prevCount: any) => ({
                            ...prevCount,
                            columnPadding: Number(e.target.value),
                        }))} />
                </div>
                <div className="col-span-3">
                    <label className="block capitalize form-label">Font</label>
                    <select onChange={(e: any) => setInjectedStyle((prevCount: any) => ({
                        ...prevCount,
                        fontFamily: e.target.value,
                    }))}
                        className="form-control py-2 css-ca-answc-aw" name="" id="">
                        <option value="Inter, sans-serif">Inter, Sans-Serif</option>
                        <option value='"Times New Roman", Times, serif'>Times New Roman, Times, Serif</option>
                        <option value="Arial, Helvetica, sans-serif">Arial, Helvetica, Sans-Serif</option>
                        <option value="Calibri, sans-serif">Calibri, Sans-Serif</option>
                        <option value="'Roboto', sans-serif">Roboto, Sans-Serif</option>
                        <option value="'Ubuntu Mono', monospace;">Ubuntu Mono, Monospace</option>
                    </select>
                </div>
                <div className="col-span-3">
                    <label className="block capitalize form-label">Lebar Kolom</label>
                    <FormControl className="css-nc-na-2A_cf-1a" display='flex' alignItems='center'>
                        <FormLabel htmlFor='lebar-kolom' mb='0'>
                            <p className="font-10">Sesuaikan Konten</p>
                        </FormLabel>
                        <Switch onChange={(e: any) => setInjectedStyle((prevCount: any) => ({
                            ...prevCount,
                            columnType: e.target.checked,
                        }))} defaultChecked={InjectedStyle.columnType} id='lebar-kolom' />
                        <FormLabel ml={4} htmlFor='lebar-kolom' mb='0'>
                            <p className="font-10">Sama Rata</p>
                        </FormLabel>
                    </FormControl>
                </div>
                <div className="col-span-6">
                    <label className="block capitalize form-label">Warna Background</label>
                    <div className="css-nc-na-2A_cf-142x">
                        <Textinput value={InjectedStyle.backgroundMain} defaultValue={InjectedStyle.backgroundMain} className={'css-ca-answc-aw'} label={'Utama'} placeholder={'Utama'} type="color"
                            onChange={(e: any) => setInjectedStyle((prevCount: any) => ({
                                ...prevCount,
                                backgroundMain: e.target.value,
                            }))} />
                        <Textinput value={InjectedStyle.backgroundHighlight1} defaultValue={InjectedStyle.backgroundHighlight1} className={'css-ca-answc-aw'} label={'Highlight 1'} placeholder={'Highlight 1'} type="color"
                            onChange={(e: any) => setInjectedStyle((prevCount: any) => ({
                                ...prevCount,
                                backgroundHighlight1: e.target.value,
                            }))} />
                        <Textinput value={InjectedStyle.backgroundHighlight2} defaultValue={InjectedStyle.backgroundHighlight2} className={'css-ca-answc-aw'} label={'Highlight 2'} placeholder={'Highlight 2'} type="color"
                            onChange={(e: any) => setInjectedStyle((prevCount: any) => ({
                                ...prevCount,
                                backgroundHighlight2: e.target.value,
                            }))} />
                    </div>
                </div>
                <div className="col-span-10">
                    <label className="block capitalize form-label  ">Watermark</label>
                    <FilePond
                        allowReorder={true}
                        allowFileSizeValidation={true}
                        maxFileSize={'2MB'}
                        labelMaxFileSizeExceeded={'File terlalu besar'}
                        labelMaxFileSize={'Ukuran maksimal file yang dapat diunggah adalah 2MB'}
                        acceptedFileTypes={acceptedFileTypes}
                        onupdatefiles={fileItems => {
                            handleFileChange(fileItems)
                        }}
                        instantUpload={false}
                        labelFileTypeNotAllowed={'File Tidak Valid'}
                        labelIdle='Seret dan Lepaskan file Anda atau <span class="filepond--label-action">Pilih Disini</span>'
                    />
                    {/* <Textinput className={'css-ca-answc-aw'} label={'Watermark'} placeholder={'Warna Tulisan'} type="file" onChange={(e: any) => {
                        const fileList = e.target.files;
                        if (fileList) {
                            const files = [...fileList];
                            setInjectedStyle((prevCount: any) => ({
                                ...prevCount,
                                watermark: files,
                            }))
                        }
                    }} /> */}
                </div>
                <div className="col-span-2">
                    <Textinput value={InjectedStyle.frameMargin} defaultValue={InjectedStyle.textHeight} className={'css-ca-answc-aw'} label={'Jarak Tulisan'} placeholder={'Jarak Tulisan'} type="number"
                        onChange={(e: any) => setInjectedStyle((prevCount: any) => ({
                            ...prevCount,
                            textHeight: Number(e.target.value),
                        }))} />
                </div>
            </div>
        </div>
    )
};
export default RakPdfSettingFormTable;