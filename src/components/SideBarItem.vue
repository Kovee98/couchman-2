<template>
    <div
        class="flex w-full pl-4 pr-3 py-4 border-l-4 border-transparent"
        :class="{ 'border-purple-600' : isActive }"
    >
        <button
            @click="changeConn"
            class="w-full inline-flex items-center justify-between text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            :class="{ 'text-gray-800 dark:text-gray-100': isActive }"
        >

            <span class="flex items-center">
                <!-- <i class="icon-plug" /> -->
                <i class="icon-plug-1" />
                <span class="ml-4">{{ conn.name }}</span>
            </span>
        </button>

        <button
            @click.stop="$emit('edit-conn')"
            class="hover:text-gray-800 dark:hover:text-gray-200"
        >
            <i class="icon-pencil text-sm" />
        </button>

        <button
            v-if="!isVerify"
            @click="verify"
            class="hover:text-gray-800 dark:hover:text-gray-200"
        >
            <i class="icon-trash" />
        </button>

        <button
            v-if="isVerify"
            @click.stop="$emit('rm-conn')"
            class="hover:text-gray-800 dark:hover:text-gray-200"
        >
            <i class="icon-warning" />
        </button>
    </div>
</template>

<script>
    import { computed, toRefs, ref } from 'vue';
    import store from '../js/store.js';

    export default {
        props: {
            conn: Object
        },

        setup (props) {
            const { conn } = toRefs(props);
            const isVerify = ref(false);
            const isActive = computed(() => store?.currConn === conn.value.id);

            const changeConn = () => {
                store.currConn = conn.value.id;
            };

            const verify = () => {
                isVerify.value = true;
                setTimeout(() => {
                    isVerify.value = false;
                }, 3000);
            };

            return {
                isVerify,
                isActive,
                store,
                changeConn,
                verify
            };
        },
    };
</script>

<style lang="scss" scoped>
    .active {
        > span {
            @apply 
                bg-gray-100
        }

        > button {
            @apply
                text-gray-800
                dark:text-gray-100
        }
    }
</style>
