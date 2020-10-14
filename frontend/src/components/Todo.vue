<template>
  <div class="card">
    <input
      type="text"
      id="inputData"
      placeholder="Add a task!"
      v-model="newTodo"
      v-on:keyup.enter="addTodo"
    />
    <button v-on:click="addTodo" id="add">Add</button>

    <div class="todo" v-for="(todo, index) in todos" :key="index">
      <span
        @click="checkTodo(todo._id)"
        :class="{ completed: todo.completed }"
        >{{ todo.text }}</span
      >
      <span class="clear" @click="removeTodo(todo._id)">X</span>
    </div>

    <button
      @click="removeCompletedTodos"
      id="clearButton"
      v-if="hasCompletedTodo"
    >
      Clear Completed
    </button>
  </div>
</template>

<script>
import axios from "axios";
// Options
const options = {
  headers: {
    "Content-Type": "application/json",
  },
};
const url = "api";

export default {
  name: "Todo",
  data() {
    return {
      todos: [],
      newTodo: null,
    };
  },
  async mounted() {
    // once the app has been mounted, fetch all todos
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      // using axios to get all todos
      // this takes time so using async/await
      const res = await axios.get(url);
      // once we have the data, update our todos data property
      // we loop through our todos data property and show it to user
      this.todos = res.data;
    },

    async addTodo() {
      // since we are using v-model at the input tag,
      // we can use this property to keep track whatever user types
      // this newTodo object will be included in our request
      const newTodo = {
        todo: {
          text: this.newTodo,
          completed: false,
        },
      };

      try {
        /*
          @POST because we want to insert new todo
        */
        await axios.post(url + "/add", newTodo, options);
        this.newTodo = "";
        // If successfull, refetch todos
        this.fetchTodos();
      } catch (error) {
        // catch if there's any error
        alert(error);
      }
    },

    async checkTodo(id) {
      try {
        /*
          @PUT because we want to update existing todo
          passing in index of the item that we want to update
        */
        await axios.put(url + "/update", { _id: id }, options);
        this.fetchTodos();
      } catch (error) {
        alert(error);
      }
    },
    async removeTodo(id) {
      try {
        /*
          @DELETE because we want to delete existing todo
          passing in index of the item that we want to delete
        */
        await axios.delete(url + "/delete" + `/${id}`, options);
        this.fetchTodos();
      } catch (error) {
        alert(error);
      }
    },
    async removeCompletedTodos() {
      try {
        /*
          @DELETE because we want to remove todos that are completed
        */
        const { data } = await axios.delete(
          url + "/removeCompletedTodos",
          options
        );
        console.log(data);
        this.fetchTodos();
      } catch (error) {
        alert(error);
      }
    },
  },
  computed: {
    hasCompletedTodo() {
      if (!this.todos.length) return false;
      return this.todos.some((todo) => todo.completed);
    },
  },
};
</script>
<style>
.card {
  width: 25%;
  background-color: #ffffff;
  margin: 0 auto;
  padding: 3em 2em 1em 3em;
  border-radius: 4px 4px 0 0;
  position: relative;
}
#inputData {
  margin-bottom: 1em;
  border: none;
  width: 70%;
  height: 2.3em;
  padding: 0 1em;
  border-bottom: 1px solid #8c8c8c;
  background-color: #ffffff;
  color: #333333;
}

button {
  border: none;
  padding: 0.7em 2em;
  background-color: #08898f;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 1px 2px 0 #333333;
  border-radius: 1px;
}

.todo {
  background-color: #f7f7f7;
  color: #333333;
  font-weight: bold;
  font-size: 0.85em;
  border-radius: 2px;
  text-align: left;
  margin: 0.7em 0;
  padding: 1.2em 1.5em;
}

.todo span {
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
}
.clear {
  float: right;
}

#clearButton {
  margin-bottom: -2em;
  position: absolute;
  bottom: 0%;
  left: 0%;
  width: 100%;
  padding: 0.8em 0;
}
</style>


