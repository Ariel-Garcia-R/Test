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
    class="py-2 px-2 xl:pr-6 xl:pl-4 xl:border xl:border-[#C6CDD2] dark:xl:border-gray-700 rounded text-[14px] flex place-items-center gap-2 h-10"
    :class=" disabled ? 'text-[#C6CDD2] dark:text-slate-700' : 'text-[#8A94A6] dark:text-slate-500 dark:xl:border-gray-600' ">
        <slot name="icon" />
        <span class="hidden xl:block"><slot name="default" /></span>
    </button>
</template>
