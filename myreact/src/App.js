import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route} from "react-router-dom"; //routes

import Login from "./components/login";








import Update from "./components/Update";


// FOR OFFICIALS
import Organizational from "./components/userAuth/OrganizationalChart";
import Travel from "./components/userAuth/TravelPage";
import Dashboard from "./components/userAuth/Dashboard";
import viewTravelAsOfficial from "./components/userAuth/viewTravelAsOfficial";


///FOR SK OFFICIALS
import skDashboard from "./components/skAuth/Dashboard";
import skTravel from "./components/skAuth/skTravel";
import skOrganizational from "./components/skAuth/skOrganizational";
import createOfficial from "./components/skAuth/createOfficial";
import Verify from "./components/skAuth/Verified";
import DeleteOfficial from "./components/skAuth/DeleteOfficial";
import DeleteTravel from "./components/skAuth/DeleteTravel";







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

            <Route exact path="/Update/:updateId" component={Update} />



            
            {/* FOR OFFICIALS */}
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Organizational" component={Organizational} />
            <Route exact path="/Travel" component={Travel} />
            <Route exact path="/ManageTravelasOfficial/:viewId" component={viewTravelAsOfficial} />



            {/* FOR SK OFFICIAL */}
            <Route exact path="/skDashboard" component={skDashboard} />
            <Route exact path="/skOrganizational" component={skOrganizational} />
            <Route exact path="/skTravel" component={skTravel} />
            <Route exact path="/createOfficial" component={createOfficial} />
            <Route exact path="/verify/:userId" component={Verify} />
            <Route exact path="/deleteOfficial/:userId" component={DeleteOfficial} />
            <Route exact path="/deleteTravel/:travelId" component={DeleteTravel} />





       
          </Router>
         </nav>
          
        </div>
      </div>
    </>
  );
}

export default App;
