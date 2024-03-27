<script setup>
import { useTaskStore } from "@/store/store";
import { storeToRefs } from 'pinia'

const taskStore = useTaskStore()
const { addTask, setIsCreatingNewTask, setIsEditingExistingTask, updateTask } = taskStore
const { isEditingExistingTask, getEditingTask } = storeToRefs(taskStore)
const defaultTaskItem = {
    id: null,
    body: '',
    formattedBody: '',
    isCompleted: false
}

const isTaskBoxOpen = ref(false)
const taskItem = reactive({ ...defaultTaskItem })
const creatingNewTask = computed(() => taskItem.body != '' && isTaskBoxOpen && !taskItem.id)
const isEmptyTask = computed(() => taskItem.body === '');
const toggleTaskBox = () => isTaskBoxOpen.value = !isTaskBoxOpen.value

watch(creatingNewTask, () => {
    setIsCreatingNewTask(creatingNewTask.value)
})

watch(isEditingExistingTask, () => {
    if (isEmptyTask) {
        Object.assign(taskItem, getEditingTask.value)
    }
})

const clearTaskEditor = () => {
    Object.assign(taskItem, defaultTaskItem);
}

const saveTaskToStore = () => {
    if (isEmptyTask.value) {
        toggleTaskBox()
    }
    else if (taskItem.id) {
        updateTask({ ...taskItem })
        setIsEditingExistingTask(false)
        clearTaskEditor()
    }
    else {
        addTask(taskItem)
        clearTaskEditor()
    }
}


</script>

<template>
    <button v-if="!isTaskBoxOpen" class="text-[#8A94A6] flex gap-4 items-center my-5" @click="toggleTaskBox">
        <PlusSquareIcon class="text-[#007FFF]" />
        <span>{{ $t('taskPlaceholder') }}</span>
    </button>
    <div v-else class="flex-col w-full rounded-t border border-[#F1F3F4] dark:border-gray-800 my-5">
        <div class="h-16 w-full max-w-[1360px] flex">
            <div class="mx-3 my-2">
                <PlusSquareIcon size="20" class="text-[#007FFF]" />
            </div>
            <textarea id="task-editor" name="task-editor" v-model="taskItem.body"
                class="resize-none w-full dark:bg-gray-900 dark:text-gray-500 pt-[5px] overflow-y-auto focus:outline-none"
                resize="false"></textarea>
        </div>
        <div class="flex justify-between bg-[#FAFBFB] dark:bg-slate-800 h-14 items-center px-2">
            <div class="flex gap-[5px] xl:gap-1">
                <SharedIconButton :disabled="isEmptyTask"
                    class="bg-[#EAF0F5] disabled:text-opacity-55 text-black border-none dark:bg-slate-700 dark:text-slate-400 dark:disabled:text-slate-500"
                    icon-class="disabled:text-[#4E5D78] text-[#04142F] dark:disabled:text-slate-600 dark:text-slate-500">
                    <template #icon>
                        <Maximize2Icon size="20" />
                    </template>{{ $t('openButton') }}
                </SharedIconButton>
                <SharedIconButton :disabled="isEmptyTask"> <template #icon>
                        <CalendarIcon size="20" />
                    </template>{{ $t('todayButton') }} </SharedIconButton>
                <SharedIconButton :disabled="isEmptyTask"> <template #icon>
                        <UnlockIcon size="20" />
                    </template>{{ $t('publicButton') }}</SharedIconButton>
                <SharedIconButton :disabled="isEmptyTask"> <template #icon>
                        <PenToolIcon size="20" />
                    </template>{{ $t('highlightButton') }}
                </SharedIconButton>
                <SharedIconButton :disabled="isEmptyTask"> <template #icon>
                        <StopCircleIcon size="20" />
                    </template>{{ $t('estimationButton') }}</SharedIconButton>

            </div>
            <div class="flex gap-1">
                <SharedButton class="hidden xl:block bg-[#EAF0F5] text-slate-950 dark:bg-slate-700 dark:text-slate-300">
                    {{ $t('cancelButton') }}</SharedButton>
                <SharedButton class="hidden xl:block" @click="saveTaskToStore()">{{ isEmptyTask ?
        $t('confirmButtonEmpty') :
        (isEditingExistingTask ? $t('confirmSaveButton') : $t('confirmButton')) }} </SharedButton>
                <SharedButton class="xl:hidden" @click="saveTaskToStore()">
                    <XIcon v-if="isEmptyTask && taskItem.id === null" size="20" />
                    <SaveIcon v-else-if="!isEmptyTask && taskItem.id" size="20" />
                    <PlusIcon v-else size="20" />
                </SharedButton>
            </div>
        </div>
    </div>
</template>
