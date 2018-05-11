import * as React from "react";

class App extends React.PureComponent {
  state = {
    key: "",
    value: ""
  };

  changeKey = ev => {
    this.setState({
      key: ev.target.value
    });
  };

  changeValue = ev => {
    this.setState({
      value: ev.target.value
    });
  };

  handleAdd = () => {
    this.props.addParam(this.state.key, this.state.value);
    this.setState({
      value: ""
    });
  };

  handleRemove = () => {
    this.props.removeParam(this.state.key);
    this.setState({
      key: "",
      value: ""
    });
  };

  render() {
    const { key, value } = this.state;
    return (
      <div>
        <h3>App</h3>
        <input type="text" value={key} onChange={this.changeKey} />
        <input type="text" value={value} onChange={this.changeValue} />
        <button onClick={this.handleAdd}>Add</button>
        <button onClick={this.handleRemove}>Remove</button>
        <h6>params:</h6>
        {JSON.stringify(this.props.state)}
      </div>
    );
  }
}

export default App;

// const App = ({ state, addParam, removeParam }) => {
//   return (
//     <div>
//       App {JSON.stringify(state)}{" "}
//       <button
//         onClick={() => {
//           addParam("kek", "bur");
//         }}
//       >
//         Add
//       </button>
//       <button
//         onClick={() => {
//           removeParam("kek");
//         }}
//       >
//         Remove
//       </button>
//     </div>
//   );
// };
//
// export default App;
