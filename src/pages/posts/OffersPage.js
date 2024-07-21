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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utilities.js/utilities";
import PopularMarketers from "../profiles/PopularMarketers";

function OffersPage({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [isReady, setIsReady] = useState(false);
    const { pathname } = useLocation();


    const [query, setQuery] = useState("");


    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`)
                setPosts(data);
                setIsReady(true);
            } catch (err) {
                console.log(err)
            }
        }

        setIsReady(false);
        const timer = setTimeout(() => {
            fetchOffers();
        }, 400)
        return () => {
            clearTimeout(timer)
        }
    }, [pathname, filter, query])


    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularMarketers mobile />

                <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon} `} />
                <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}>
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search"
                    />
                </Form>

                {isReady ? (
                    <>
                        {posts.results.length ? (
                            <InfiniteScroll 
                                children={
                                    posts.results.map(post => (
                                        <Offer key={post.id} {...post} setPosts={setPosts} />
                                    ))
                                }
                                dataLength={posts.results.length}
                                loader={<ResourceA spinner />}
                                hasMore={!!posts.next}
                                next={ ()=> fetchMoreData(posts, setPosts) }
                            />
                            
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
                <PopularMarketers />
            </Col>
        </Row>
    );
}

export default OffersPage;