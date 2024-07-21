import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm'
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm'
import OfferPage from './pages/posts/OfferPage'
import OffersPage from './pages/posts/OffersPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import EditForm from './pages/posts/EditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameEditForm from './pages/profiles/UsernameEditForm';
import UserPasswordEditForm from './pages/profiles/UserPasswordEditForm';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import NotFound from './components/NotFound';


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
            filter={`owner__followed__owner__profile=${profile_id}&`} />} />
          <Route exact path="/valid" render={() => <OffersPage
            message='No offers found! Adjust your search or validate an Offer!'
            filter={`valid__owner__profile=${profile_id}&ordering=-valid__created_at&`} />} />
          <Route exact path='/signin' render={() => <SignInForm />} />
          <Route exact path='/signup' render={() => <SignUpForm />} />
          <Route exact path='/posts/create' render={() => <PostCreateForm />} />
          <Route exact path='/posts/:id' render={() => <OfferPage />} />
          <Route exact path='/posts/:id/edit' render={() => <EditForm />} />
          <Route exact path='/profiles/:id' render={() => <ProfilePage />} />
          <Route exact path='/profiles/:id/edit/username' render={() => <UsernameEditForm />} />
          <Route exact path='/profiles/:id/edit/password' render={() => <UserPasswordEditForm />} />
          <Route exact path='/profiles/:id/edit' render={() => <ProfileEditForm />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;