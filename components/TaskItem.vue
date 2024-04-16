<script setup lang="ts">
import { useTaskStore } from '~/store/store';
import { storeToRefs } from 'pinia';
import type { TaskInterface } from "~/types/taskInterface";

const taskStore = useTaskStore();
const { setEditingTask, setIsEditingExistingTask, deleteTask, completeTask } = taskStore;
const { getEditingTask, isCreatingNewTask, isEditingExistingTask } = storeToRefs(taskStore);

const props = defineProps<{
    task: TaskInterface;
}>();

const itsBeenEdited = computed(() => getEditingTask.value.id === props.task.id);
const isShowingEditButton = ref(false);

const setTaskToEdit = () => {
    setIsEditingExistingTask(true);
    setEditingTask(props.task);
};
</script>

<template>
  <div
    :class="{ 'line-through': props.task.isCompleted }"
    class="dark:text-slate-500 flex relative items-center rounded hover:translate-x-1 hover:ease-in transition-all"
    @mouseenter="isShowingEditButton = true"
    @mouseleave="isShowingEditButton = false"
  >
    <input
      :id="task.id"
      :checked="props.task.isCompleted"
      type="checkbox"
      name="list-item"
      class="ml-0 mr-4 border border-[#8A94A6] dark:border-slate-500 shrink-0"
      style="height: 24px !important; width: 24px !important;"
      @change="completeTask(props.task.id, !props.task.isCompleted)"
    >
    <li
      class="flex items-center my-2 dark:text-slate-500"
      :class="{ 'text-slate-300 dark:text-slate-700': itsBeenEdited }"
      v-html="props.task.formattedBody"
    />
    <div
      v-if="!isCreatingNewTask && !isEditingExistingTask"
      class="min-w-44 flex items-center justify-end transition-all duration-300 ease-out h-full absolute right-0 bg-gradient-to-r to-60% from-transparent to-white dark:to-gray-900"
      :class="isShowingEditButton ? 'opacity-1' : 'opacity-0'"
    >
      <button
        v-if="isShowingEditButton && !itsBeenEdited"
        class="ml-4 rounded p-1 text-blue-500 hover:text-white hover:bg-blue-500"
        @click="setTaskToEdit()"
      >
        <EditIcon size="20" />
      </button>
      <button
        v-if="isShowingEditButton && !itsBeenEdited"
        class="mx-2 rounded p-1 text-red-600 hover:text-white hover:bg-red-600"
        @click="deleteTask(props.task.id)"
      >
        <TrashIcon size="20" />
      </button>
    </div>
  </div>
</template>