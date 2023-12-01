import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";

const MobileLogo: React.FC = () => {
  return (
    <Link to="/">
      {/* <img src={isDark ? LogoWhite : MainLogo} alt="" /> */}
    </Link>
  );
};

export default MobileLogo;