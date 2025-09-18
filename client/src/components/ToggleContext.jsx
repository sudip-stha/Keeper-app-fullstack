import { createContext, useState } from "react";

const ToggleContext = createContext();

function ToggleProvider({ children }) {
  const [hideBtn, setHideBtn] = useState(false);

  return (
    <ToggleContext.Provider value={{ hideBtn, setHideBtn }}>
      {children}
    </ToggleContext.Provider>
  );
}

export {ToggleContext,ToggleProvider};