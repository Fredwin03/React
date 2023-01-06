import React, { useRef, useState, useEffect } from "react";
import All from "./All.js";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Completed from "./Completed.js";
import Pending from "./Pending.js";

let count = Math.floor(Math.random() * 1000);
let tempTask = [];
const minimalStyle = {
  transitionDuration: "0.5s",
  textDecoration: "none",
  color: "white",
  margin: "auto",
};

function Template() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  let newTask = { id: count, isCompleted: false, task: text };
  const inputRef = useRef(null);

  const focusEvent = (e) => {
    if (document.activeElement.id !== "text") {
      document
        .getElementById("text")
        .setAttribute("placeholder", "Press '/' to start typing...");

      if (e.key === "/") {
        e.preventDefault();
        inputRef.current.focus();
        document
          .getElementById("text")
          .setAttribute("placeholder", "Enter something to do");
      }
    } else if (document.activeElement.id === "text") {
      document
        .getElementById("text")
        .setAttribute("placeholder", "Enter something to do");
      if (e.key === "Enter") {
        document.getElementById("submitTask").click();
      }
    }
  };

  const addTask = () => {
    if (!text) {
      alert("Write some content!");
      return;
    }
    setTasks((prev) => [...prev, newTask]);
    setText("");
    while (true) {
      let temp = Math.floor(Math.random() * 1000);
      if (temp === count) {
        continue;
      } else {
        count = temp;
        break;
      }
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((v, index) => v.id !== id));
  };

  const statusHandler = (i) => {
    const position = tasks.findIndex((v) => v === i);
    let isCompleted = tasks[position].isCompleted;
    tempTask = [...tasks];
    tempTask[position] = {
      ...tasks[position],
      isCompleted: !isCompleted,
    };
    setTasks(tempTask);
  };

  useEffect(() => {
    window.addEventListener("click", focusEvent);
    window.addEventListener("keypress", focusEvent);
    inputRef.current.focus();
    return () => {
      window.removeEventListener("keypress", focusEvent);
      window.removeEventListener("click", focusEvent);
    };
  }, []);

  return (
    <>
      <h1>To Do:</h1>
      <BrowserRouter>
        <nav>
          <Link
            id="all"
            onMouseEnter={() =>
              (document.getElementById("all").style.color = "#58A6FF")
            }
            onMouseLeave={() =>
              (document.getElementById("all").style.color = minimalStyle.color)
            }
            style={minimalStyle}
            to={"/"}
          >
            <h1>All</h1>
          </Link>
          <Link
            id="c"
            onMouseEnter={() =>
              (document.getElementById("c").style.color = "green")
            }
            onMouseLeave={() =>
              (document.getElementById("c").style.color = minimalStyle.color)
            }
            style={minimalStyle}
            to={"/completed"}
          >
            <h1>Completed</h1>
          </Link>
          <Link
            id="p"
            onMouseEnter={() =>
              (document.getElementById("p").style.color = "red")
            }
            onMouseLeave={() =>
              (document.getElementById("p").style.color = minimalStyle.color)
            }
            style={minimalStyle}
            to={"/pending"}
          >
            <h1>Pending</h1>
          </Link>
        </nav>
        <br />
        <span>
          <input
            placeholder="Enter something to do"
            id="text"
            type={"text"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={inputRef}
          ></input>
          <br />
          <input
            id="submitTask"
            value={"Add"}
            type="submit"
            onClick={addTask}
          />
        </span>
        <Routes>
          <Route
            path="/"
            element={
              <All
                deleteTask={deleteTask}
                click={statusHandler}
                display={tasks}
              />
            }
          />
          <Route
            path="/completed"
            element={
              <Completed
                deleteTask={deleteTask}
                click={statusHandler}
                display={tasks}
              />
            }
          />
          <Route
            path="/pending"
            element={
              <Pending
                deleteTask={deleteTask}
                click={statusHandler}
                display={tasks}
              />
            }
          />
        </Routes>
        <p className="developer">
          Developed by <strong>Fredwin</strong>
        </p>
      </BrowserRouter>
    </>
  );
}

export default Template;
