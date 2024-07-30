import { Routes, Route } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import Home from "./pages/home";
import Starred from "./pages/starred";
import WatchLater from "./pages/watch-later";
import "./app.scss";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/starred" element={<Starred />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
