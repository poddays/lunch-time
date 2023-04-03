import "./style.css";
import ReactDOM from "react-dom/client";

import Header from "./components/header.jsx";
import Footer from "./components/footer";
import Content from "./components/content";
const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <div className="container">
      <Header />
      <Content />
      {/* <Footer/> */}
    </div>
  </>
);
