import useProfile from "@/hooks/useProfile";
import TransactionTabs from "../tabs/TransactionTabs";
import { ROLE_BENDAHARA_PENGELUARAN, ROLE_BENDAHARA_PENGELUARAN_PEMBANTU, ROLE_KUASA_PENGGUNA_ANGGARAN, ROLE_PENGGUNA_ANGGARAN } from "@/constant/data";

type Props = {
    IsLoading: boolean
    SelectedTab: DocumentTransactionBasicFilterType
    handleTabChange: (tabStatus: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicType) => void
}

const DefaultTabs = (props: Props) => {
    const { IsLoading, SelectedTab, handleTabChange } = props
    const [Profile] = useProfile();

    return (
        <>
            {/* {
                Profile != null && (Profile.id_role === ROLE_PENGGUNA_ANGGARAN || Profile.id_role === ROLE_KUASA_PENGGUNA_ANGGARAN || Profile.id_role === ROLE_BENDAHARA_PENGELUARAN || Profile.id_role === ROLE_BENDAHARA_PENGELUARAN_PEMBANTU) ?
                    <>
                        <TransactionTabs
                            ActiveTab={'draft'}
                            IsLoading={IsLoading}
                            image={'/assets/images/animation/waiting.gif'}
                            ActivePage={''}
                            isSelected={SelectedTab === 'draft'}
                            title={Profile.id_role === ROLE_PENGGUNA_ANGGARAN || Profile.id_role === ROLE_KUASA_PENGGUNA_ANGGARAN ? `Belum Disetujui` : 'Belum Divalidasi'}
                            action={handleTabChange}
                        />
                        <TransactionTabs
                            ActiveTab={'diterima'}
                            IsLoading={IsLoading}
                            image={'/assets/images/animation/shield.gif'}
                            ActivePage={''}
                            isSelected={SelectedTab === 'diterima'}
                            title={Profile.id_role === ROLE_PENGGUNA_ANGGARAN || Profile.id_role === ROLE_KUASA_PENGGUNA_ANGGARAN ? `Disetujui` : 'Divalidasi'}
                            action={handleTabChange}
                        />
                    </> : null
            } */}

            <TransactionTabs
                ActiveTab={'non-panjar'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/waiting.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'non-panjar'}
                title={`Non Panjar`}
                action={handleTabChange}
            />
            <TransactionTabs
                ActiveTab={'panjar'}
                IsLoading={IsLoading}
                image={'/assets/images/animation/shield.gif'}
                ActivePage={''}
                isSelected={SelectedTab === 'panjar'}
                title={`Panjar`}
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
export default DefaultTabs;