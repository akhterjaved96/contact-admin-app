import './App.css';
import React from 'react';
import MainNavbar from "./modules/layout/navbar/MainNavbar";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./modules/layout/home/Home";
import Dashboard from "./modules/dashboard/Dashboard";
import ContactsAdmin from "./modules/contacts/admin/ContactsAdmin";
import About from "./modules/layout/about/About";
import AddContact from "./modules/contacts/add-contact/AddContact";
import ViewContact from "./modules/contacts/view-contact/ViewContact";
import EditContact from "./modules/contacts/edit-contact/EditContact";
import PageNotFound from "./modules/util/not-found/PageNotFound";

let App = () => {

    return (
        <>
            <BrowserRouter>
                <MainNavbar title={"Contacts Admin"}/>
                <Routes>
                    <Route exact={true} path={'/'} element={<Home/>}/>
                    <Route exact={true} path={'/dashboard'} element={<Dashboard/>}/>
                    <Route exact={true} path={'/contacts/admin'} element={<ContactsAdmin/>}/>
                    <Route exact={true} path={'/contacts/add'} element={<AddContact/>}/>
                    <Route exact={true} path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
                    <Route exact={true} path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
                    <Route exact={true} path={'/about'} element={<About/>}/>
                    <Route exact={true} path={'*'} element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
