<template>
    <Modal
        @close="isOpen = false"
        :isOpen="isOpen"
        :title="title || 'Connection'"
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
                @click="deleteConn"
                class="btn-danger mr-2"
            >
                <i class="icon-trash cursor-pointer text-lg text-gray-200" />
            </button>

            <div class="float-right">
                <button
                    @click="testConn"
                    class="btn-flat mr-2"
                >
                    Test
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
    import { defineComponent, ref, reactive } from 'vue';
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
            const isOpen = ref(false);
            const connection = reactive({
                name: '',
                url: '',
                user: '',
                pass: ''
            });

            const closeModal = () => {
                isOpen.value = false;
            };

            const saveConn = () => {
                connection.id = Date.now();
                store.conns[connection.id] = connection;
                closeModal();
            };

            emitter.on('edit-conn', (conn = {}) => {
                mode.value = 'edit';
                connection.id = conn.id;
                connection.name = conn.name;
                connection.user = conn.user;
                connection.pass = conn.pass;
                isOpen.value = true;
            });

            emitter.on('create-conn', () => {
                mode.value = 'create';
                isOpen.value = true;
            });

            return {
                mode,
                isOpen,
                connection,
                closeModal,
                saveConn
            };
        }
    });
</script>
