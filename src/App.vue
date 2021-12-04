<template>
    <div :class="{ 'dark': isDark }">
        <div v-if="$route.meta.navbar === false">
            <router-view />
        </div>
        <div v-else>
            <NavBar>
                <router-view />
            </NavBar>
        </div>
    </div>
</template>

<script>
    import { computed } from 'vue';
    import NavBar from './components/NavBar.vue';
    import store from './js/store.js';

    export default {
        components: {
            NavBar
        },

        setup () {
            return {
                isDark: computed(() => store?.isDark)
            };
        }
    }
</script>
