import React, { useRef, useEffect, useState } from "react";

import Navmenu from "./Navmenu";
import SimpleBar from "simplebar-react";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useMobileMenu from "@/hooks/useMobileMenu";
import Icon from "@/components/ui/Icon";

import svgRabitImage from "@/assets/images/svg/rabit.svg";

const MobileMenu: React.FC<{ className?: string }> = ({ className = "custom-class" }) => {
  const scrollableNodeRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current?.scrollTop != null) {
        if (scrollableNodeRef.current?.scrollTop > 0) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      }
     
    };
    scrollableNodeRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      scrollableNodeRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();
  const [isDark] = useDarkMode();
  const [mobileMenu, setMobileMenu] = useMobileMenu();
  return (
    <div
      className={`${className} fixed  top-0 bg-white dark:bg-slate-800 shadow-lg  h-full   w-[248px]`}
    >
      <div className="logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] h-[85px]  px-4 ">
        <Link to="/dashboard">
          <div className="flex items-center space-x-4">
            <div className="logo-icon">
              {!isDark && !isSemiDark ? (
                <img src={''} alt="" />
              ) : (
                <img src={''} alt="" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                SIPD
              </h1>
            </div>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="cursor-pointer text-slate-900 dark:text-white text-2xl"
        >
          <Icon icon="heroicons:x-mark" />
        </button>
      </div>

      <div
        className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
          scroll ? " opacity-100" : " opacity-0"
        }`}
      ></div>
      <SimpleBar
        className="sidebar-menu px-4 h-[calc(100%-180px)]"
        scrollableNodeProps={{ ref: scrollableNodeRef }}
      >
        <Navmenu />
      </SimpleBar>
    </div>
  );
};

export default MobileMenu;