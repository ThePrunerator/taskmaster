import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import SiteNav from "../templates/SiteNav";

export default function CreateRoutine() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [action, setAction] = useState("");
    const [colour, setColour] = useState("");
    const [time, setTime] = useState("");

    async function addRoutine() {
        if (user) {
            const email = user.email;
            await addDoc(
                collection(
                    db,
                    "routines"
                ),
                    { action, time, email, colour }
            );
            navigate("/");
        }
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
    }, [navigate, user, loading]);

    return (
        <>
            <SiteNav/>
            <Container>
                <h1>New Task</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="action">
                        <Form.Label>Routine Action</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Type away~"
                            value={action}
                            onChange={(text) => setAction(text.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="due_date">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Input as 09:00"
                            value={time}
                            onChange={(text) => setTime(text.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="due_date">
                        <Form.Label>Colour label</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Input a colour (perferably single syllabus)"
                            value={colour}
                            onChange={(text) => setColour(text.target.value)}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        onClick={async (e) => addRoutine()}
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
}