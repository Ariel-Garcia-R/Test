<script setup>
const props = defineProps({
    disabled:{
        type: Boolean,
        required: false
    },
    class:{
        type: String,
        required: false,
        default: ''
    },
    bgColor:{
        type: String,
        required: false,
        default:'#0D55CF'
    },
    color:{
        type: String,
        required: false,
        default: 'white'
    }
})
</script>


<template>
    <button 
    :disabled="disabled" 
    class="py-2 px-3 lg:px-6 rounded text-[14px] flex place-items-center gap-2 h-10 font-medium"
    :class="`${props.class} ${disabled ? 'text-[#C6CDD2]' : 'text-[#8A94A6]'}`"
    :style="`background-color: ${props.bgColor}; color: ${props.color}`">
        <slot />
    </button>
</template>
