import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from "../NavBar";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";


test('NavBar Rendering', () => {
    render(<Router>
        <NavBar />
    </Router>
    );

    // screen.debug(); 
    const signInLink = screen.getByRole('link', { name: 'Sign in' })
    expect(signInLink).toBeInTheDocument();
});


test('Userprofile link for a logged in user', async () => {
    render(
    <Router>
        <CurrentUserProvider>
            <NavBar />
        </CurrentUserProvider>
    </Router>
    );

    const profileAvatar = await screen.findByText('Profile')
    expect(profileAvatar).toBeInTheDocument();
});


test('render "Sign in / Sign up" buttons on logout', async () => {
    render(
    <Router>
        <CurrentUserProvider>
            <NavBar />
        </CurrentUserProvider>
    </Router>
    );

    const signOutLink = await screen.findByRole('link', {name: 'Sign out'});
    fireEvent.click(signOutLink);
    
    const signInLink = await screen.findByRole('link', {name: 'Sign in'});
    const signUpLink = await screen.findByRole('link', {name: 'Sign Up'});
    
    expect(signInLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();

});