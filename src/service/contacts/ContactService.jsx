import {SERVER_URLS} from "../../config/config";
import axios from "axios";

export class ContactService {
    static serverURL = SERVER_URLS.JSON_SERVER_URL;

    // Get all Contacts
    static getAllContacts() {
        let url = `${this.serverURL}/contacts`;
        return axios.get(url);
    }

    // Get a single Contact
    static getContact(contactId) {
        let url = `${this.serverURL}/contacts/${contactId}`;
        return axios.get(url);
    }

    // Create a Contact
    static createContact(contact) {
        let url = `${this.serverURL}/contacts`;
        return axios.post(url, contact);
    }

    // update a contact
    static updateContact(contact, contactId) {
        let url = `${this.serverURL}/contacts/${contactId}`;
        return axios.put(url, contact);
    }

    // delete a Contact
    static deleteContact(contactId) {
        let url = `${this.serverURL}/contacts/${contactId}`;
        return axios.delete(url);
    }

    // Get all groups
    static getAllGroups() {
        let url = `${this.serverURL}/groups`;
        return axios.get(url);
    }

    // Get a Group
    static getGroup(contact) {
        let {groupId} = contact;
        let url = `${this.serverURL}/groups/${groupId}`;
        return axios.get(url);
    }

}