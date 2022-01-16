window.todoApp = () => {
	return {
		todos: JSON.parse(localStorage.getItem("todos") || "[]"),

		editedTodo: null,

		filter: "all",

		newTodo: "",

		get filterdTodos() {
			return {
				all: this.todos,
				active: this.active,
				completed: this.completed,
			}[this.filter];
		},

		get active() {
			return this.todos.filter((todo) => !todo.completed);
		},

		get completed() {
			return this.todos.filter((todo) => todo.completed);
		},

		addTodo() {
			if (this.newTodo.trim() !== "") {
				const id = Date.now() + Math.floor(Math.random() * 1000000);
				this.todos.push({
					id: id,
					body: this.newTodo,
					completed: false,
				});
				this.newTodo = "";
			}
			this.newTodo = "";
		},

		editTodo(todo) {
			todo.cachedBody = todo.body;
			this.editedTodo = todo;
		},

		cancelEdit(todo) {
			todo.body = todo.cachedBody;
			this.editedTodo = null;
			delete todo.cachedBody;
		},

		editComplete(todo) {
			if (todo.body.trim() === "") {
				return this.deleteTodo(todo);
			}
			this.editedTodo = null;
		},

		deleteTodo(todo) {
			let position = this.todos.indexOf(todo);
			this.todos.splice(position, 1);
		},

		get allComplete() {
			return this.todos.length === this.completed.length;
		},

		toggleComplete() {
			let allComplete = this.allComplete;
			this.todos.forEach((todo) => (todo.completed = !allComplete));
		},

		clearCompleted() {
			this.todos = this.active;
		},
	};
};
