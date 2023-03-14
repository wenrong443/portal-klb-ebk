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
          <department-listing
            :records="records"
            @refresh="getAll()"
          ></department-listing>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DepartmentListing from "./@components/DepartmentListing";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
  name: "",
  components: { DepartmentListing },
  mixins: [pageBehaviour],
  data: () => ({
    records: [],
    filter: {
      pageNumber: 0,
      rowPerPage: 0,
    },
  }),
  async created() {},
  methods: {
    goToAddPage() {
      this.$router.push({ name: "DepartmentAddPage" });
    },
  },
};
</script>

<style>
</style>