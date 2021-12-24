<template>
    <div class="w-full py-3 mb-1 flex items-center justify-between">
        <h2 class="text-xl dark:text-gray-200 z-100 bg-gray-100 dark:bg-gray-900">
            Databases
        </h2>

        <InputText
            v-model="search"
            placeholder="_users"
            icon="search"
            class="mb-0 w-75"
        />
    </div>


    <Table
        :items="databases"
        :columns="columns"
        :search="search"
        :sort="sort"
        :page="page"
        :pageSize="pageSize"
        @column-click="columnClick"
    />
</template>

<script>
    import { computed, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import Table from './Table.vue';
    import InputText from './InputText.vue';

    export default {
        components: {
            Table,
            InputText
        },

        props: {
            databases: Array
        },

        setup () {
            const router = useRouter();
            const route = useRoute();
            const defaultSort = 'db_name=asc';
            const pageSize = 10;
            const search = ref(route?.query?.search);
            const searchInput = ref(null);
            const isSearchOpen = ref(!!route?.query?.search);
            const columns = [
                { name: 'Name', key: 'db_name', class: 'flex items-center text-sm' },
                { name: '# Docs', key: 'doc_count' },
                { name: '# Deleted', key: 'doc_del_count' },
                { name: 'Size', key: 'size' }
            ];

            const columnClick = (col) => {
                const currSort = {
                    field: route?.query?.sort?.split('=')[0],
                    order: route?.query?.sort?.split('=')[1]
                };

                let order = 'asc';
                if (col.key === currSort.field) {
                    order = currSort.order === 'asc' ? 'dsc' : 'asc';
                }

                const sortStr = order ? `${col.key}=${order}` : undefined;

                router.push({ query: { sort: sortStr } });
            };

            watch(search, (currSearch) => {
                router.push({ query: { search: currSearch || undefined } });
            });

            return {
                pageSize,
                search,
                searchInput,
                isSearchOpen,
                sort: computed(() => route?.query?.sort || defaultSort),
                page: computed(() => route?.query?.page || 0),
                columns,
                columnClick
            };
        }
    }
</script>
