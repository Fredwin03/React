import React from "react";

function Pending(props) {
  const display = props.display;
  const completed = display.filter(
    (val, index, arr) => !arr[index].isCompleted
  );

  return (
    <ul>
      {completed.map((item) => (
        <div className="tasks" key={item.id}>
          <li onClick={() => props.click(item)}>{item.task}</li>
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

export default Pending;
