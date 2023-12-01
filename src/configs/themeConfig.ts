interface ThemeConfig {
  app: {
    name: string;
  };
  layout: {
    isRTL: boolean;
    darkMode: boolean;
    semiDarkMode: boolean;
    skin: string;
    contentWidth: string;
    type: string;
    navBarType: string;
    footerType: string;
    isMonochrome: boolean;
    menu: {
      isCollapsed: boolean;
      isHidden: boolean;
    };
    mobileMenu: boolean;
    customizer: boolean;
  };
}

const themeConfig: ThemeConfig = {
  app: {
    name: "SIPD",
  },
  layout: {
    isRTL: false,
    darkMode: false,
    semiDarkMode: false,
    skin: "bordered",
    contentWidth: "full",
    type: "vertical",
    navBarType: "sticky",
    footerType: "static",
    isMonochrome: false,
    menu: {
      isCollapsed: false,
      isHidden: false,
    },
    mobileMenu: false,
    customizer: false,
  },
};

export default themeConfig;