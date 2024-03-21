<script setup>
const props = defineProps({
    icon: {
        type: String,
        required: false
    },
    disabled:{
        type: Boolean,
        required: false
    }
})
</script>


<template>
    <button 
    :disabled="disabled" 
    class="py-2 pr-6 pl-4 border border-[#C6CDD2] rounded text-[14px] flex gap-2 h-10"
    :class=" disabled ? 'text-[#C6CDD2]' : 'text-[#8A94A6]' ">
        <slot name="icon" />
        <slot name="default"></slot>
    </button>
</template>
