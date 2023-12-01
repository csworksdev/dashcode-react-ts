import { StyleItemType } from "../../../pages/penatausahaan/types";
import purify from "dompurify";

type Props = {
    injectedStyle: StyleItemType
}

const RakPdfStyleTable = (props: Props) => {
    const { injectedStyle } = props
    return (
        <>
            <style
                type="text/css"
                dangerouslySetInnerHTML={{
                    __html: purify.sanitize(
                        `
                            .real-frame-pdf {
                                padding: ${injectedStyle.frameMargin}px;
                                overflow: hidden;
                            }
                            .css-na-nawf-1 {
                                table-layout: ${injectedStyle.columnType ? 'fixed' : 'initial'};
                                width: 100%;
                            }
                            .css-na-nawf-1 td {
                                color: ${injectedStyle.fontColor} !important;
                                border: ${injectedStyle.borderWidth}px solid ${injectedStyle.borderColor} 
                            }
                            .css-na-nawf-1 th {
                                color: ${injectedStyle.fontColor} !important;
                                border: ${injectedStyle.borderWidth}px solid ${injectedStyle.borderColor} 
                            }
                            td {
                                line-height: 1.8;
                                margin: 0px !important;
                                font-weight: 500;
                                padding: ${injectedStyle.columnPadding}px !important;
                                color: ${injectedStyle.fontColor} !important; 
                                background: ${injectedStyle.backgroundMain}; 
                                font-family: ${injectedStyle.fontFamily || 'Inter, sans-serif'} !important;
                                font-size: ${injectedStyle.fontSize}px !important;
                            }
                            th {
                                line-height: 1.8;
                                margin: 0px !important;
                                font-weight: 500;
                                padding: ${injectedStyle.columnPadding}px !important;
                                color: ${injectedStyle.fontColor} !important; 
                                background: ${injectedStyle.backgroundMain}; 
                                font-family: ${injectedStyle.fontFamily || 'Inter, sans-serif'};
                                font-size: ${injectedStyle.fontSize}px !important;
                            }
                            .nominal-format-table {
                                line-height: 1.8;
                                margin: 0px !important;
                                width: 100%;
                                display: block;
                                text-align: right !important;
                                color: ${injectedStyle.fontColor} !important; 
                                font-family: ${injectedStyle.fontFamily || 'Inter, sans-serif'};
                                font-size: ${injectedStyle.fontSize}px !important;
                            }
                            .table-pdf-highlight-1 {
                                background: ${injectedStyle.backgroundHighlight1} !important; 
                                font-weight: bolder;
                            }
                            .table-pdf-highlight-2 {
                                background: ${injectedStyle.backgroundHighlight2} !important;
                                font-weight: bolder; 
                            }
                            .center-header-pdf-title-table {
                                margin-bottom: 20px;
                            }
                            .center-header-pdf-title-table .header-pdf-title-table {
                                font-weight: bolder;
                                font-size: 10px;
                            }
                            .footer-info-pdf-title-table {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-weight: bolder;
                                font-size: 10px;
                            }
                             .{
                                table-layout: fixed;
                                border-collapse: collapse;
                            }
                            .bawah {
                                border-bottom: 1px solid #000;
                            }
                            .kiri {
                                border-left: 1px solid #000;\n
                             }
                            .kanan {
                                border-right: 1px solid #000;
                            }.atas {
                                border-top: 1px solid #000;\n
                            }
                            .p-0 {
                                padding: 0;\n
                            }
                            .text-tengah {
                                text-align: center;
                            }
                            .text-kanan {
                                text-align: right;\n
                            }
                            .text-blok {
                                font-weight: bold;\n
                            }
                            .vt {
                                vertical-align: top;\n
                            }
                            .text-u {
                                text-decoration: underline;\n
                            }
                            .real-frame-pdf p {
                                color: ${injectedStyle.fontColor} !important; 
                                font-family: ${injectedStyle.fontFamily || 'Inter, sans-serif'} !important;
                                font-size: ${injectedStyle.fontSize}px !important;
                                line-height: ${injectedStyle.textHeight};
                            }
                            ol li::marker {
                                font-size: ${injectedStyle.fontSize}px !important;
                            }
                            .break-auto {
                                page-break-inside: auto;
                            }\n`)
                }}
            />
        </>
    )
};
export default RakPdfStyleTable;