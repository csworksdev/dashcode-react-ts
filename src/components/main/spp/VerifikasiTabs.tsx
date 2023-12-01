import TransactionTabs from "../tabs/TransactionTabs";

type Props = {
    IsLoading: boolean
    SelectedTab: DocumentTransactionBasicFilterType
    handleTabChange: (tabStatus: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicType) => void
}

const VerifikasiTabs = (props: Props) => {
    const {IsLoading, SelectedTab, handleTabChange} = props
    return (
        <>
            <TransactionTabs
                ActiveTab={'draft'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/waiting.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'draft'}
                title={`Belum Diverifikasi`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'diterima'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/shield.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'diterima'}
                title={`Sudah Diverifikasi`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'dihapus'}
                IsLoading={IsLoading}
                image={'/assets/images/trash.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'dihapus'}
                title={`Dihapus`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'ditolak'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/invalid.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'ditolak'}
                title={`Ditolak`}
                action={handleTabChange}
            />
        </>
    )
};
export default VerifikasiTabs;