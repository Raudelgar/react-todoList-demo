import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import Todos from './components/todos/Todos.js';
import Header from './components/layout/Header.js';
import AddTodo from './components/todos/AddTodo.js';
import About from './components/pages/About.js';

import './App.css';

class App extends Component {
	state = {
		todos: []
	};

	completedTodo(id) {
		this.setState({
			todos: this.state.todos.map(todo => {
				if (id === todo.id) {
					todo.completed = !todo.completed;
				}

				return todo;
			})
		});
	}

	async deleteItem(id) {
		try {
			const response = await axios.delete(
				`https://jsonplaceholder.typicode.com/todos/${id}`
			);
			if (response.status >= 200 && response.status < 300) {
				this.setState({
					todos: this.state.todos.filter(todo => id !== todo.id)
				});
			}
		} catch (error) {
			console.log(`Error deleting item: ${error}`);
		}
	}

	addTodo = title => {
		axios
			.post('https://jsonplaceholder.typicode.com/todos', {
				title,
				completed: false
			})
			.then(res => {
				if (res.status >= 200 && res.status < 300) {
					const todos = [...this.state.todos];
					todos.push(res.data);
					this.setState({
						todos
					});
				} else {
					console.log(`Post response error status: ${res.status}`);
				}
			})
			.catch(err => console.log(err));
	};

	async componentDidMount() {
		try {
			let response = await axios.get(
				'https://jsonplaceholder.typicode.com/todos'
			);

			if (response.status >= 200 && response.status < 300) {
				let data = [];
				for (let i = 0; i <= 5; i++) {
					let { id, title, completed } = response.data[i];
					let o = Object.assign(
						{},
						{
							id,
							title,
							completed
						}
					);
					data.push(o);
				}
				this.setState({ todos: this.state.todos.concat(data) });
			}
		} catch (error) {
			console.log(`Error loading initial data: ${error}`);
		}
	}

	render() {
		return (
			<Router>
				<div className='App'>
					<div className='container'>
						<Header />
						<Route
							exact
							path='/'
							render={() => (
								<React.Fragment>
									<AddTodo addNewItem={this.addTodo} />
									<Todos
										todos={this.state.todos}
										completedTodo={this.completedTodo.bind(this)}
										deleteItem={this.deleteItem.bind(this)}
									/>
								</React.Fragment>
							)}
						/>
						<Route path='/about' component={About} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
