import ScrollContainer from "react-indiana-drag-scroll";

type Props = {
    children: JSX.Element | JSX.Element[],
};

const DragableTable = ({ children }: Props) => {
    return (
        <ScrollContainer className="scroll-container cursor-pointer mt-5">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                    {children}
                </div>
            </div>
        </ScrollContainer>
    )
};
export default DragableTable;