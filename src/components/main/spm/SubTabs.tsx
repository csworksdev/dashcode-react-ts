import TransactionSubTabs from "../tabs/TransactionSubTabs";

type Props = {
    IsLoading: boolean
    SelectedTab: DocumentTransactionBasicFilterType
    SelectedSubTab: DocumentTransactionBasicSubTabFilterType
    handleSubTabChange: (tabStatus: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicFilterType | DocumentTransactionBasicSubTabFilterType) => void
}

const SubTabs = (props: Props) => {
    const { IsLoading, SelectedTab, SelectedSubTab, handleSubTabChange } = props
    return (
        <>
            <TransactionSubTabs
                SelectedTab={SelectedTab}
                ActiveTab={'draft'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/waiting.gif'}
                ActivePage={''}
                isSelected={SelectedSubTab === 'draft'}
                title={SelectedTab + ` Belum Diverifikasi`}
                action={handleSubTabChange}
            />
            <TransactionSubTabs
                SelectedTab={SelectedTab}
                ActiveTab={'diterima'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/shield.gif'}
                ActivePage={''}
                isSelected={SelectedSubTab === 'diterima'}
                title={SelectedTab + ` Sudah Diverifikasi`}
                action={handleSubTabChange}
            />
        </>
    )
};
export default SubTabs;