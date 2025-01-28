import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      task: this.props.task
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleRemove() {
    this.props.removeTodo(this.props.id);
  }

  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleUpdate(evt) {
    evt.preventDefault();
    if(this.state.task==""){
      alert(`You can't add empty task`);
      return;
    }
    this.props.updateTodo(this.props.id, this.state.task);
    this.setState({ isEditing: false });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleToggle(evt) {
    this.props.toggleTodo(this.props.id);
  }

  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <form className="Todo-edit-form" onSubmit={this.handleUpdate}>
          <input
            type="text"
            value={this.state.task}
            name="task"
            onChange={this.handleChange}
          />
          <button>Save</button>
        </form>
      );
    } else {
      result = (
        <div className="Todo-task">
          <li
            className={this.props.completed ? "completed" : ""}
            onClick={this.handleToggle}
          >
            {this.props.task}
          </li>
        </div>
      );
    }

    return (
      <TransitionGroup className={this.props.completed ? "Todo completed" : "Todo"}>
        <CSSTransition key={this.props.id} timeout={500} classNames="fade">
          <div className="Todo">
            {result}
            <div className="Todo-buttons">
              <button onClick={this.toggleForm}>
                <i className="fas fa-pen" />
              </button>
              <button onClick={this.handleRemove}>
                <i className="fas fa-trash" />
              </button>
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default Todo;
