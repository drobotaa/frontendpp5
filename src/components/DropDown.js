import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '../styles/DropDown.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const EditButton = React.forwardRef(({ onClick }, ref) => (
    <i
        className="fa-solid fa-list-ul"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const DropDown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown className='ml-auto' drop='left'>
            <Dropdown.Toggle as={EditButton} />
            <Dropdown.Menu
                className='text-center'
                popperConfig={{ strategy: "fixed" }}
            >
                <Dropdown.Item
                    className={styles.DropDownElement}
                    onClick={handleEdit}
                    aria-label="edit"
                ><i className='fa-solid fa-pen-to-square' /> Edit</Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropDownElement}
                    onClick={handleDelete}
                    aria-label="delete"
                ><i className='fa-solid fa-trash' /> Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export function ProfileEditDropdown({ id }) {
    const history = useHistory();
    return (
        <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
            <Dropdown.Toggle as={EditButton} />
            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit`)}
                    aria-label="edit-profile"
                >
                    <i className="fa-solid fa-pen-to-square" /> Edit profile
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/username`)}
                    aria-label="edit-username"
                >
                    <i className="fa-solid fa-address-card" />
                    Change username
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/password`)}
                    aria-label="edit-password"
                >
                    <i className="fa-solid fa-key" />
                    Change password
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}