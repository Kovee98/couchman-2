<template>
    <div :class="{ 'dark': isDark }">
        <div class="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <TopBar
                @open-sidebar="isSideBarOpen = true"
            />

            <SideBar />

            <main class="container grid px-6 mx-auto">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script>
    import { computed, ref } from 'vue';
    import TopBar from './components/TopBar.vue';
    import SideBar from './components/SideBar.vue';
    import store from './js/store.js';

    export default {
        components: {
            TopBar,
            SideBar
        },

        setup () {
            const isSideBarOpen = ref(false);

            return {
                isDark: computed(() => store?.isDark),
                isSideBarOpen
            };
        }
    }
</script>
