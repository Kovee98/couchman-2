<template>
    <span class="text-white">{{ sort }}</span>
    <Table
        :items="databases"
        :columns="columns"
        :sort="sort"
        @column-click="columnClick"
    />
</template>

<script>
    import { computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import Table from './Table.vue';
    import { formatBytes } from '../js/util';

    export default {
        components: {
            Table
        },

        props: {
            databases: Array
        },

        setup () {
            const router = useRouter();
            const route = useRoute();
            const defaultSort = 'db_name=asc';
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
                    // toggle order
                    order = currSort.order === 'asc' ? 'dsc' : 'asc';
                }

                router.push({ query: { sort: `${col.key}=${order}` } });
            };

            return {
                sort: computed(() => route?.query?.sort || defaultSort),
                columns,
                columnClick
            };
        }
    }
</script>
