import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Pages/Home"
import Navbar from "./Components/Navbar"
import "bootstrap/dist/css/bootstrap.css"

function App() {
  return (
    <div className="App container-fluid vh-100 overflow-auto p-0" style = {{"backgroundColor" : "#f1f1f1"}}>
        <BrowserRouter>
            <Navbar></Navbar>
          <div>
            <Routes>
              <Route path = "/" element = {<Home />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
