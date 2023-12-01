import { Spinner } from "@chakra-ui/react";

type Props = {
    SelectedTab: DocumentTransactionBasicFilterType
    ActiveTab: DocumentTransactionBasicFilterType;
    ActivePage: DocumentTransactionBasicType;
    isSelected: boolean
    title: string
    image: string
    IsLoading: boolean
    action: (tabStatus: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicFilterType) => void
}

const TransactionSubTabs = (props: Props) => {
    const { SelectedTab, isSelected, title, image, action, ActiveTab, ActivePage, IsLoading } = props
    return (
        <div onClick={() => (!IsLoading && !isSelected) ? action(SelectedTab, ActiveTab) : ''} className={`css-k9-2jf2-1i-fadd`}>
            <button disabled={IsLoading} className={`css-ni0cq-f9f-z ${isSelected ? 'css-ni0cq-f9f-z-active cursor-no-action' : 'cursor-pointer'}`}>
                {
                    IsLoading ?
                        <Spinner size='sm' className="me-2 mb-1" /> :
                        <img width={25} className="me-1" src={image} alt="" />
                }
                <p className='css-c-9w2-az-faef'>{title}</p>
                {/* <span className="css-nc-j3q0_f-afc-a">0</span> */}
            </button>
            {
                isSelected ?
                    <span className="css-jf032-jf0-acf"></span> :
                    <span className="css-jf032-jf0-acf3"></span>
            }
        </div>
    )
};
export default TransactionSubTabs;