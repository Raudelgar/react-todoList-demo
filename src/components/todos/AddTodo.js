import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddTodo extends Component {
	state = {
		title: ''
	};

	getTitle = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitItem = e => {
		e.preventDefault();
		const title = this.state.title;
		if (!title.trim()) return false;

		this.props.addNewItem(this.state.title);
		this.setState({ title: '' });
	};

	render() {
		return (
			<form style={{ display: 'flex' }} onSubmit={this.submitItem}>
				<input
					style={{
						flex: '10',
						padding: '5px'
					}}
					type='text'
					name='title'
					placeholder='Write your Todo...'
					value={this.state.title}
					onChange={this.getTitle}
				/>
				<input
					className='submitBtn'
					style={{ flex: '1' }}
					type='submit'
					value='Submit'
				/>
			</form>
		);
	}
}

AddTodo.propTypes = {
	addNewItem: PropTypes.func.isRequired
};
