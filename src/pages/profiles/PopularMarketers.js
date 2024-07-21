import React from 'react'
import appStyles from '../../App.module.css'
import Container from 'react-bootstrap/Container'
import ResourceA from '../../components/ResourceA';
import Profile from './Profile';
import { useProfileData } from '../../contexts/ProfileDataContext';

const PopularMarketers = ({ mobile }) => {

    const { popularProfiles } = useProfileData();

    return (
        <Container className={`${appStyles.Content} ${mobile && 'd-lg-none text-center mb-3'}`}>
            {popularProfiles.results.length ?
                (
                    <>
                        <p>Most followed Marketers</p>
                        {mobile ? (
                            <div className='d-flex justify-content-around'>
                                {popularProfiles.results.slice(0, 4).map(profile => (
                                    <Profile key={profile.id} profile={profile} mobile />
                                ))}
                            </div>
                        ) : (
                            popularProfiles.results.map(profile => (
                                <Profile key={profile.id} profile={profile} />
                            ))
                        )}
                    </>) : (
                    <ResourceA spinner />
                )
            }

        </Container>
    )
}

export default PopularMarketers