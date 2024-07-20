import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '../styles/DropDown.module.css'


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

export const DropDown = ({handleEdit, handleDelete}) => {
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