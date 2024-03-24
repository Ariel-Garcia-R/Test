<script setup>
import Mark from 'mark.js';
import { useTaskStore } from "@/store/store";

const { taskListNumber, addTaskToStore } = useTaskStore()
const isTaskBoxOpen = ref(false)
const isEmptyTask = ref(true);
const highlighter = ref(null) // referencia al elemento del DOM
const newTask = reactive({
    id: null,
    body: '',
    bodyFormated: computed(()=> useFormatTask(newTask.body)),
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
        addTaskToStore({...newTask, id: taskListNumber + 1, bodyFormated: `<p class="items-center">${newTask.bodyFormated}</p>`})
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
    <button v-if="!isTaskBoxOpen" class="text-[#8A94A6] flex gap-4 items-center" @click="toggleTaskBox">
        <PlusSquareIcon class="text-[#007FFF]" />
        <span>{{ $t('taskPlaceholder') }}</span>
    </button>
    <div v-else class="flex-col w-full max-w-[1360px] rounded-t border border-[#F1F3F4] mx-auto mb-5">
        <div class="h-16 w-full max-w-[1360px] flex">
            <div class="mx-3 my-2">
                <PlusSquareIcon size="20" class="text-[#007FFF]" />
            </div>
            <div class="w-full pt-[5px] overflow-y-scroll focus:outline-none" ref="highlighter" contenteditable="true" @input="updateText()"></div>
        </div>
        <div class="flex justify-between bg-[#FAFBFB] h-14 items-center px-2">
            <div class="flex gap-1">
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
                        <UnlockIcon size="20" />
                    </template>{{ $t('highlightButton') }}
                </SharedIconButton>
                <SharedIconButton :disabled="isEmptyTask"> <template #icon>
                        <UnlockIcon size="20" />
                    </template>{{ $t('estimationButton') }}</SharedIconButton>

            </div>
            <div class="flex gap-1">
                <SharedButton bg-color="#EAF0F5" color="black">{{ $t('cancelButton') }}</SharedButton>
                <SharedButton @keyup.enter="saveTaskToStore()" @click="saveTaskToStore()">{{ isEmptyTask ? $t('confirmButtonEmpty') : $t('confirmButton')
                    }}
                </SharedButton>
            </div>
        </div>
    </div>
</template>
