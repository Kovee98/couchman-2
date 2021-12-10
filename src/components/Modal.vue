<template>
    <div
        v-if="isOpen"
        class="absolute left-0 top-0 w-screen h-screen flex items-center justify-center z-300"
    >
        <!-- backdrop -->
        <div
            @click="$emit('close')"
            class="absolute left-0 top-0 w-screen h-screen bg-black opacity-75 z-40"
        />

        <!-- modal -->
        <div class="w-125 h-175 p-4 -mt-50 bg-white rounded-lg shadow-xs dark:bg-gray-800 flex flex-col justify-between z-50">
            <!-- header -->
            <div class="w-full flex justify-between">
                <h1 class="bg-transparent text-2xl font-semibold text-gray-700 dark:text-gray-200 w-full border-b border-gray-700 p-2 mb-3">
                    {{ title }}
                </h1>

                <i
                    @click="$emit('close')"
                    class="icon-cancel p-1 mb-6 cursor-pointer text-lg text-gray-500 hover:text-gray-200 duration-100"
                />
            </div>

            <!-- default, modal content -->
            <div class="p-3 h-full">
                <slot />
            </div>

            <!-- actions -->
            <div class="w-full justify-between flex border-t border-gray-700 pt-3">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            isOpen: Boolean,
            title: String
        }
    });
</script>
