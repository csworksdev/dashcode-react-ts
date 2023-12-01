import TransactionTabs from "../tabs/TransactionTabs";

type Props = {
    CurrentType: SppPageTypes
    IsLoading: boolean
    SelectedTab: DocumentTransactionBasicFilterType
    handleTabChange: (tabStatus: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicType) => void
}

const PembuatanTabs = (props: Props) => {
    const { CurrentType, IsLoading, SelectedTab, handleTabChange } = props
    return (
        <>
            {/* <TransactionTabs
                ActiveTab={'aktif'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/copy.gif'}
                ActivePage={CurrentType.code}
                isSelected={SelectedTab === 'aktif'}
                title={`Data SPP ${CurrentType.code}`}
                action={handleTabChange}
            /> */}
            <TransactionTabs
                ActiveTab={'draft'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/waiting.gif'}
                ActivePage={CurrentType.code}
                isSelected={SelectedTab === 'draft'}
                title={`Belum Diverifikasi`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'diterima'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/shield.gif'}
                ActivePage={CurrentType.code}
                isSelected={SelectedTab === 'diterima'}
                title={`Sudah Diverifikasi`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'dihapus'}
                IsLoading={IsLoading}
                image={'/assets/images/trash.gif'}
                ActivePage={CurrentType.code}
                isSelected={SelectedTab === 'dihapus'}
                title={`Dihapus`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'ditolak'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/invalid.gif'}
                ActivePage={CurrentType.code}
                isSelected={SelectedTab === 'ditolak'}
                title={`Ditolak`}
                action={handleTabChange}
            />
        </>
    )
};
export default PembuatanTabs;