import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import EasyEdit from "react-easy-edit";
import { ThemeProvider, ThemeContext } from "./theme";

// Variable cancel to Cancel when Editing
const cancel = () => {};

// Using EasyEdit to create text that can be edited inLine with a Checkbox
const EditableLine = ({
  checked,
  onCheckboxChange,
  onLineChange,
  line,
  className,
}) => {
  if (line === "\n") {
    line = "Click to edit"; // If line is empty before editing then give it placeholder value
  }

  return (
    <div className={`editable-line ${className}`}>
      <input type="checkbox" checked={checked} onChange={onCheckboxChange} />
      <EasyEdit
        type="text"
        onSave={(value) => onLineChange(value)}
        onCancel={cancel}
        saveButtonLabel={<button className="button">Save</button>}
        cancelButtonLabel={<button className="button">Cancel</button>}
        value={line || ""}
        onChange={(value) => onLineChange(value)}
      />
    </div>
  );
};

const List = () => {
  // Connect variables to theme.jsx
  const { theme, toggleTheme } = useContext(ThemeContext);
  // Initialize tasks and Checklist to empty set and allow them to persist values if values change
  const [tasks, setTasks] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  // Get the Tasks and CheckedList stored in Local Storage and Set the values received
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedCheckedList = localStorage.getItem("checkedList");
    const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
    const parsedCheckedList = storedCheckedList
      ? JSON.parse(storedCheckedList)
      : [];

    setTasks(parsedTasks);
    setCheckedList(parsedCheckedList);
  }, []);

  // Checks if task has been done (If Checkbox is Checked)
  const isChecked = (index) => {
    return checkedList[index] ? "checked-item" : "not-checked-item";
  };

  // Update CheckList which consists of values of list that are checked and unchecked in true or false to current list
  const updateCheckbox = (index) => {
    const updatedCheckedList = [...checkedList];
    updatedCheckedList[index] = !updatedCheckedList[index];
    setCheckedList(updatedCheckedList);
    localStorage.setItem("checkedList", JSON.stringify(updatedCheckedList));
  };

  // Update Lines and store Updated Lines in localStorage
  const updateLine = (index, newValue) => {
    const updatedTasks = [...tasks];
    if (newValue === "") {
      updatedTasks.splice(index, 1);
    } else {
      updatedTasks[index] = newValue;
    }
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Add a newline so that it can be edited thus adding a task. Update lines and LocalStorage
  const addTasks = () => {
    setTasks((prevTasks) => [...prevTasks, "\n"]);
    setCheckedList((prevCheckedList) => [...prevCheckedList, false]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, "\n"]));
  };

  const title = "To Do List";

  return (
    <div className={`List ${theme}`}>
      <div
        className="to-do-list"
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <div>
          <h1 className="title">{title}</h1>

          <button
            className="button2"
            style={{ margin: "10px" }}
            onClick={() => toggleTheme()}
          >
            {theme === "dark-theme" ? "Light Theme" : "Dark Theme"}
          </button>

          <button className="button" onClick={addTasks}>
            <b>{"+ADD TASK"}</b>
          </button>

          {tasks.map((line, index) => (
            <EditableLine
              key={index}
              line={line}
              checked={checkedList[index]}
              onCheckboxChange={() => updateCheckbox(index)}
              onLineChange={(value) => updateLine(index, value)}
              className={isChecked(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <List />
    </ThemeProvider>
  </React.StrictMode>
);
