import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/home/HomePage'
import FavPage from './components/favs/FavPage'
import LoginPage from './components/login/LoginPage'

function PrivateRoutes({path,component,...rest}) {
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)
    if (storage && storage.uid) {
        return <Route path={path} component={component} {...rest}></Route>
    }
    else {
        return <Redirect to='/login' {...rest}></Redirect>
    }
}
export default function Routes() {
    return (
        <Switch>
            <PrivateRoutes exact path="/" component={Home} />
            <PrivateRoutes path="/favs" component={FavPage} />
            <Route path="/login" component={LoginPage} />
        </Switch>
    )
}