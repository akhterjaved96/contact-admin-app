import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ContactService} from "../../../service/contacts/ContactService";
import Spinner from "../../layout/spinner/Spinner";

let ContactsAdmin = () => {
    let [query, setQuery] = useState("");

    let [state, setState] = useState({
        loading: false,
        contacts: [],
        filteredContacts: [],
        errorMessage: null
    });

    let fetchAllContacts = async () => {
        try {
            setState({
                ...state,
                loading: true
            });
            let response = await ContactService.getAllContacts();
            setState({
                ...state,
                loading: false,
                contacts: response.data,
                filteredContacts: response.data
            });
        } catch (err) {
            setState({
                ...state,
                loading: false,
                errorMessage: err.message
            })
        }
    }

    useEffect(() => {
        fetchAllContacts().then();
        return () => {
            // empty clean up
        }
    }, []);

    let {loading, contacts, errorMessage, filteredContacts} = state;

    let updateQuery = (e) => {
        setQuery(e.target.value);
        let theContacts = state.contacts.filter((contact) => {
            return contact.name.toLowerCase().includes(e.target.value.toLowerCase())
        });
        setState({
            ...state,
            filteredContacts: theContacts
        })
    }

    let clickDelete = async (contactId) => {
        try {
            setState({...state, loading: true});
            let response = await ContactService.deleteContact(contactId);
            if (response.status === 200) {
                fetchAllContacts().then();
            }
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        }
    };

    return (
        <>
            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Contacts Admin
                                &nbsp; <Link to={'/contacts/add'} className="btn btn-success btn-sm"><i
                                    className="fa fa-plus-circle"/> New</Link>
                            </p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Accusantium ad aliquid asperiores consectetur corporis, culpa cum deleniti fugiat illum
                                ipsa nulla odit, officia placeat porro provident quasi ratione sint vitae!</p>
                        </div>
                    </div>
                </div>
            </div>

		    <div className="container mt-2">
		        <div className="row">
		            <div className="col-sm-6">
		                <form>
		                    <div className="row">
		                        <div className="col">
		                            <input
		                                value={query}
		                                onChange={updateQuery}
		                                type="text" className="form-control" placeholder="Search Contact"/>
		                        </div>
		                        <div className="col">
		                            <input type="submit" className="btn btn-outline-dark" value="Search"/>
		                        </div>
		                    </div>
		                </form>
		            </div>
		        </div>
		    </div>

            {
                loading && contacts.length === 0 && filteredContacts.length > 0 ? <>
                    <Spinner/>
                </> : <> </>
            }

            {
                !loading && errorMessage ? <>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col">
                                <p className="h4 text-danger text-center">{errorMessage}</p>
                            </div>
                        </div>
                    </div>
                </> : <> </>
            }

            <div className="container mt-3">
                <div className="row">
                    {
                        !loading && filteredContacts.length > 0 && filteredContacts.map(contact => {
                            return (
                                <div className="col-sm-6" key={contact.id}>
                                    <div className="card shadow-lg my-2">
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                <div className="col-3">
                                                    <img
                                                        src={contact.photo}
                                                        alt="" className="contact-img"/>
                                                </div>
                                                <div className="col-8">
                                                    <ul className="list-group">
                                                        <li className="list-group-item">
                                                            Name : <span className="fw-bold">{contact.name}</span>
                                                        </li>
                                                        <li className="list-group-item">
                                                            Mobile : <span className="fw-bold">{contact.mobile}</span>
                                                        </li>
                                                        <li className="list-group-item">
                                                            Email : <span className="fw-bold">{contact.email}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div
                                                    className="col-1 d-flex flex-column justify-content-center align-items-center">
                                                    <Link to={`/contacts/view/${contact.id}`}
                                                          className="btn btn-warning my-1">
                                                        <i className="fa fa-eye"/>
                                                    </Link>
                                                    <Link to={`/contacts/edit/${contact.id}`}
                                                          className="btn btn-primary my-1">
                                                        <i className="fa fa-edit"/>
                                                    </Link>
                                                    <button className="btn btn-danger my-1"
                                                            onClick={() => clickDelete(contact.id)}>
                                                        <i className="fa fa-trash-alt"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
};
export default ContactsAdmin;
