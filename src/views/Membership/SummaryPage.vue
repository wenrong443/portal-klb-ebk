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
          <membership-listing
            :records="records"
            @refresh="getAll()"
          ></membership-listing>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MembershipListing from "./@components/MembershipListing";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
  name: "SummaryPage",
  components: { MembershipListing },
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
      this.$router.push({ name: "MembershipAddPage" });
    },
  },
};
</script>

<style>
</style>