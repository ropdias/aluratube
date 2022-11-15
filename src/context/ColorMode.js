import { createContext, useState } from "react";

// It starts with a capital letter because createContext returns a component
export const ColorModeContext = createContext({
  mode: "dark",
  changeMode: () => {
    alert("Please configure ColorModeContext using the Provider !"); // Just a safety mechanism to make sure we use the Provider first
  },
});

const ColorModeProvider = (props) => {
  const [mode, setMode] = useState("dark");

  const changeModeHandler = () => {
    setMode((prevMode) => {
      if (prevMode === "light") {
        return "dark";
      } else {
        return "light";
      }
    });
  };

  const context = {
    mode: mode,
    changeMode: changeModeHandler,
  };

  return (
    <ColorModeContext.Provider value={context}>
      {props.children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
