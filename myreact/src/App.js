import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route} from "react-router-dom"; //routes
import Forms from "./components/userAuth/Forms";

import Login from "./components/login";
import Register from "./components/captainAuth/Register";
import Verify from "./components/userAuth/Verified";








import Delete from "./components/Delete";
import Update from "./components/Update";
import View from "./components/View";


// FOR OFFICIALS
import Organizational from "./components/userAuth/OrganizationalChart";
import Travel from "./components/userAuth/TravelPage";
import Dashboard from "./components/userAuth/Dashboard";


import ViewReports from "./components/ViewReports";

function App() {
  return (
    <>
      <div>
        <div className="pos-f-t">
          <nav className="navbar navbar-dark bg-dark">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

          </nav>
       <nav>

       <Router>
           
            {/* ROUTES LANG SAKALAM */}
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/verify/:userId" component={Verify} />

            <Route exact path="/Form/" component={Forms} />
            <Route exact path="/View/:viewId" component={View} />
            <Route exact path="/Delete/:deleteId" component={Delete} />
            <Route exact path="/Update/:updateId" component={Update} />
            <Route exact path="/ViewReports" component={ViewReports} />



            
            {/* FOR OFFICIALS */}
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Organizational" component={Organizational} />
            <Route exact path="/Travel" component={Travel} />


       
          </Router>
         </nav>
          
        </div>
      </div>
    </>
  );
}

export default App;
