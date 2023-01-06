import React from "react";

function All(props) {
  const tasks = props.display;
  return (
    <ul>
      {tasks.map((item) => (
        <div id={item.id} className="tasks" key={item.id}>
          <li className="tasks" onClick={() => props.click(item)}>
            {item.isCompleted ? <s> {item.task}</s> : item.task}
          </li>
          <input
            className="delete"
            onClick={() => props.deleteTask(item.id)}
            type={"submit"}
            value={"Delete"}
          />
        </div>
      ))}
    </ul>
  );
}

export default All;
