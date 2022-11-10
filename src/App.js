import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import LayoutDashboard from "./layout/layout";
import "./App.css";
import SignIn from "./halaman/register";
import LForm from "./halaman/login";
import Filtering from "./halaman/Muser";
import Balian from "./halaman/balian";
import Dashboard from "./halaman/dashboard";
import Customer from "./halaman/customer";

const App = () => {
  return (
    <>
      <Router>
        <div className="App wrapper">

          <Switch>
            <Route exact path="/LForm" > <LForm /></Route>
            <Route exact path="/" component={LForm} />
            <Route exact path="/SignUp" component={SignIn} />
            <Route exact path="/muser" component={Filtering} />
            <Route exact path="/balian" component={Balian} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/customer" component={Customer} />
            <LayoutDashboard>
              <Route exact path="/about" component={() => "Dashboard"} />
              <Route exact path="/Pages" component={() => "Pages"} />
              <Route exact path="/faq" component={() => "FAQ"} />
              <Route exact path="/contact" component={() => "Contact"} />
            </LayoutDashboard>
            {/* <Route exact path="/page-1">
                <Page1 />
              </Route> */}
            
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
