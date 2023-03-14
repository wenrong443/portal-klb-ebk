<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title"></h4>
          <button class="btn btn-primary" @click="goToAddPage()">
            {{ $messages.labelButtonAdd() }}
          </button>
        </div>
        <div class="card-body">
          <admin-listing
            :currentPage="currentPage"
            @refresh="getAll()"
          ></admin-listing>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminListing from "./@components/AdminListing";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
  name: "",
  components: { AdminListing },
  mixins: [pageBehaviour],
  data: () => ({
   
  }),
  async created() {
  },
  methods: {
    goToAddPage() {
      this.$router.push({ name: "AdminAddPage" });
    },
  },
};
</script>

<style>
</style>