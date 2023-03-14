import PaginationControl from "@components/PaginationControl";


export default {
    components: { PaginationControl },
    data: () => ({
        records: [],
        currentPage: 1,
        totalPages: 1,
        rowPerPage: 20,
    }),
    computed: {
        hasRecords() {
            return this.records.length <= 0
        },
    },
    methods: {
        updateRowPerPage(value) {
            this.rowPerPage = value
        }
    },
}
