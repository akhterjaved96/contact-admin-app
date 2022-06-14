import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ContactService} from "../../../service/contacts/ContactService";

let AddContact = () => {

    let navigate = useNavigate();

    let [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            company: '',
            email: '',
            title: '',
            mobile: '',
            photo: '',
            groupId: ''
        },
        groups: [],
        errorMessage: null
    });

    let updateInput = (e) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [e.target.name]: e.target.value
            }
        })
    };

    useEffect(() => {
        let groupResponse = null;

        async function fetchAllGroups() {
            try {
                setState({...state, loading: true})
                groupResponse = await ContactService.getAllGroups();
                setState({
                    ...state,
                    groups: groupResponse.data,
                    loading: false
                })
            } catch (err) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: err.message
                })
            }
        }

        fetchAllGroups().then();
        return () => {
            groupResponse = null; // clean up
        }
    }, []);

    let submitCreate = async (e) => {
        e.preventDefault();
        let response = await ContactService.createContact(state.contact);
        if (response.status === 201) {
            // success
            navigate('/contacts/admin');
        }
    };

    let {loading, errorMessage, contact, groups} = state;
    return (
        <>
            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Add Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                                atque consequuntur culpa cupiditate fugit libero molestias nemo neque nihil, nulla optio
                                possimus praesentium quasi repudiandae saepe sed sit, vitae! Nobis!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <form onSubmit={submitCreate}>
                            <div className="mb-2">
                                <input
                                    required={true}
                                    name="name"
                                    value={contact.name}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Name"/>
                            </div>
                            <div className="mb-2">
                                <input
                                    required={true}
                                    name="photo"
                                    value={contact.photo}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Photon Url"/>
                            </div>
                            <div className="mb-2">
                                <input
                                    required={true}
                                    name="mobile"
                                    value={contact.mobile}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Mobile"/>
                            </div>
                            <div className="mb-2">
                                <input
                                    required={true}
                                    name="email"
                                    value={contact.email}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Email"/>
                            </div>
                            <div className="mb-2">
                                <input
                                    required={true}
                                    name="company"
                                    value={contact.company}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Company"/>
                            </div>
                            <div className="mb-2">
                                <input
                                    required={true}
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
                                <input type="submit" className="btn btn-success me-2" value="Create"/>
                                <Link to={'/contacts/admin'} className="btn btn-dark">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};
export default AddContact;