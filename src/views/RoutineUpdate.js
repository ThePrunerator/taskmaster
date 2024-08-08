import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { deleteDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import SiteNav from "../templates/SiteNav";

export default function RoutineUpdate() {
  const [action, setAction] = useState("");
  const [time, setTime] = useState("");
  const [colour, setColour] = useState("");
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function deleteRoutine(id) {
    await deleteDoc(doc(db, "routines", id));
    navigate("/");
  }

  async function updateRoutine(id, updatedData) {
    await updateDoc(doc(db, "routines", id), updatedData);
    navigate("/");
  }

  async function getRoutine(id) {
    const routineDocument = await getDoc(doc(db, "routines", id));
    const routine = routineDocument.data();
    setAction(routine.action);
    setTime(routine.time);
    setColour(routine.colour);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getRoutine(id);
  }, [id, navigate, user, loading]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateRoutine(id, { action, time, colour });
  };
  return (
    <>
      <SiteNav/>
      <Container>
        <div>{action}</div>
        <div>Time: <i>{time}</i></div>
        <Form onSubmit={handleUpdate}>
          <Form.Group>
            <Form.Label>Action</Form.Label>
            <Form.Control
              type="text"
              value={action}
              onChange={(text) => setAction(text.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="text"
              value={time}
              onChange={(text) => setTime(text.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Colour label</Form.Label>
            <Form.Control
              type="text"
              value={colour}
              onChange={(text) => setColour(text.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Routine
          </Button>
        </Form>
        <br/><br/>
        <Button
            variant="primary"
            onClick={() => deleteRoutine(id)}
        >
            Delete routine
        </Button>
      </Container>
    </>
  );
}