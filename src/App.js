import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm'
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm'
import OfferPage from './pages/posts/OfferPage'
import OffersPage from './pages/posts/OffersPage';
import { useCurrentUser } from './contexts/CurrentUserContext';


function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <OffersPage message='No offers found! Adjust your search' />} />
          <Route exact path="/feed" render={() => <OffersPage
            message='No offers found! Adjust your search or follow someone!'
            filter= {`owner__followed__owner__profile=${profile_id}&`} /> } />
          <Route exact path="/valid" render={() => <OffersPage
            message='No offers found! Adjust your search or validate an Offer!'
            filter={`validplus__owner__profile=${profile_id}&ordering=-validplus__created_at&`} /> } />
          <Route exact path='/signin' render={() => <SignInForm />} />
          <Route exact path='/signup' render={() => <SignUpForm />} />
          <Route exact path='/posts/create' render={() => <PostCreateForm />} />
          <Route exact path='/posts/:id' render={() => <OfferPage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;