<script setup>
const props = defineProps({
    taskBody:{
        type: String,
        required: true,
        default: 'This task is empty'
    },
    taskId:{
        type: Number,
        required: true
    },
    isCompleted:{
        type: Boolean,
        required: true
    }
})
const checked = ref(false)
</script>

<template>
    <li class="flex my-2"
        :class="{'line-through': checked}"> 
        <input 
        v-model="checked"
        type="checkbox" 
        name="list-item" 
        :id="taskID"
        class="h-6 w-6 ml-0 mr-4 border border-[#8A94A6]"
        >
        {{ taskBody }}</li>
</template>

