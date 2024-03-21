<script setup>
const { locale } = useI18n()
</script>

<template>
    <nav class="flex justify-between mx-4">
        <h1
            class="text-center text-4xl font-black my-3 bg-gradient-to-r from-[#0D55CF] via-blue-500 to-blue-300 text-transparent bg-clip-text">
        {{ $t('appTittle') }}
        </h1>
        <div class="flex w-10">
            <form>
                <select v-model="locale">
                    <option value="en">Eng</option>
                    <option value="sp">Esp</option>
                </select>
            </form>
        </div>

    </nav>
</template>
