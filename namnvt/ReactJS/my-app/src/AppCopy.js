import logo from "./logo.svg";
import "./App.css";
import React from "react";
import HelloFunction from "./components/HelloFunction";
import HelloClass from "./components/HelloClass";

function AppCopy() {
  return (
    <div className="App">
      <h1>Main</h1>
      <HelloFunction gender="Male" class="custom-class">
        <p>This is chilren</p>
      </HelloFunction>
    </div>
  );
}

export default AppCopy;
