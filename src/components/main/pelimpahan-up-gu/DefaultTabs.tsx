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
                ActiveTab={'pelimpahan-bp'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/waiting.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'pelimpahan-bp'}
                title={`Pelimpahan SP2D UP BP`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'pelimpahan-bpp'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/shield.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'pelimpahan-bpp'}
                title={`Data Pelimpahan ke BPP`}
                action={handleTabChange}
            />
        </>
    )
};
export default DefaultTabs;