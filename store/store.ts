export const useTaskStore = defineStore('tasks', () => {
    const taskList = ref([])
    
    const tasks = computed( () => taskList.value )
    const taskListNumber = computed(() => taskList.value.length)

    function addTaskToStore( newTask:any ) {
      //@ts-ignore
      taskList.value.push({ ...newTask })
    }
    
    function markAsCompleted( taskID:number ) {
      
    }
  
    return { tasks, taskListNumber, addTaskToStore, markAsCompleted }
  })