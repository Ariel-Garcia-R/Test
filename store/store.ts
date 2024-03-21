export const useTaskStore = defineStore('tasks', () => {
    const taskList = ref([
        {id: 1, body: 'Esto es una talla loca', isCompleted: false},
        {id: 2, body: 'Que clase loco tu eres asere', isCompleted: false}
    ])
    
    const tasks = computed( () => taskList.value )
    const taskListNumber = computed(() => taskList.value.length)

    function addTaskToStore( newTask:any ) {
      taskList.value.push({ ...newTask })
    }

    function markAsCompleted( taskID:number ) {
      const task = taskList.value.find( ( task ) => task.id === taskID )
      if (task) {
        task.isCompleted = true
      }
    }
  
    return { tasks, taskListNumber, addTaskToStore, markAsCompleted }
  })