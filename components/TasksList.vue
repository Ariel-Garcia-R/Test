<script setup>
import { useTaskStore } from '@/store/store'
const { tasks } = useTaskStore()
</script>

<template>
    <ul>
        <TaskItem v-for="task in tasks" :key="task.id" :taskId="task.id" :taskBody="task.body" :isCompleted="task.isCompleted"></TaskItem>    
    </ul>
</template>

