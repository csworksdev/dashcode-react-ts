import { Spinner } from "@chakra-ui/react";

type Props = {
    ActiveTab: any;
    ActivePage: DocumentTransactionBasicType;
    isSelected: boolean
    title: string
    image: string
    IsLoading: boolean
    action: (tab: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicType) => void
}

const TransactionTabs = (props: Props) => {
    const { isSelected, title, image, action, ActiveTab, ActivePage, IsLoading } = props
    return (
        <div onClick={() => (!IsLoading && !isSelected) ? action(ActiveTab, ActivePage) : ''} className={`css-k9-2jf2-1i-fa`}>
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
export default TransactionTabs;