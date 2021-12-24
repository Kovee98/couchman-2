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

        <i
            v-if="icon"
            :class="`relative left-2 top-[34px] icon-${icon} dark:text-gray-400`"
        />

        <input
            :id="id"
            :name="id"
            class="input"
            :class="`${classes} ${icon ? 'pl-9' : ''}`"
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
            classes: String,
            icon: String
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
    .desc {
        @apply
            w-full
            ml-2
            text-sm
            dark:text-gray-500;
    }
</style>
