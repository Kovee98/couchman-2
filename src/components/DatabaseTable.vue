<template>
    <Table
        :items="databases"
        :columns="columns"
    />
</template>

<script>
    import Table from './Table.vue';

    export default {
        components: {
            Table
        },

        props: {
            databases: Array
        },

        setup () {
            const columns = [ 'Client', 'Amount', 'Status', 'Date' ];

            return {
                columns
            };
        }
    }
</script>
