import { useEffect, useState, useRef } from "react";
import { BsSun } from "react-icons/bs";

type Theme = "mixed" | "light" | "dark" | "red" | "blue" | "";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const localTheme = (localStorage.getItem("theme") as Theme) || "";
    document.documentElement.className = `theme-${localTheme}`;
    setTheme(localTheme);
  }, [theme]);

  useEffect(() => {
    if (dropdownRef.current) {
      if (isDropDownOpen) {
        dropdownRef.current.style.opacity = "1";
        dropdownRef.current.style.maxHeight = `${dropdownRef.current.scrollHeight}px`;
        dropdownRef.current.style.transform = "translateY(0)";
      } else {
        dropdownRef.current.style.opacity = "0";
        dropdownRef.current.style.maxHeight = "0px";
        dropdownRef.current.style.transform = "translateY(-10px)";
      }
    }
  }, [isDropDownOpen]);

  const handleTheme = (value: Theme) => {
    localStorage.setItem("theme", value);
    setTheme(value);
    setIsDropDownOpen(false);
  };

  return (
    <div className="text-text flex flex-col justify-center gap-y-5">
      <BsSun
        onClick={() => setIsDropDownOpen((state) => !state)}
        className="text-secondary hover:text-secondary/70 size-8 cursor-pointer self-end transition-all duration-300 hover:rotate-180"
        aria-label="change theme button"
      />
      {isDropDownOpen ? (
        <div
          ref={dropdownRef}
          className={`bg-secondary absolute top-40 right-0 flex max-h-0 -translate-y-2 transform flex-col items-center gap-y-3 overflow-hidden rounded-md p-4 capitalize opacity-0 transition-all duration-500 ease-in-out`}
        >
          <button
            aria-label="light theme button"
            className="btn"
            onClick={() => handleTheme("light")}
          >
            Light Theme
          </button>
          <button
            aria-label="dark theme button"
            className="btn"
            onClick={() => handleTheme("dark")}
          >
            Dark Theme
          </button>
          <button
            aria-label="red theme button"
            className="btn"
            onClick={() => handleTheme("red")}
          >
            Red Theme
          </button>
          <button
            aria-label="blue theme button"
            className="btn"
            onClick={() => handleTheme("blue")}
          >
            Blue Theme
          </button>
          <button
            aria-label="mixed theme button"
            className="btn"
            onClick={() => handleTheme("mixed")}
          >
            Mixed Theme
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ThemeSwitcher;
