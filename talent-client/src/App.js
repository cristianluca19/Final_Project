import { Route } from "react-router-dom";
import './App.css';
import Catalogue from "./components/Catalogue/index.jsx";
import ContentHome from "./components/ContentHome/index.jsx";
import Footer from "./components/Footer/index.jsx";
import Nav from "./components/Nav/index.jsx";

function App() {
  return (
    <div className="App">
      <Route path='/' render={() => <Nav />} />
      <Route path='/' render={() => <ContentHome />} />
      <Route path='/' render={() => <Catalogue />} />
      <Route path='/' render={() => <Footer />} />
    </div>
  );
}

export default App;
