import { createContext, PropsWithChildren, useContext, useState } from "react";
interface NavbarContextTypes {
  isNavBarOpen: boolean;
  handleNavbarState: (state: boolean) => void;
}
const NavbarContext = createContext<NavbarContextTypes>({
  isNavBarOpen: false,
  handleNavbarState: () => {},
});

const NavbarContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isNavBarOpen, setIsNavbarOpen] = useState(true);

  function handleNavbarState(state: boolean) {
    setIsNavbarOpen(state);
  }

  return (
    <NavbarContext.Provider value={{ isNavBarOpen, handleNavbarState }}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContextProvider;

export function useNavbarContext() {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("NavbarContext was used outside of its scope");
  return context;
}
