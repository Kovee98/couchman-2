<template>
    <div class="mb-5">
        <div
            v-if="label"
            class="dark:text-gray-300 mb-2"
        >
            {{ label }}
        </div>

        <input
            class="input"
            :class="classes"
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
            password: Boolean,
            classes: String
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
            dark:bg-gray-800
            dark:focus:bg-gray-800
            dark:text-gray-200
            focus:placeholder-gray-500
            focus:bg-white
            focus:border-purple-300
            focus:outline-none
            focus:shadow-outline-purple
            form-input;
    }
</style>
