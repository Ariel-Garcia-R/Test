<script setup>
import Mark from 'mark.js';
import { useTaskStore } from "@/store/store";

const props = defineProps({
    editableTask: {
        type: Object,
        required: false,
        default: {}
    }
})

watch(props.editableTask, () => {
    console.log("llega la tarea a  la prop");
    if (isEmptyTask && isTaskBoxOpen) {
        newTask.id = props.editableTask.id
        newTask.body = props.editableTask.value.body
        newTask.bodyFormated = props.editableTask.bodyFormated
        newTask.isCompleted = props.editableTask.isCompleted
        highlighter.value.innerText = newTask.body
    }
})

const { taskListNumber, addTaskToStore } = useTaskStore()
const isTaskBoxOpen = ref(false)
const isEmptyTask = ref(true);
const highlighter = ref(null) // referencia al elemento del DOM
const newTask = reactive({
    id: null,
    body: '',
    bodyFormated: computed(() => useFormatTask(newTask.body)),
    isCompleted: false
})

const instance = ref(null); // Instancia de Mark.js

const updateText = () => {
    newTask.body = highlighter.value.innerText
    // newTask.bodyFormated = highlighter.value.innerText.replace(/(#\w+)/g, '<span style="display: inline-flex; height: 24px; align-items:center; background-color: #DBC7FF; color: #702EE6; font-weight: 500; border-radius: 12px; padding: 1px 8px; font-size: 0.875rem">$1</span>')


    nextTick(() => {
        if (instance.value) {
            instance.value.unmark(); // Limpiar resaltados anteriores
        }
        instance.value = new Mark(highlighter.value);
        instance.value.markRegExp(/(#\w+)/g, {
            className: 'text-[#702EE6] bg-transparent', // Clase CSS para el resaltado
            done: () => {
                // Aquí puedes manejar cualquier lógica adicional después de que el texto haya sido resaltado
            }
        });
    });
};

const toggleTaskBox = () => isTaskBoxOpen.value = !isTaskBoxOpen.value
const saveTaskToStore = () => {
    if (newTask.body === '') {
        toggleTaskBox()
    } else {
        addTaskToStore({ ...newTask, id: taskListNumber + 1, bodyFormated: `<p class="items-center">${newTask.bodyFormated}</p>` })
        newTask.id = null
        newTask.body = ''
        highlighter.value.innerText = ''
        newTask.bodyFormated = ''
        newTask.isCompleted = false
    }
}

watch(newTask, () => {
    if (newTask.body === '') {
        isEmptyTask.value = true
    } else {
        isEmptyTask.value = false
    }
});


</script>

<template>
    <button v-if="!isTaskBoxOpen" class="text-[#8A94A6] flex gap-4 items-center my-5" @click="toggleTaskBox">
        <PlusSquareIcon class="text-[#007FFF]" />
        <span>{{ $t('taskPlaceholder') }}</span>
    </button>
    <div v-else
        class="flex-col w-full rounded-t border border-[#F1F3F4] dark:border-gray-800 my-5">
        <div class="h-16 w-full max-w-[1360px] flex">
            <div class="mx-3 my-2">
                <PlusSquareIcon size="20" class="text-[#007FFF]" />
            </div>
            <div class="w-full dark:text-gray-500 pt-[5px] overflow-y-auto focus:outline-none" ref="highlighter"
                contenteditable="true" @input="updateText()"></div>
        </div>
        <div class="flex justify-between bg-[#FAFBFB] dark:bg-slate-800 h-14 items-center px-2">
            <div class="flex gap-[1px] xl:gap-1">
                <SharedIconButton :disabled="isEmptyTask"><template #icon>
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
                <SharedButton
                    class="hidden xl:block bg-[#EAF0F5] text-[#04142F] dark:bg-slate-700 dark:text-slate-300 disabled:bg-[#eaf0f594] disabled:text-slate-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-800">
                    {{ $t('cancelButton') }}</SharedButton>
                <SharedButton class="hidden xl:block" @click="saveTaskToStore()">{{ isEmptyTask ?
        $t('confirmButtonEmpty') :
        $t('confirmButton') }} </SharedButton>
                <SharedButton class="xl:hidden" @click="saveTaskToStore()">
                    <XIcon v-if="isEmptyTask && newTask.id === null" size="20" />
                    <SaveIcon v-else-if="!isEmptyTask && newTask.id" size="20" />
                    <PlusIcon v-else size="20" />
                </SharedButton>
            </div>
        </div>
    </div>
</template>
