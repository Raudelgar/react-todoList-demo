import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
	getStyle = () => {
		return {
			backgroundColor: '#f4f4f4',
			padding: '10px',
			borderBottom: '1px #ccc dotted',
			textDecoration: this.props.todo.completed ? 'line-through' : 'none'
		};
	};

	render() {
		const { id, title } = this.props.todo;
		return (
			<div style={this.getStyle()}>
				<p>
					<input
						type='checkbox'
						onChange={() => this.props.completedTodo(id)}
					/>
					{'  '}
					{title}
					<button
						className='deleteBtn'
						onClick={this.props.deleteItem.bind(this, id)}
					>
						X
					</button>
				</p>
			</div>
		);
	}
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	completedTodo: PropTypes.func.isRequired,
	deleteItem: PropTypes.func.isRequired
};

export default TodoItem;
