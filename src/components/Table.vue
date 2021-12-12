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
                            @click="$emit('column-click', col)"
                            class="px-4 py-3 cursor-pointer select-none dark:hover:text-gray-100"
                        >
                            <span>{{ col.name }}</span>
                            <i
                                v-if="col.key === pageSort.field"
                                class="float-right"
                                :class="`icon-${pageSort.order === 'asc' ? 'up' : 'down'}-open`"
                            />
                        </th>
                    </tr>
                </thead>

                <!-- table data -->
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    <!-- table row(s) -->
                    <tr
                        v-for="item in pageItems"
                        :key="item.id"
                        class="text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100"
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
                Showing {{ (pageIndex * pageSize) + 1 }}-{{ Math.min((pageIndex * pageSize) + pageSize, items.length) }} of {{ items.length }}
            </span>

            <span class="col-span-2" />

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
                            class="px-3 py-1 rounded-md select-none rounded-l-lg focus:outline-none focus:shadow-outline-purple disabled:cursor-default dark:hover:text-gray-100 disabled:text-gray-600 hover:disabled:text-gray-600"
                            aria-label="Previous"
                        >
                            <i class="icon-left-open" />
                        </button>
                    </div>

                    <!-- pages -->
                    <div class="w-40 flex justify-center">
                        <button
                            v-for="page in pages"
                            :key="page.id"
                            @click="pageIndex = page"
                            class="w-7 py-1 rounded-md select-none focus:outline-none focus:shadow-outline-purple dark:hover:text-gray-100"
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
                            class="px-3 py-1 rounded-md select-none rounded-r-lg focus:outline-none focus:shadow-outline-purple disabled:text-gray-600 disabled:cursor-default dark:hover:text-gray-100 disabled:text-gray-600 hover:disabled:text-gray-600"
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
    import { ref, computed, watchEffect, watch, toRefs } from "vue";
    import { searching, sorting } from '../js/list';

    export default {
        props: {
            items: {
                type: Array,
                required: true
            },
            columns: {
                type: Array,
                required: true
            },
            pageSize: {
                type: Number,
                default: 10
            },
            search: {
                type: String,
                default: ''
            },
            sort: {
                type: String,
                default: 'db_name=asc'
            },
            page: {
                type: Number,
                default: 0
            },
            lookAhead: {
                type: Number,
                default: 2
            },
            lookBehind: {
                type: Number,
                default: 2
            }
        },

        setup (props) {
            const { items, columns, search, sort: sortStr, page, pageSize, lookAhead, lookBehind } = toRefs(props);
            const index = ref(0);
            const orders = [ 'asc', 'dsc' ];

            const changePage = (inc) => {
                index.value += inc;
            };

            const pageCount = computed(() => Math.ceil(items.value.length / pageSize.value));

            const pageSort = computed(() => {
                // derive field
                const fields = columns.value.map((col) => col.key);
                let field = sortStr.value.split('=')[0] || 'db_name';
                if (!fields.includes(field)) {
                    console.error(`table:err sort field '${field}' wasn't found in the column keys [${fields}]`);
                    field = 'db_name';
                }

                // derive order
                let order = sortStr.value.split('=')[1] || 'asc';
                if (!orders.includes(order)) {
                    console.error(`table:err sort order '${order}' wasn't found in [${orders}]`);
                    field = 'asc';
                }

                return { field, order };
            });

            const searchedItems = computed(() => {
                const fields = columns.value.map((col) => col.key);
                return searching.search(items.value, fields, search.value);
            });
            const sortedItems = computed(() => sorting.sort(searchedItems.value, pageSort.value.field, pageSort.value.order));

            const pageItems = computed(() => {
                const start = index.value * pageSize.value;
                const end = start + pageSize.value;
                return sortedItems.value.slice(start, end);
            });

            const pages = computed(() => {
                const prevPages = new Array(lookBehind.value).fill().map((_, i) => index.value - (i + 1));
                const nextPages = new Array(lookAhead.value).fill().map((_, i) => index.value + (i + 1));
                return [ ...prevPages, index.value, ...nextPages ].sort((page1, page2) => page1 - page2);
            });

            return {
                pages,
                pageIndex: index,
                pageSize,
                searchedItems,
                pageItems,
                sortedItems,
                pageCount,
                pageSort,
                changePage
            };
        }
    }
</script>
