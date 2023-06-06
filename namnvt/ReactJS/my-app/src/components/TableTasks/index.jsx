import React from "react";
import "../Task/style.css";
import { Divider, Button } from "antd";
import Task from "../Task/index2";
const TableTasks = () => {
  return (
    <React.Fragment>
      <table className="todo-list-body">
        <thead>
          <tr>
            <td className="todo-list-body_task_index">No.</td>
            <td className="todo-list-body_task_content">Task content</td>
            <td className="todo-list-body_task_status">Status</td>
            <td colSpan={2} className="todo-list-body_task_action">
              Action
            </td>
          </tr>
        </thead>
        <tbody>
          <Task />
          <Task />
          <Task />
          <Task />
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default TableTasks;
