import { FiArrowRight, FiCheck, FiCircle, FiDivide, FiDivideCircle, FiFileText } from "react-icons/fi";

type Props = {
    IsLoading: boolean
    SelectedTab: DocumentTransactionBasicFilterType
    SelectedSubTab: NpdDocumentFilterType
    handleSubTabChange: (tabStatus: NpdDocumentFilterType) => void
}

const SubTabs = (props: Props) => {
    const { IsLoading, SelectedTab, SelectedSubTab, handleSubTabChange } = props
    return (
        <>
            {
                SelectedTab === 'panjar' || SelectedTab === 'non-panjar' ?
                    <div className="css-j923rf0-239-a">
                        <div className="steps-container w-100">
                            <div onClick={() => handleSubTabChange('pembuatan')} className={`step completed ${SelectedSubTab === 'pembuatan' ? 'css-932a-f-a02a' : ''}`}>
                                <p className="css-k-t20a-vf3a">1. Pembuatan</p>
                                <div className="completed">
                                    <FiFileText strokeWidth={2} color="#004DE5" size={20} />
                                </div>
                            </div>
                            {
                                SelectedTab === 'panjar' ?
                                    <>
                                        <div className="line next-step-in-progress"></div>
                                        <div onClick={() => handleSubTabChange('pertanggungjawaban')} className={`step completed ${SelectedSubTab === 'pertanggungjawaban' ? 'css-932a-f-a02a' : ''}`}>
                                            <div className="preloader" />
                                            <p className="css-k-t20a-vf3a">2. Proses Pertanggung Jawaban</p>
                                            <div className="completed">
                                                <FiDivide strokeWidth={2} color="#004DE5" size={20} />
                                            </div>
                                        </div>
                                    </> : null
                            }

                            <div className="line prev-step-in-progress" />
                            <div onClick={() => handleSubTabChange('selesai')} className={`step completed ${SelectedSubTab === 'selesai' ? 'css-932a-f-a02a' : ''}`}>
                                <p className="css-k-t20a-vf3a">{SelectedTab === 'panjar' ? '3. ' : '2. '}Selesai</p>
                                <div className="completed">
                                    <FiCheck strokeWidth={3} color="#004DE5" size={20} />
                                </div>
                            </div>
                        </div>
                    </div> : null
            }

        </>
    )
};
export default SubTabs;