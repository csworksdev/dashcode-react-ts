import useProfile from "@/hooks/useProfile";
import TransactionTabs from "../tabs/TransactionTabs";

type Props = {
    IsLoading: boolean
    SelectedTab: any
    handleTabChange: (tabStatus: any, type: any) => void
}

const DefaultTabs = (props: Props) => {
    const { IsLoading, SelectedTab, handleTabChange } = props
    const [Profile] = useProfile();

    return (
        <>
            <TransactionTabs
                ActiveTab={'data-npd'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/waiting.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'data-npd'}
                title={`Data NPD`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'data-npd-selesai'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/shield.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'data-npd-selesai'}
                title={`Data NPD Selesai`}
                action={handleTabChange}
            />
        </>
    )
};
export default DefaultTabs;