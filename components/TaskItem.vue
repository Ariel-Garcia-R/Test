<script setup lang="ts">
import { useTaskStore } from '~/store/store';
import { storeToRefs } from 'pinia';
import type { TaskInterface } from "~/types/taskInterface";

const taskStore = useTaskStore();
const { setEditingTask, setIsEditingExistingTask, deleteTask, completeTask } = taskStore;
const { getEditingTask, isCreatingNewTask } = storeToRefs(taskStore);

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
    <div @mouseenter="isShowingEditButton = true" @mouseleave="isShowingEditButton = false"
        :class="{ 'line-through': props.task.isCompleted }"
        class="dark:text-slate-500 flex items-center rounded hover:bg-slate-50 hover:dark:bg-slate-900 hover:opacity-70 hover:translate-x-1 hover:ease-in transition-all">
        <input @change="completeTask(props.task.id, !props.task.isCompleted)" :value="props.task.isCompleted"
            type="checkbox" name="list-item" :id="task.id"
            class="ml-0 mr-4 border border-[#8A94A6] dark:border-slate-500 shrink-0"
            style="height: 24px !important; width: 24px !important;">
        <li class="flex items-center my-2 dark:text-slate-500"
            :class="{ 'text-slate-300 dark:text-slate-700': itsBeenEdited }" v-html="props.task.formattedBody">
        </li>
        <div class="min-w-24" v-if="!isCreatingNewTask">
            <button class="ml-4 rounded p-1 text-blue-500 hover:text-white hover:bg-blue-500"
                v-if="isShowingEditButton && !itsBeenEdited" @click="setTaskToEdit()">
                <EditIcon size="20" />
            </button>
            <button class="mx-2 rounded p-1 text-red-600 hover:text-white hover:bg-red-600"
                v-if="isShowingEditButton && !itsBeenEdited" @click="deleteTask(props.task.id)">
                <TrashIcon size="20" />
            </button>
        </div>
    </div>
</template>
