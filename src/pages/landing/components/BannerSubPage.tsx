type Props = {
    image: string
    title: string
}

const BannerSubPage = (props: Props) => {
    const {image, title} = props
    return (
        <div className="css-a-cnaw-aj9-1faw">
            {/* <img className="css-na0c-a-1d-aqf ss" src="/assets/images/DASAR_HUKUM 1.png" alt="" /> */}
            <img className="css-na0c-a-1d-aqf" src={`/assets/images/${image}`} alt="" />
            <h1 className="css-an-cfma-1-ca">{title}</h1>
        </div>
    )
};
export default BannerSubPage;