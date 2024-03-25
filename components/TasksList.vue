<script setup>
import { useTaskStore } from '@/store/store'
const { tasks } = useTaskStore()

const emit = defineEmits(['taskToEdit'])
const test = (taskID) => emit('taskToEdit', tasks[taskID - 1])
</script>

<template>
    <ul>
        <TaskItem 
        @edit-list-item="(taskID) => test(taskID)"
        v-for="task in tasks" 
        :key="task.id" 
        :taskID="task.id" 
        :taskBody="task.body" 
        :taskBodyFormated="task.bodyFormated"
        :isCompleted="task.isCompleted"></TaskItem>    
    </ul>
</template>

