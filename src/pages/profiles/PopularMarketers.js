import React, { useEffect, useState } from 'react'
import appStyles from '../../App.module.css'
import { Container } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import ResourceA from '../../components/ResourceA';

const PopularMarketers = () => {

    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        popularProfiles: { results: [] },
    });

    const { popularProfiles } = profileData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    '/profiles/?ordering=-followers_count'
                )
                setProfileData(prevState => ({
                    ...prevState,
                    popularProfiles: data,
                }))
            } catch (err) {
                console.log(err)
            }
        }
        handleMount();
    }, [currentUser]);

    return (
        <Container className={appStyles.Content}>
            {popularProfiles.results.length ?
                (
                    <>
                        <p>Most followed Marketers</p>
                        {popularProfiles.results.map(profile => (
                            <p key={profile.id}>{profile.owner}</p>
                        ))}
                    </>) : (
                    <ResourceA spinner />
                )
            }

        </Container>
    )
}

export default PopularMarketers