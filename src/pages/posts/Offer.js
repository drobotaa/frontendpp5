import React from 'react'
import styles from '../../styles/Offer.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import UserAvatar from '../../components/UserAvatar'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosRes } from '../../api/axiosDefaults'
import { DropDown } from '../../components/DropDown'



const Offer = (props) => {

    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        validated_count,
        valid_id,
        title,
        description,
        image,
        // category_filter,
        updated_at,
        offerPage,
        setPosts,
    } = props


    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

    const history = useHistory();

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`)
    }

    const handleDelete = async () => {
        try{
            await axiosRes.delete(`/posts/${id}`)
            history.goBack()
        } catch (err) {
            console.log(err)
        }
    }

    const handleValid = async () => {
        try {
            const { data } = await axiosRes.post('/validplus/', { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, validated_count: post.validated_count + 1, valid_id: data.id }
                        : post;
                })
            }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleNotValid = async () => {
        try {
            await axiosRes.delete(`/validplus/${valid_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, validated_count: post.validated_count - 1, valid_id: null }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Card className={styles.Offer}>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        <UserAvatar src={profile_image} height={60} />
                        {owner}
                    </Link>
                    <div className='d-flex align-items-center'>
                        <span>{updated_at}</span>
                        {is_owner && offerPage && <DropDown handleEdit={handleEdit} handleDelete={handleDelete}/>}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
            <Card.Img src={image} alt={title} />
            </Link> 
            <Card.Body>
                {title && <Card.Title className='text-center'>{title}</Card.Title>}
                {description && <Card.Text className='text-center'>{description}</Card.Text>}
                {/* {category_filter && <Card.Text className='text-center'>{category_filter}</Card.Text>} */}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger placement='top' overlay={<Tooltip>You can`t validate your own offer!</Tooltip>}>
                            <i className='fa-solid fa-check' />
                        </OverlayTrigger>
                    ) : valid_id ? (
                        <span onClick={handleNotValid}>
                            <i className={`fa-solid fa-check ${styles.ValidGlow}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleValid}>
                            <i className={`fa-solid fa-check `} />
                        </span>
                    ) : (
                        <OverlayTrigger placement='top' overlay={<Tooltip>Log in to validate an Offer!</Tooltip>}>
                            <i className='fa-solid fa-check' />
                        </OverlayTrigger>
                    )}
                    {validated_count}
                    <i className='fa-solid fa-comment' />
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Offer