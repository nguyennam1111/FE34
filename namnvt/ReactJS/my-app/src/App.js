import "./App.css";
import "./components/Task/style.css";
import "./components/InputTask/input_task.css";
import React from "react";
import { Pagination, Table } from "antd";

import InputTask from "./components/InputTask";
import TableTasks from "./components/TableTasks";

function App() {
  return (
    <div className="App">
      <div className="todo-list-container">
        <div className="todo-list-wrap">
          <form className="todo-list">
            <InputTask />
            <TableTasks />
            <div className="todo-list-footer">
              <Pagination defaultCurrent={1} total={50} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
