<template>
    <Modal
        title="Connection"
    >
        <template v-slot:default>
            <InputText
                v-model="conn.name"
                label="Name"
                placeholder="Connection 1"
                description="Name this connection"
            />
            <InputText
                v-model="conn.url"
                label="URL"
                placeholder="http://localhost:5984"
                description="The url for the server"
            />
            <InputText
                v-model="conn.user"
                label="Username"
            />
            <InputText
                v-model="conn.pass"
                label="Password"
                :password="true"
            />
        </template>

        <template v-slot:footer>
            <button
                @click="deleteNote"
                class="btn-danger mr-2"
            >
                <i class="icon-trash cursor-pointer text-lg text-gray-200" />
                <!-- Delete -->
            </button>

            <div class="float-right">
                <button
                    @click="closeModal"
                    class="btn-flat mr-2"
                >
                    Cancel
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

    export default defineComponent({
        components: {
            Modal,
            InputText
        },

        props: {
            title: String
        },

        setup () {
            const isOpen = ref(true);
            const conn = reactive({
                name: '',
                url: '',
                user: '',
                pass: ''
            });

            const closeModal = () => {
                isOpen.value = false;
            };

            const saveConn = () => {
                const connection = conn;
                debugger;
            };

            return {
                isOpen,
                conn,
                closeModal,
                saveConn
            };
        }
    });
</script>
