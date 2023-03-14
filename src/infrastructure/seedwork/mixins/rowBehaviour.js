
export default {
    props: {
        currentIndex: { type: Number, required: false, default: 0 },
        rowPerPage: { type: Number, required: false, default: 10 },
        currentPage: { type: Number, required: false, default: 1 },
    },
    computed: {
        rowIndex() {
            return (this.rowPerPage * (this.currentPage - 1)) + this.currentIndex + 1
        }
    },
}
