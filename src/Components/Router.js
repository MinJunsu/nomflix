import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Detail from "Routes/Detail";
import Header from "Components/Header";

export default () => {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path='/' exact component={Home}></Route>
                <Route path='/tv' exact component={TV}></Route>
                <Route path='/search' exact component={Search}></Route>
                <Route path='/movie/:id' exact component={Detail}></Route>
                <Route path='/show/:id' exact component={Detail}></Route>
                <Redirect from='*' to='/'></Redirect>
            </Switch>
        </Router>
    );
}