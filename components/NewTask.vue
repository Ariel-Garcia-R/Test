<script setup>
import { useTaskStore } from "@/store/store";
const { taskListNumber, addTaskToStore } = useTaskStore()
const isTaskBoxOpen = ref(false)

const newTask = ref({
    id: taskListNumber + 1,
    body: '',
    isCompleted: false
})
const toggleTaskBox = () => isTaskBoxOpen.value = !isTaskBoxOpen.value
const saveTaskToStore = () => {
    if (newTask.value.body === '') {
        toggleTaskBox()
    } else {
        addTaskToStore(newTask.value)
        newTask.value.body = ''
    }
}

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
            <textarea v-model="newTask.body" class="textarea-custom w-full pt-2 resize-none focus:outline-none "
                name="task-description" id="task-description">
            </textarea>
        </div>
        <div class="flex justify-between bg-[#FAFBFB] h-14 items-center px-2">
            <div class="flex gap-1">
                <SharedIconButton :disabled="false"><template #icon>
                        <Maximize2Icon size="20" />
                    </template>{{ $t('openButton') }}
                </SharedIconButton>
                <SharedIconButton :disabled="true"> <template #icon>
                        <CalendarIcon size="20" />
                    </template>{{ $t('todayButton') }} </SharedIconButton>
                <SharedIconButton :disabled="true"> <template #icon>
                        <UnlockIcon size="20" />
                    </template>{{ $t('publicButton') }}</SharedIconButton>
                <SharedIconButton :disabled="true"> <template #icon>
                        <UnlockIcon size="20" />
                    </template>{{ $t('highlightButton') }}
                </SharedIconButton>
                <SharedIconButton :disabled="true"> <template #icon>
                        <UnlockIcon size="20" />
                    </template>{{ $t('estimationButton') }}</SharedIconButton>

            </div>
            <div class="flex gap-1">
                <SharedButton bg-color="#EAF0F5" color="black">{{ $t('cancelButton') }}</SharedButton>
                <SharedButton @click="saveTaskToStore()">{{ $t('confirmButton') }}</SharedButton>
            </div>
        </div>
    </div>
</template>
