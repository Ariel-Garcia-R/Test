<script setup>
import { useTaskStore } from '@/store/store'
const { tasks } = useTaskStore()
</script>

<template>
    <ul class="w-full">
        <TaskItem 
        v-for="task in tasks" 
        :key="task.id" 
        :task="task"></TaskItem>    
    </ul>
</template>

