<template>
    <Modal
        @close="closeModal"
        :isOpen="isOpen"
        :title="`${mode} Connection`"
    >
        <template v-slot:default>
            <InputText
                v-model="connection.name"
                label="Name"
                placeholder="Connection 1"
                description="Name this connection"
            />
            <InputText
                v-model="connection.url"
                label="URL"
                placeholder="http://localhost:5984"
                description="The url for the server"
            />
            <InputText
                v-model="connection.user"
                label="Username"
            />
            <InputText
                v-model="connection.pass"
                label="Password"
                :password="true"
            />
        </template>

        <template v-slot:footer>
            <!-- delete/cancel -->
            <button
                @click="closeModal"
                class="btn-flat mr-2"
            >
                Cancel
            </button>

            <div class="float-right">
                <button
                    @click="testConn"
                    class="btn-flat mr-2"
                    :class="testClass"
                >
                    <span v-if="testRes === 0">Test</span>
                    <i v-if="testRes === 2" class="icon-loading animate-spin" />
                    <i v-if="testRes === 1" class="icon-check" />
                    <i v-if="testRes === -1" class="icon-error" />
                </button>

                <button
                    @click="saveConn"
                    class="btn-success"
                >
                    Save
                </button>
            </div>
        </template>
    </Modal>
</template>

<script>
    import { defineComponent, ref, reactive, computed, toRaw } from 'vue';
    import Modal from './Modal.vue';
    import InputText from './InputText.vue';
    import store from '../js/store.js';
    import emitter from '../js/mitt.js';

    export default defineComponent({
        components: {
            Modal,
            InputText
        },

        props: {
            title: String
        },

        setup () {
            // create or edit
            const mode = ref('create');
            const testRes = ref(0);
            const isOpen = ref(false);
            const connection = reactive({
                id: Date.now(),
                name: '',
                url: '',
                user: '',
                pass: ''
            });

            const testClass = computed(() => {
                if (testRes.value === 2) return 'pending';
                if (testRes.value === 1) return 'success';
                if (testRes.value === -1) return 'failed';
                return '';
            });

            const closeModal = () => {
                isOpen.value = false;
                testRes.value = 0;
            };

            const testConn = async () => {
                if (testRes.value !== 0) return;

                try {
                    testRes.value = 2;

                    const url = new URL(connection.url);
                    const auth = btoa(`${connection.user}:${connection.pass}`);
                    const res = await fetch(`${url.origin}/_up`, {
                        headers: {
                            'Authorization': `Basic ${auth}`
                        },
                    });

                    testRes.value = res.ok ? 1 : -1;
                } catch (err) {
                    console.log('conn:test:err', err);
                    testRes.value = -1;
                } finally {
                    setTimeout(() => {
                        testRes.value = 0;
                    }, 3000);
                }
            };

            const saveConn = () => {
                const conn = JSON.parse(JSON.stringify(toRaw(connection)));
                store.conns[conn.id] = conn;
                closeModal();
            };

            emitter.on('edit-conn', (conn = {}) => {
                conn = JSON.parse(JSON.stringify(conn));

                connection.id = conn.id;
                connection.name = conn.name;
                connection.url = conn.url;
                connection.user = conn.user;
                connection.pass = conn.pass;

                mode.value = 'edit';
                isOpen.value = true;
            });

            emitter.on('create-conn', () => {
                connection.id = Date.now();
                connection.name = 'Local';
                connection.url = 'http://localhost:5984';
                connection.user = 'admin';
                connection.pass = 'password';

                mode.value = 'create';
                isOpen.value = true;
            });

            return {
                mode,
                testRes,
                testClass,
                isOpen,
                connection,
                closeModal,
                testConn,
                saveConn
            };
        }
    });
</script>

<style lang="scss" scoped>
    .failed {
        @apply
            text-red-500
            border-red-500
            hover:text-red-500
            hover:border-red-500;
    }
    .success {
        @apply
            text-green-500
            border-green-500
            hover:text-green-500
            hover:border-green-500;
    }
</style>