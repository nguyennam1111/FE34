import React from "react";
import { Button } from "antd";

const Task = () => {
  return (
    <React.Fragment>
      <tr>
        <td className="todo-list-body_task_index">1.</td>
        <td className="todo-list-body_task_content">aaaaa bbb ccc fdddd</td>

        <td className="todo-list-body_task_status">Complete</td>
        <td>
          <Button type="primary" className="todo-list-body_task_btn-edit">
            Edit
          </Button>
          <Button type="primary" danger className="todo-list-body_task_btn-del">
            Delete
          </Button>
        </td>
      </tr>
    </React.Fragment>
  );
};
export default Task;
