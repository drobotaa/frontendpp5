import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/ResourceA.module.css";

const ResourceA = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.ResourceA} p-4`}>
      {spinner && <Spinner animation="grow" variant="danger"/>}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ResourceA;