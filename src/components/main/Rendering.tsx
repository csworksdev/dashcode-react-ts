import Lottie from "react-lottie-player";
// import RenderAnimation from "@/assets/animation/animation_lmn8jao9.json";
import RenderAnimation from "@/assets/animation/animation_1698745643002.json";

const Rendering = () => {
  return (
    <div className="container-rendering">
        <Lottie  loop animationData={RenderAnimation} play style={{ width: 350, height: 250 }}/>
        <h1 className="text-md txt-rendering">Rendering, Mohon tunggu sesaat ....</h1>
    </div>
  )
}

export default Rendering