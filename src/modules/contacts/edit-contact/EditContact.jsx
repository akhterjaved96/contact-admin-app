import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from "react-router-dom";
import {ContactService} from "../../../service/contacts/ContactService";
import Spinner from "../../layout/spinner/Spinner";

let EditContact = () => {
    let {contactId} = useParams();
    let navigate = useNavigate();

    let [state, setState] = useState({
        loading: false,
        contact: {},
        groups: [],
        errorMessage: null
    });

    useEffect(() => {
        let contactResponse = null;
        let groupResponse = null;

        async function fetchContactAndGroup() {
            try {
                setState({...state, loading: true})
                contactResponse = await ContactService.getContact(contactId);
                groupResponse = await ContactService.getAllGroups();
                setState({
                    ...state,
                    loading: false,
                    contact: contactResponse.data,
                    groups: groupResponse.data
                });
            } catch (err) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: err.message
                });
            }
        }

        fetchContactAndGroup().then();

        return () => {
            contactResponse = null; // clean up
            groupResponse = null;
        }
    }, []);

    let updateInput = (e) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [e.target.name]: e.target.value
            }
        });
    };

    let submitUpdate = async (e) => {
        e.preventDefault();
        let response = await ContactService.updateContact(state.contact, contactId);
        if (response.status === 200) {
            // success
            navigate('/contacts/admin');
        }
    };

    let {loading, contact, groups, errorMessage} = state;

    return (
        <>
            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Edit Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                                atque consequuntur culpa cupiditate fugit libero molestias nemo neque nihil, nulla optio
                                possimus praesentium quasi repudiandae saepe sed sit, vitae! Nobis!</p>
                        </div>
                    </div>
                </div>
            </div>

            {
                loading && groups.length === 0 && Object.keys(contact).length > 0 ? <>
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

            {
                !loading && Object.keys(contact).length > 0 &&
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <form onSubmit={submitUpdate}>
                                <div className="mb-2">
                                    <input
                                        name="name"
                                        value={contact.name}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Name"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="photo"
                                        value={contact.photo}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Photon Url"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="mobile"
                                        value={contact.mobile}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Mobile"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="email"
                                        value={contact.email}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Email"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="company"
                                        value={contact.company}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Company"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="title"
                                        value={contact.title}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Title"/>
                                </div>
                                <div className="mb-2">
                                    <select
                                        required={true}
                                        name="groupId"
                                        value={contact.groupId}
                                        onChange={updateInput}
                                        className="form-control">
                                        <option value="">Select Group</option>
                                        {
                                            groups.length > 0 && groups.map(group => {
                                                return (
                                                    <option value={group.id} key={group.id}>{group.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-success me-2" value="Update"/>
                                    <Link to={'/contacts/admin'} className="btn btn-dark">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-3">
                            <img src={contact.photo} alt="" className="contact-img-big rounded-circle"/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};
export default EditContact;