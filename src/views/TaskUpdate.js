import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { deleteDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import SiteNav from "../templates/SiteNav";

export default function TaskUpdate() {
  const [action, setAction] = useState("");
  const [due_date, setDueDate] = useState(new Date().toISOString().split("T")[0]);
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function deleteTask(id) {
    await deleteDoc(doc(db, "tasks", id));
    navigate("/");
  }

  async function updateTask(id, updatedData) {
    await updateDoc(doc(db, "tasks", id), updatedData);
    navigate("/");
  }

  async function getTask(id) {
    const taskDocument = await getDoc(doc(db, "tasks", id));
    const task = taskDocument.data();
    setAction(task.action);
    setDueDate(task.due_date);
  }

  function formatDate(timestamp) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getTask(id);
  }, [id, navigate, user, loading]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTask(id, { action, due_date });
  };

  const date = formatDate(due_date);

  return (
    <>
      <SiteNav/>
      <Container>
        <div>{action}</div>
        <div>Due by: <i>{date}</i></div>
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
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={due_date}
              onChange={(text) => setDueDate(text.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Task
          </Button>
        </Form>
        <br/><br/>
        <Button
            variant="primary"
            onClick={() => deleteTask(id)}
        >
            Delete task
        </Button>
      </Container>
    </>
  );
}