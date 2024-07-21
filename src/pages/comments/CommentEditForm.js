import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/EditCreateComment.module.css";

function CommentEditForm(props) {
    const { id, body, setShowEdit, setComments } = props;

    const [formContent, setFormContent] = useState(body);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/comments/${id}/`, {
                body: formContent.trim(),
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? {
                            ...comment,
                            body: formContent.trim(),
                            edited_at: "now",
                        }
                        : comment;
                }),
            }));
            setShowEdit(false);
        } catch (err) {
            // console.log(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pr-1">
                <Form.Control
                    className={styles.Form}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div className="text-right">
                <button
                    className={styles.Button}
                    onClick={() => setShowEdit(false)}
                    type="button"
                >
                    Cancel
                </button>
                <button
                    className={styles.Button}
                    disabled={!body.trim()}
                    type="submit"
                >
                    Edit
                </button>
            </div>
        </Form>
    );
}

export default CommentEditForm;