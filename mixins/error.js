export default {
  methods: {
    /**
     * errorHandler
     * This function will handle parsing error handling in most cases.
     * And will display error toaster
     * @param {Object} error error passed from axios
     */
    errorHandler(error) {
      const { data } =
        error?.response || 'Terjadi kesalahan. Silakan coba lagi nanti.'
      const message = data

      this.$message({
        message,
        type: 'error',
        duration: 5000,
      })
    },
  },
}
