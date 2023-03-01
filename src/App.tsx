import styles from "./App.module.css";
import NavBar from "./ui/scene/NavBar";
import { RightPanel2 } from "./ui/scene/RightPanel";
import Layout from "./ui/layout/Layout";
import Footer from "./ui/scene/Footer";
import LeftPanel from "./ui/scene/LeftPanel";
import { useGame } from "./hooks/useGame";
import Router from "./ui/router/Router";

function App() {
  useGame();

  return (
    <div className={styles.App}>
      <Layout
        header={<NavBar />}
        leftPanel={<LeftPanel />}
        center={<Router />}
        rightPanel={<RightPanel2 />}
        footer={<Footer />}
      />
    </div>
  );
}

export default App;
