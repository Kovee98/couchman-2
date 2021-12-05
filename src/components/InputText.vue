<template>
    <div class="mb-5">
        <span
            v-if="label"
            class="dark:text-gray-300 mb-1"
        >
            {{ label }}
        </span>

        <input
            class="input"
            @input="(e) => $emit('update:modelValue', e.target.value)"
            :type="password ? 'password' : 'text'"
            :placeholder="placeholder"
        />

        <span
            v-if="description"
            class="dark:text-gray-500"
        >
            {{ description }}
        </span>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            modelValue: String,
            label: String,
            placeholder: String,
            description: String,
            password: Boolean
        },

        setup () {
            return {};
        }
    });
</script>

<style lang="scss" scoped>
    .input {
        @apply
            w-full
            p-2 mb-1
            text-sm
            text-gray-700
            placeholder-gray-600
            bg-gray-100
            border-0
            input
            dark:placeholder-gray-500
            dark:focus:shadow-outline-gray
            dark:focus:placeholder-gray-600
            dark:bg-gray-700
            dark:focus:bg-gray-700
            dark:text-gray-200
            focus:placeholder-gray-500
            focus:bg-white
            focus:border-purple-300
            focus:outline-none
            focus:shadow-outline-purple
            form-input;
    }
</style>
