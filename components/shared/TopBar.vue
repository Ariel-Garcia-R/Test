<script setup>
const { locale } = useI18n()
const colorMode = useColorMode()
const isLenguageMenuOpen = ref(false)

const switchColorMode = () => {
    if (colorMode.preference != "dark") {
        colorMode.preference = "dark"
    }
    else {
        colorMode.preference = "light"
    }
}
</script>

<template>
    <nav class="dark:bg-slate-800 flex justify-between items-center px-4">
        <h1
            class="text-center text-2xl xl:text-4xl font-black my-3 bg-gradient-to-r from-[#0D55CF] via-blue-500 to-blue-300 text-transparent bg-clip-text">
            {{ $t('appTittle') }}
        </h1>
        <div class="flex gap-1">
            <SharedButton class="lg:px-3 xl:mx-3" @click="switchColorMode">
                <SunIcon v-if="colorMode.preference === 'dark'" />
                <MoonIcon v-else />
            </SharedButton>
            <div class="flex justify-center items-center">
                <div class="relative inline-block text-left">
                    <div>
                        <SharedButton @focusout="isLenguageMenuOpen = !isLenguageMenuOpen" @click="isLenguageMenuOpen = !isLenguageMenuOpen" type="button" class="px-3">
                            <GlobeIcon />
                        </SharedButton>
                    </div>

                    <div :class="{ 'hidden': !isLenguageMenuOpen }"
                        class="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5"
                        role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div class="py-1" role="none" >
                            <button @click="() => { locale = 'en'; isLenguageMenuOpen = false }"
                                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900"
                                role="menuitem">ENG</button>
                            <button @click="() => { locale = 'sp'; isLenguageMenuOpen = false }"
                                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900"
                                role="menuitem">ESP</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </nav>
</template>

<style lang="postcss">
body {
    @apply min-h-screen bg-white dark:bg-gray-900 dark:text-gray-200;
}
</style>