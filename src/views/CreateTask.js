import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import SiteNav from "../templates/SiteNav";

export default function CreateTask() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [action, setAction] = useState("");
    const [due_date, setDueDate] = useState(new Date());

    async function addTask() {
        if (user) {
            const email = user.email;
            await addDoc(
                collection(
                    db,
                    "tasks"
                ),
                    { action, due_date, email }
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
                        <Form.Label>Task Action</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Type away~"
                            value={action}
                            onChange={(text) => setAction(text.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="due_date">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Input a due date"
                            value={due_date.toISOString().split('T')[0]}
                            onChange={(date) => setDueDate(new Date(date.target.value))}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={async (e) => addTask()}
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
}