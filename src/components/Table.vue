<template>
    <div class="w-full overflow-hidden rounded-lg shadow-xs mb-7">
        <!-- table -->
        <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-no-wrap">
                <!-- column headers -->
                <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th
                            v-for="col in columns"
                            :key="col.id"
                            class="px-4 py-3"
                        >
                            {{ col.name }}
                        </th>
                    </tr>
                </thead>

                <!-- table data -->
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    <!-- table row(s) -->
                    <tr
                        v-for="item in pageItems"
                        :key="item.id"
                        class="text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <td
                            v-for="col in columns"
                            :key="col.id"
                            class="px-4 py-3"
                        >
                            <div :class="col.class">
                                {{ col.format ? col.format(item[col.key]) : item[col.key]}}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- pagination -->
        <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span class="flex items-center col-span-3">
                Showing {{ (pageIndex * pageSize) + 1 }}-{{ ((pageIndex * pageSize) + pageSize) - 1 }} of {{ items.length }}
            </span>

            <span class="col-span-2"></span>

            <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav
                    class="flex items-center"
                    aria-label="Table navigation"
                >
                    <!-- previous -->
                    <div class="w-10">
                        <button
                            @click="pageIndex--"
                            :disabled="pageIndex <= 0"
                            class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple disabled:text-gray-600 disabled:cursor-default flip-x"
                            aria-label="Previous"
                        >
                            <i class="icon-right-open" />
                        </button>
                    </div>

                    <!-- pages -->
                    <div class="w-40 flex justify-center">
                        <button
                            v-for="page in pages"
                            :key="page.id"
                            @click="pageIndex = page"
                            class="w-full py-1 rounded-md focus:outline-none focus:shadow-outline-purple hover:text-white"
                            :class="{ 'text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600' : page === pageIndex, 'invisible' : page < 0 || page >= pageCount}"
                        >
                            {{ page + 1 }}
                        </button>
                    </div>

                    <!-- next -->
                    <div class="w-10">
                        <button
                            @click="pageIndex++"
                            :disabled="pageIndex >= pageCount - 1"
                            class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple disabled:text-gray-600 disabled:cursor-default"
                            aria-label="Next"
                        >
                            <i class="icon-right-open" />
                        </button>
                    </div>
                </nav>
            </span>
        </div>
    </div>
</template>

<script>
    import { ref, computed } from "vue";

    export default {
        props: {
            items: Array,
            columns: Array,
            lookAhead: {
                type: Number,
                default: 2
            },
            lookBehind: {
                type: Number,
                default: 2
            }
        },

        setup ({ items, lookBehind, lookAhead }) {
            const index = ref(0);
            const pageSize = ref(10);

            const changePage = (inc) => {
                index.value += inc;
            };

            const pageCount = computed(() => Math.ceil(items.length / pageSize.value));

            const pageItems = computed(() => {
                const start = index.value * pageSize.value;
                const end = start + pageSize.value;
                return items.slice(start, end);
            });

            const pages = computed(() => {
                const prevPages = new Array(lookBehind).fill().map((_, i) => index.value - (i + 1));
                const nextPages = new Array(lookAhead).fill().map((_, i) => index.value + (i + 1));
                return [ ...prevPages, index.value, ...nextPages ].sort((page1, page2) => page1 - page2);
            });

            return {
                pages,
                pageIndex: index,
                pageSize,
                pageItems,
                pageCount,
                changePage
            };
        }
    }
</script>
