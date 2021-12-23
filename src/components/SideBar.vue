<template>
    <!-- Backdrop -->
    <div
        v-show="isOpen"
        @click="isOpen = false"
        class="fixed inset-0 z-200 flex items-end bg-black bg-opacity-50 items-center justify-center"
    />

    <aside
        class="fixed inset-y-0 z-250 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 transition-all duration-200 ease-out"
        :class="isOpen ? 'left-0 opactiy-100' : '-left-[16rem] opactiy-0'"
        @blur="isOpen = false"
        @keydown.escape="isOpen = false"
    >
        <div class="py-4 text-gray-500 dark:text-gray-400">
            <span class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
                Connections
            </span>

            <div class="mt-6">
                <SideBarItem
                    v-for="conn in store.conns"
                    :key="conn.id"
                    :conn="conn"
                    @edit-conn="editConn(conn)"
                    @rm-conn="rmConn(conn)"
                />
            </div>
            <div class="px-6 my-6">
                <button
                    @click="addConn"
                    class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                >
                    Add Connection
                    <span class="ml-2">+</span>
                </button>
            </div>
        </div>
    </aside>

    <ConnectionModal />
</template>

<script>
    import { ref, computed } from 'vue';
    import SideBarItem from './SideBarItem.vue';
    import ConnectionModal from './ConnectionModal.vue';
    import store from '../js/store.js';
    import emitter from '../js/mitt.js';

    export default {
        components: {
            SideBarItem,
            ConnectionModal
        },

        setup () {
            const isOpen = ref(false);

            const addConn = () => {
                isOpen.value = false;
                emitter.emit('create-conn');
            };

            const editConn = (conn) => {
                emitter.emit('edit-conn', conn);
            };

            const rmConn = (conn) => {
                if (conn.id === store?.currConn) {
                    store.currConn = 0;
                }

                delete(store?.conns[conn.id]);
            };

            emitter.on('open-sidebar', () => isOpen.value = true);
            emitter.on('toggle-sidebar', () => isOpen.value = !isOpen.value);

            return {
                isOpen,
                store,
                emitter,
                addConn,
                editConn,
                rmConn
            };
        }
    }
</script>
