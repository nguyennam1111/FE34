"use strict";
const HelloFunction = (props) => {
  console.log(props);
  return (
    <div className={props.class}>
      <h1>Nguyen Van A</h1>
      {props.children}
      {props.gender}
      <p>FE-34</p>
      <hr></hr>
    </div>
  );
};
export default HelloFunction;
