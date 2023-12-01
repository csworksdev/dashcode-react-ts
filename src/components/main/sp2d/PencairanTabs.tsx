import TransactionTabs from "../tabs/TransactionTabs";

type Props = {
    IsLoading: boolean
    SelectedTab: DocumentTransactionBasicFilterType
    handleTabChange: (tabStatus: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicType) => void
}

const PencairanTabs = (props: Props) => {
    const { IsLoading, SelectedTab, handleTabChange } = props
    return (
        <>
            <TransactionTabs
                ActiveTab={'diterima'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/waiting.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'diterima'}
                title={`Belum Ditransfer`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'ditransfer'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/shield.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'ditransfer'}
                title={`Sudah Ditransfer`}
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
export default PencairanTabs;