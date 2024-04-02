<script setup lang="ts">
import { useTaskStore } from '@/store/store';
import type { TaskInterface } from "~/types/taskInterface";

const { tasks } = useTaskStore();
const typedTasks = tasks as TaskInterface[];
</script>

<template>
  <ul class="w-full">
    <TaskItem
      v-for="task in typedTasks"
      :key="task.id"
      :task="task"
    />
  </ul>
</template>
