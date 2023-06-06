import React from "react";

import { Divider, Button } from "antd";
const InputTask = () => {
  return (
    <React.Fragment>
      <div className="todo-list-header">
        <div className="todo-list-header_display">
          <h2 className="todo-list-header_title">To do list application</h2>
          <label htmlFor="">
            Search
            <input type="text"></input>
          </label>
        </div>

        <div className="todo-list-header_task">
          <div>
            <input
              size="large"
              className="todo-list-header_task-input"
              placeholder="Enter task"
            ></input>
          </div>
          <div>
            <Button type="primary" className="todo-list-header_task-btnAdd">
              Add Task
            </Button>
          </div>
        </div>
        <Divider className="todo-list-header_divider" />
      </div>
    </React.Fragment>
  );
};
export default InputTask;
