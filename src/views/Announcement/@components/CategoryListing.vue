<template>
  <div class="paper-table table table-striped table-bordered">
    <span class="paper-table--header">#</span>
    <span class="paper-table--header">{{ $messages.fieldLabelTitle() }}</span>
    <span class="paper-table--header">{{ $messages.fieldLabelUIURL() }}</span>
    <span class="paper-table--header">{{ $messages.fieldLabelUserRemarks() }}</span>
    <span class="paper-table--header">{{ $messages.labelCreatedAt() }}</span>
    <span class="paper-table--header">{{ $messages.labelStatus() }}</span>
    <span class="paper-table--header disabled-sorting text-right">{{ $messages.labelAction() }}</span>
    <div class="paper-table-body">
      <div
        class="paper-table-rows"
        v-for="(record, index) in records"
        v-bind:key="record.id"
      >
        <category-listing-row
          :record="record"
          @refresh="getAll()"
          :currentIndex="index"
          :currentPage="currentPage"
          :rowPerPage="rowPerPage"
        />
      </div>
    </div>
  </div>
  <div v-if="hasRecords" class="no-record">
    <div class="no-record--title">{{ $messages.labelNoRecord() }}</div>
  </div>
  <div class="paper-pagination">
    <span class="dataTables_info">{{ formattedTotalMessage }}</span>
    <pagination-control
      :length="totalPage"
      v-model="currentPage"
    ></pagination-control>
  </div>
</template>

<script>
import CategoryListingRow from "./CategoryListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";

export default {
  name: "CategoryListing",
  mixins: [pageBehaviour, listingBehaviour],
  components: { CategoryListingRow },
  props: {
    actName: { type: String },
    actStatus: { type: Number },
    actUiLink: { type: String },
    sortBy: { type: String },
    sortDirection: { type: String },
  },
  data: () => ({}),
  async created() {
    this.getAll();
  },
  computed: {
    filterCriteria() {
      return {
        actName: this.actName,
        actUiLink: this.actUiLink,
        actRemarks: "",
        actStatus: this.actStatus,
        paginationDAO: {
          pageNumber: this.currentPage,
          rowPerPage: this.rowPerPage,
        },
        sort: {
          sortBy: this.sortBy,
          sortDirection: this.sortDirection,
        },
      };
    },
  },
  methods: {
    getAll() {
      this.$emit("refresh");
    },
    async getAll() {
      const [
        error,
        result,
      ] = await this.$service.announcementService.getCategoryAll(
        this.filterCriteria
      );
      if (error) {
      } else {
        this.records = result.content;
        this.totalPage = result.paginationInfo.totalPages;
      }
    },
  },
  watch: {
    filterCriteria() {
      if (this.filterCriteria !== null) {
        this.getAll();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
