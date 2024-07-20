import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/OffersPage.module.css"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Offer from "./Offer";
import ResourceA from "../../components/ResourceA";
import NoResults from '../../assets/noresults.png'

function OffersPage({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [isReady, setIsReady] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}`)
                setPosts(data);
                setIsReady(true);
            } catch (err) {
                console.log(err)
            }
        }

        setIsReady(false);
        fetchOffers();
    }, [pathname, filter])


    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Popular profiles mobile</p>
                {isReady ? (
                    <>
                        {posts.results.length ? (
                            posts.results.map(post => (
                                <Offer key={post.id} {...post} setPosts={setPosts} />
                            ))
                        ) : (
                            <Container className={appStyles.Content}>
                                <ResourceA src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <ResourceA spinner />
                    </Container>
                )
                }
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular profiles for desktop</p>
            </Col>
        </Row>
    );
}

export default OffersPage;