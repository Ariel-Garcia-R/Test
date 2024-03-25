export const useTaskStore = defineStore('tasks', () => {
    const taskList = ref([])
    const editableTask = ref({})
    
    const tasks = computed( () => taskList.value )
    const taskListNumber = computed(() => taskList.value.length)

    function addTaskToStore( newTask:any ) {
      //@ts-ignore
      taskList.value.push({ ...newTask })
    }
    
    function markAsCompleted( taskID:number ) {
      
    }

    function setEditableTask( taskID:number ){
      //@ts-ignore
        editableTask.value = {...tasks[taskID]}
    }
  
    return { tasks, taskListNumber, addTaskToStore, markAsCompleted }
  })