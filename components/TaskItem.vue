<script setup>
const props = defineProps({
    taskBody: {
        type: String,
        required: true,
        default: 'This task is empty'
    },
    taskBodyFormated: {
        type: String,
        required: true,
        default: 'This task is empty'
    },
    taskID: {
        type: Number,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    }
})
const checked = ref(false)
</script>

<template>
    <div class="flex items-center">
        <input v-model="checked" type="checkbox" name="list-item" :id="taskID"
            class="ml-0 mr-4 border border-[#8A94A6] shrink-0" style="height: 24px !important; width: 24px !important;">
        <li @click="$emit('editListItem', taskID)" class="flex items-center my-2" :class="{ 'line-through': checked }" v-html="taskBodyFormated">
        </li>
    </div>
</template>
