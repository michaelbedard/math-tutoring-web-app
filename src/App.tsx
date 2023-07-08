import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./views/Home/Home";
import Footer from "./components/Footer/Footer";
import Adventure1 from "./views/Adventure-1/Adventure-1";
import Adventure2 from "./views/Adventure-2/Adventure-2";
import Content1 from "./views/Content-1/Content-1";
import Content2 from "./views/Content-2/Content-2";
import QuestionProvider from "./views/Question/QuestionProvider";

function App() {


  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path={"/"} Component={Home}/>
                  <Route path={"/aventure"} Component={Adventure1}/>
                  <Route path={"/aventure/*"} Component={Adventure2}/>
                  <Route path={"/question/*"} Component={QuestionProvider}/>
                  <Route path={"/note-de-cours"} Component={Content1}/>
                  <Route path={"/note-de-cours/*"} Component={Content2}/>
              </Routes>
          </BrowserRouter>
          <Footer />
      </div>
  );
}

export default App;
