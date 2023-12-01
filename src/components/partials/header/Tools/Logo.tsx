import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";

const Logo: React.FC = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link to="/dashboard">
        {/* {width >= Number(breakpoints.xl) ? (
          <img src={isDark ? LogoWhite : MainLogo} alt="" />
        ) : (
          <img src={isDark ? MobileLogoWhite : MobileLogo} alt="" />
        )} */}
      </Link>
    </div>
  );
};

export default Logo;