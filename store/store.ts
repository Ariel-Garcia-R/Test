import { defineStore } from 'pinia';
import { getLocalStorageTasks } from '~/helpers/getLocalStorageTasks';
import type { TaskInterface } from "~/types/taskInterface";

// Define the store
export const useTaskStore = defineStore('tasks', () => {
  // Initialize reactive references with specific types

  const taskArray = ref<TaskInterface[]>(getLocalStorageTasks());
  const creatingNewTask = ref(false);
  const editingExistingTask = ref(false);
  const editingTask = ref<TaskInterface>({
    id: '',
    body: '',
    formattedBody: '',
    isCompleted: false
  });

  // Getters
  const tasks = computed(() => taskArray.value);
  const taskListNumber = computed(() => taskArray.value.length);
  const isCreatingNewTask = computed(() => creatingNewTask.value);
  const isEditingExistingTask = computed(() => editingExistingTask.value);
  const getEditingTask = computed(() => editingTask.value);

  // Setters
  function setIsCreatingNewTask(status: boolean) {
    creatingNewTask.value = status;
  }

  function setIsEditingExistingTask(status: boolean) {
    editingExistingTask.value = status;
  }

  function setEditingTask(task: TaskInterface) {
    editingTask.value = task;
  }

  function setClearEditingTask() {
    editingTask.value = {
      id: '',
      body: '',
      formattedBody: '',
      isCompleted: false
    };
  }

  // Add a task to the store
  function addTask(newTaskToAdd: TaskInterface) {
    taskArray.value.push({ ...newTaskToAdd, formattedBody: useFormatTask(newTaskToAdd.body), id: String(Math.floor(Math.random() * 100000000 + 1)) });
    localStorage.setItem('tasks', JSON.stringify(taskArray.value))
  }

  // Update an existing task
  function updateTask(taskToUpdate: TaskInterface) {
    const taskToUpdateIndex = taskArray.value.findIndex(task => task.id === taskToUpdate.id);
    if (taskToUpdateIndex !== -1) {
      taskArray.value[taskToUpdateIndex] = {
        ...taskToUpdate, formattedBody: useFormatTask(taskToUpdate.body)
      };
      localStorage.setItem('tasks', JSON.stringify(taskArray.value))
      setClearEditingTask();
    } else {
      throw new Error("Update Task index not found");
    }
  }

  // Delete a task by ID
  function deleteTask(taskID: string) {
    const deletedTaskIndex = taskArray.value.findIndex(task => task.id === taskID);
    if (deletedTaskIndex !== -1) {
      taskArray.value.splice(deletedTaskIndex, 1);
      localStorage.setItem('tasks', JSON.stringify(taskArray.value))
    } else {
      throw new Error("Task index not found");
    }
  }

  // Mark a task as completed
  function completeTask(taskID: string, status: boolean) {
    const completeTaskIndex = taskArray.value.findIndex(task => task.id === taskID);
    if (completeTaskIndex !== -1) {
      taskArray.value[completeTaskIndex].isCompleted = status;
      localStorage.setItem('tasks', JSON.stringify(taskArray.value))
    } else {
      throw new Error("Task not found");
    }
  }


  return {
    tasks,
    taskListNumber,
    addTask,
    isCreatingNewTask,
    completeTask,
    setIsCreatingNewTask,
    setIsEditingExistingTask,
    setEditingTask,
    setClearEditingTask,
    isEditingExistingTask,
    getEditingTask,
    updateTask,
    deleteTask
  };
});
