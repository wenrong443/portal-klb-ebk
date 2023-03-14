
export default {
    data: () => ({
    }),
    computed: {
    },
    methods: {
        setLoading() {
            this.$swal.showLoading()
        },
        setCompleted() {
            this.$swal.close()
        },
        showError(error, title = "Unable to proceed") {
            try {
                const errorMessage = this.$messages[error.content]() ? this.$messages[error.content]() : error.content;
                this.$swal(title, errorMessage, "error");
            }catch (e){
                const errorMessage = this.$messages[error.content]() ? this.$messages[error.content]() : error.content;
                this.$swal(title, error, "error");
            }
            
        },
        showError2(error, title = "Unable to proceed") {
            try {
            this.$swal(title, error.content, "error");
            }catch (e){
                const errorMessage = this.$messages[error.content]() ? this.$messages[error.content]() : error.content;
                this.$swal(title, error, "error");
            }
        },
    }
}
