import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SiteNav from "../templates/SiteNav";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PageHome() {
  const [tasks, setTasks] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate ("/login");
    else {
      getAllTasks();
      getAllRoutines();
    }
  }, [loading, user, navigate]);

  async function getAllTasks() {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const filteredTasks = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((task) => task.email === user.email);
    setTasks(filteredTasks);
  };

  async function getAllRoutines() {
    const querySnapshot = await getDocs(collection(db, "routines"));
    const filteredRoutines = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((routine) => routine.email === user.email);
    setRoutines(filteredRoutines);
  };

  const TasksColumn = () => {
    return tasks.map((task, index) => <Task key={index} task={task}/>);
  };

  const RoutinesRow = () => {
    return routines.map((routine, index) => <Routine key={index} routine={routine}/>);
  };

  return (
    <>
      <SiteNav/>
      <Container>
        <h2>All Tasks</h2>
        <ul><TasksColumn/></ul>
      </Container>
      <Container>
        <h2>All Routines</h2>
        <Row>
          <RoutinesRow/>
        </Row>
        
      </Container>
    </>
  );
}

function Task({ task }) {
  const { id, action, due_date } = task;
  const date = new Date(due_date.seconds * 1000);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
  return (
    <li>
      <span>
        <div>
          <Link
            to={`task/${id}`}
          >
            {action}
          </Link>
        </div>
        <div>
          Due date: <i>{formattedDate}</i>
        </div>
      </span>
    </li>
    
    
  );
}

function Routine({ routine }) {
  const { id, action, colour, time } = routine;
  return (
    <span style={{
        backgroundColor: colour,
        width: "18rem",
        marginLeft: "1rem",
        marginTop: "2rem",
      }}
    >
      <div>
        <Link
          to={`routine/${id}`}
        >
          {action}
        </Link>
      </div>
      <div>
        {time}
      </div>
    </span>
  )
}