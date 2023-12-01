import TransactionTabs from "../tabs/TransactionTabs";

type Props = {
    IsLoading: boolean
    SelectedTab: DocumentTransactionBasicFilterType
    handleTabChange: (tabStatus: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicType) => void
}

const PembuatanTabs = (props: Props) => {
    const { IsLoading, SelectedTab, handleTabChange } = props
    return (
        <>
            <TransactionTabs
                ActiveTab={'UP'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/copy.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'UP'}
                title={`UP`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'GU'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/document.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'GU'}
                title={`GU`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'TU'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/inheritance.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'TU'}
                title={`TU`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'LS'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/top-file.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'LS'}
                title={`LS`}
                action={handleTabChange}
            />
            {/* <TransactionTabs
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
                title={`Diverifikasi`}
                action={handleTabChange}
            /> */}
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
export default PembuatanTabs;