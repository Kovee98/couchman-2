<template>
    <h2 class="py-2 my-3 text-xl dark:text-gray-200">Databases</h2>

    <InputText
        v-model="search"
        label="Search"
        placeholder="users_db"
    />

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
    import { computed, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import Table from './Table.vue';
    import InputText from './InputText.vue';
    import { formatBytes } from '../js/util';

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
            const search = ref('');
            const columns = [
                { name: 'Name', key: 'db_name', class: 'flex items-center text-sm' },
                { name: '# Docs', key: 'doc_count' },
                { name: '# Deleted', key: 'doc_del_count' },
                { name: 'Size', key: 'size', format: formatBytes  }
            ];

            const columnClick = (col) => {
                const currSort = {
                    field: route?.query?.sort?.split('=')[0],
                    order: route?.query?.sort?.split('=')[1]
                };

                let order = 'asc';
                if (col.key === currSort.field) {
                    // toggle order (asc -> dsc -> undefined)
                    // order = currSort.order === 'asc' ? 'dsc' : currSort.order === 'dsc' ? '' : 'asc';
                    // toggle order (asc -> dsc)
                    order = currSort.order === 'asc' ? 'dsc' : 'asc';
                }

                const sortStr = order ? `${col.key}=${order}` : undefined;

                router.push({ query: { sort: sortStr } });
            };

            return {
                pageSize,
                search,
                sort: computed(() => route?.query?.sort || defaultSort),
                page: computed(() => route?.query?.page || 0),
                columns,
                columnClick
            };
        }
    }
</script>
