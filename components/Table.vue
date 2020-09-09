<template>
    <div>
        <vue-good-table
            :columns="columns"
            :rows="rows"
            :line-numbers="true"
            :search-options="{
                enabled: true,
                placeholder: 'Search this table',
            }"
            :pagination-options="{
                enabled: true,
                mode: 'pages',
                perPage: 5,
                perPageDropdown: [7,10,15],
        }">
            <div slot="table-actions">
                <button type="button" class="btn btn-primary">----</button>
                <button type="button" class="btn btn-info">----</button>
            </div>
        </vue-good-table>
    </div>
</template>

<script>
    import 'vue-good-table/dist/vue-good-table.css'
    import {VueGoodTable} from 'vue-good-table';

    export default {
        data() {
            return {
                columns: [],
                rows: [],
            };
        },
        components: {
            VueGoodTable
        },
        created() {
            this.getTableAttributes()
            this.fetchData()
        },
        methods: {
            fetchData(){
                axios.get('/api/posts').then(response => {
                    this.rows = response.data
                })
            },
            getTableAttributes(){
                axios.get('/api/table/posts/attr').then(response => {
                    this.columns = response.data
                })
            }
        },
    }
</script>

<style scoped>
    .rowGreen {
        color: #2fa360;
    }

    .rowRed {
        color: #1d68a7;
    }
</style>
