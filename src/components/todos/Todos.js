import React, { Component } from 'react';
import TodoItem from './TodoItem.js';
import PropTypes from 'prop-types';

export default class Todos extends Component {
	render() {
		return this.props.todos.map(todo => (
			<TodoItem
				key={todo.id}
				todo={todo}
				completedTodo={this.props.completedTodo}
				deleteItem={this.props.deleteItem}
			/>
		));
	}
}

Todos.propTypes = {
	todos: PropTypes.array.isRequired,
	completedTodo: PropTypes.func.isRequired,
	deleteItem: PropTypes.func.isRequired
};
