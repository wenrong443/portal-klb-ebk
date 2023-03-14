<template>
  <div class="row">
    <div class="col-md-12">
      <announcement-category-filter
        @search="search"
      ></announcement-category-filter>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title"></h4>
          <button class="btn btn-primary" @click="goToAddPage()">
            {{ $messages.labelButtonAdd() }}
          </button>
        </div>
        <div class="card-body">
          <category-listing
            :currentPage="currentPage"
            @refresh="getAll()"
            :actName="actName"
            :actUiLink="actUiLink"
            :actStatus="actStatus"
            :sortBy="sortBy"
            :sortDirection="sortDirection"
          ></category-listing>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryListing from "./@components/CategoryListing";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import AnnouncementCategoryFilter from "./@components/AnnouncementCategoryFilter.vue";

export default {
  name: "",
  components: { CategoryListing, AnnouncementCategoryFilter },
  mixins: [pageBehaviour],
  data: () => ({
    actName: "",
    actUiLink: "",
    actStatus: -99,
    sortBy: "actId",
    sortDirection: "ASC",
  }),
  async created() {
  },
  computed: {},
  methods: {
    goToAddPage() {
      this.$router.push({ name: "CategoryAddPage" });
    },
    search(filter) {
      this.actName = filter.actName;
      this.actUiLink = filter.actUiLink;
      this.actStatus = filter.actStatus;
      this.sortBy = filter.sortBy;
      this.sortDirection = filter.sortDirection;
    },
  },
};
</script>

<style>
</style>