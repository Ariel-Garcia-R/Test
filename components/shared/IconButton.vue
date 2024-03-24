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
    class="py-2 px-2.5 lg:pr-6 lg:pl-4 border border-[#C6CDD2] rounded text-[14px] flex place-items-center gap-2 h-10"
    :class=" disabled ? 'text-[#C6CDD2]' : 'text-[#8A94A6]' ">
        <slot name="icon" />
        <span class="hidden xl:block"><slot name="default" /></span>
    </button>
</template>
