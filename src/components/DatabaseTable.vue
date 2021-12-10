<template>
    <Table
        :items="databases"
        :columns="columns"
    />
</template>

<script>
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
            const columns = [
                { name: 'Name', key: 'db_name', class: 'flex items-center text-sm' },
                { name: '# Docs', key: 'doc_count' },
                { name: '# Deleted', key: 'doc_del_count' },
                { name: 'Size', key: 'size', format: formatBytes  }
            ];

            return {
                columns
            };
        }
    }
</script>
