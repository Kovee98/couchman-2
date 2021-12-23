<template>
    <!-- This is the input component -->
    <!-- <div class="relative h-10 input-component mb-5">
        <input
            id="email"
            type="text"
            name="email"
            class="h-full w-full border-gray-300 px-2 transition-all border-blue rounded-sm"
        />
        <label for="email" class="absolute left-2 transition-all bg-white px-1">
            E-mail
        </label>
    </div> -->

    <div class="mb-5">
        <!-- <div
            v-if="label"
            class="dark:text-gray-300"
        >
            {{ label }}
        </div> -->

        <label
            v-if="label"
            :for="id"
            class="text-sm dark:text-gray-300"
        >
            {{ label }}
        </label>

        <input
            :id="id"
            :name="id"
            class="input"
            :class="classes"
            @input="(e) => $emit('update:modelValue', e.target.value)"
            :type="password ? 'password' : 'text'"
            :placeholder="placeholder"
            :value="modelValue"
        />

        <span
            v-if="description"
            class="desc"
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
            const id = String(Math.round(Math.random() * 1000000));

            return {
                id
            };
        }
    });
</script>

<style lang="scss" scoped>
    .input {
        @apply
            w-full
            p-2
            text-md
            text-gray-700
            placeholder-gray-600
            bg-gray-100
            border-1
            border-gray-700
            input
            dark:placeholder-gray-500
            dark:focus:shadow-outline-gray
            dark:focus:placeholder-gray-600
            dark:bg-gray-800
            dark:focus:bg-gray-800
            dark:text-gray-200
            focus:placeholder-gray-500
            focus:bg-white
            focus:outline-none
            focus:border-gray-600
    }

    .desc {
        @apply
            w-full
            ml-2
            text-sm
            dark:text-gray-500;
    }
</style>
