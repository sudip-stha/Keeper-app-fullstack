import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ToggleProvider } from "./ToggleContext";

function App() {
  return (
      <ToggleProvider>
        <Header />
      <Outlet />
      <Footer />
      </ToggleProvider>
    
  );
}

export default App;
