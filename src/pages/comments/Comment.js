import React, {useState} from 'react'
import styles from '../../styles/Comment.module.css'
import { Media } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import UserAvatar from '../../components/UserAvatar'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { DropDown } from '../../components/DropDown'
import { axiosRes } from '../../api/axiosDefaults'
import CommentEditForm from './CommentEditForm'

const Comment = (props) => {
    const {
        profile_id,
        profile_image,
        owner,
        edited_at,
        body,
        id,
        setPost,
        setComments,
    } = props

    const [showEdit, setShowEdit] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try{
            await axiosRes.delete(`/comments/${id}/`)
            setPost((prevPost) => ({
                results: [{
                    ...prevPost.results[0],
                    comments_count: prevPost.results[0].comments_count - 1,
                }]
            })) 

            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !==id),
            }))
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
          <hr />
          <Media>
            <Link to={`/profiles/${profile_id}`}>
              <UserAvatar src={profile_image} />
            </Link>
            <Media.Body className="align-self-center ml-2">
              <span className={styles.Owner}>{owner}</span>
              <span className={styles.Date}>{edited_at}</span>
              {showEdit ? (
                <CommentEditForm
                id={id}
                profile_id={profile_id}
                body={body}
                profileImage={profile_image}
                setComments={setComments}
                setShowEdit={setShowEdit}
              />
              ) : (
                <p>{body}</p>
              )}
            </Media.Body>
            {is_owner && !showEdit && (
              <DropDown
                handleEdit={() => setShowEdit(true)}
                handleDelete={handleDelete}
              />
            )}
          </Media>
        </>
      );
}

export default Comment