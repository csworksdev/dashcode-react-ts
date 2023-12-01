import TransactionTabs from "../tabs/TransactionTabs";

type Props = {
    IsLoading: boolean
    SelectedTab: any
    handleTabChange: (tabStatus: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicType) => void
}

const DefaultTabs = (props: Props) => {
    const { IsLoading, SelectedTab, handleTabChange } = props
    return (
        <>
            <TransactionTabs
                ActiveTab={'semua'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/inheritance.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'semua'}
                title={`Data Rekening Bank`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'belum-divalidasi'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/waiting.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'belum-divalidasi'}
                title={`Belum Divalidasi`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'divalidasi'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/shield.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'divalidasi'}
                title={`Divalidasi`}
                action={handleTabChange}
            />
        </>
    )
};
export default DefaultTabs;