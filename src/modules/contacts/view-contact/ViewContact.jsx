import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {ContactService} from "../../../service/contacts/ContactService";

let ViewContact = () => {
    let {contactId} = useParams();

    let [state, setState] = useState({
        loading: false,
        contact: {},
        group: {},
        errorMessage: null
    });

    useEffect(() => {
        let contactResponse = null;
        let groupResponse = null;

        async function fetchContactAndGroup() {
            try {
                setState({...state, loading: true})
                contactResponse = await ContactService.getContact(contactId);
                groupResponse = await ContactService.getGroup(contactResponse.data);
                setState({
                    ...state,
                    loading: false,
                    contact: contactResponse.data,
                    group: groupResponse.data
                })
            } catch (err) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: err.message
                })
            }
        }

        fetchContactAndGroup().then();

        return () => {
            contactResponse = null; // clean up
            groupResponse = null;
        }
    }, []);

    let {loading, contact, errorMessage, group} = state;
    return (
        <>
            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">View Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                                atque consequuntur culpa cupiditate fugit libero molestias nemo neque nihil, nulla optio
                                possimus praesentium quasi repudiandae saepe sed sit, vitae! Nobis!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    {
                        !loading && Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
                        <div className="col-sm-8">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-sm-5 text-center">
                                            <img src={contact.photo} alt=""
                                                 className="contact-img-big"/>
                                        </div>
                                        <div className="col-sm-7">
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
                                                <li className="list-group-item">
                                                    Company : <span className="fw-bold">{contact.company}</span>
                                                </li>
                                                <li className="list-group-item">
                                                    Title : <span className="fw-bold">{contact.title}</span>
                                                </li>
                                                <li className="list-group-item">
                                                    Group : <span className="fw-bold">{group.name}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <Link to={'/contacts/admin'} className="btn btn-success">
                            <i className="fa fa-arrow-alt-circle-left"/> Back</Link>
                    </div>
                </div>
            </div>
        </>
    )
};
export default ViewContact;