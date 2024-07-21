import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image'


import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularMarketers from "./PopularMarketers";
import ResourceA from "../../components/ResourceA";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Offer from "../posts/Offer";
import { fetchMoreData } from "../../utilities.js/utilities";
import NoResults from '../../assets/noresults.png'
import { ProfileEditDropdown } from "../../components/DropDown";

function ProfilePage() {

    const [isReady, setIsReady] = useState(false);
    const currentUser = useCurrentUser();
    const { id } = useParams();

    const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();

    const [profile] = pageProfile.results
    const is_owner = currentUser?.username === profile?.owner

    const [profilePosts, setProfilePosts] = useState({ results: [] })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profilePosts }] = await Promise.all([
                    axiosReq.get(`/profiles/${id}/`),
                    axiosReq.get(`/posts/?owner__profile=${id}`)
                ])
                setProfileData(prevState => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] }
                }))
                setProfilePosts(profilePosts);
                setIsReady(true)
            } catch (err) {
                // console.log(err)
            }
        }
        fetchData();
    }, [id, setProfileData])

    const mainProfile = (
        <>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{profile?.owner}</h3>
                    <Row className="justify-content-center no-gutters">
                        <Col xs={3} className="my-2">
                            <div>{profile?.offers_count}</div>
                            <div>Offers</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.followers_count}</div>
                            <div>Followers</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.following_count}</div>
                            <div>Following</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser && !is_owner && (
                        profile?.following_id ? (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Unfollow}`}
                                onClick={() => handleUnfollow(profile)}
                            >Unfollow</Button>
                        ) : (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.ColorChange}`}
                                onClick={() => handleFollow(profile)}
                            >Follow</Button>
                        )
                    )}
                </Col>
                {profile?.description && <Col className="p-3">{profile.description}</Col>}
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            <hr />
            <p className="text-center">{profile?.owner}'s offers</p>
            <hr />
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <Offer key={post.id} {...post} setPosts={setProfileData} />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<ResourceA spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <ResourceA
                    src={NoResults}
                    message={`No offers found, ${profile?.owner} has no offers yet.`}
                />
            )}
        </>
    );


    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularMarketers mobile />
                <Container className={appStyles.Content}>
                    {isReady ? (
                        <>
                            {mainProfile}
                            {mainProfilePosts}
                        </>
                    ) : (
                        <ResourceA spinner />
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularMarketers />
            </Col>
        </Row>
    );
}

export default ProfilePage;