import { Container, Nav, Navbar } from "react-bootstrap";
import "../App.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function SiteNav() {
    return (
        <Navbar variant="dark" bg="dark">
            <Container>
                <Navbar.Brand href="/">
                <div>
                    <span>
                        <span className="icon">
                            <img
                                src="https://tinyurl.com/4nsb4p9u"
                                alt="icon"
                                height="20px"
                            />
                        </span>
                        TaskMaster
                    </span>
                    <br/>
                    <small
                    style={{ 
                        fontSize: '12px',
                        color: 'gray'
                    }}>
                        Bringing Ideas to Life
                    </small>
                </div>
                </Navbar.Brand>

                <Nav>
                    <Nav.Link href="/createtask">
                        New task
                    </Nav.Link>
                </Nav>

                <Nav>
                    <Nav.Link href="/createroutine">
                        Create routine item
                    </Nav.Link>
                </Nav>

                <Nav>
                    <Nav.Link onClick={(e) => signOut(auth)} href="/login" >
                        Log out
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default SiteNav;