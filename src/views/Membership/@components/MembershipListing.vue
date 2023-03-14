<template>
  <div class="paper-table table table-striped table-bordered">
    <span class="paper-table--header">#</span>
    <span class="paper-table--header">{{ $messages.fieldLabelTitle() }}</span>
    <span class="paper-table--header">{{ $messages.fieldLabelDescription() }}</span>
    <span class="paper-table--header">{{ $messages.fieldLabelLevel() }}</span>
    <span class="paper-table--header">{{ $messages.fieldLabelPrice() }} ({{currency}})</span>
    <span class="paper-table--header">{{ $messages.fieldLabelTaskPerDay() }}</span>
    <span class="paper-table--header">{{ $messages.fieldLabelCommision2() }}</span>
    <span class="paper-table--header">{{ $messages.fieldLabelColor() }}</span>
    <!-- <span class="paper-table--header">{{ $messages.fieldLabelTaskReward() }}<br />({{ $messages.fieldLabelSelf() }}) ({{currency}})</span>
    <span class="paper-table--header">{{ $messages.fieldLabelTaskReward() }}<br />({{ $messages.fieldLabelReferral() }})</span>
    <span class="paper-table--header">{{ $messages.fieldLabelTopupReward() }}<br />({{ $messages.fieldLabelReferral() }})</span> -->
    <span class="paper-table--header">{{ $messages.labelStatus() }}</span>
    <span class="paper-table--header disabled-sorting">{{ $messages.labelAction() }}</span>
    <div class="paper-table-body">
      <div
        class="paper-table-rows"
        v-for="(record, index) in records"
        v-bind:key="record.id"
      >
        <membership-listing-row
          :record="record"
          @refresh="getAll()"
          :languageOptions="languageOptions"
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
import MembershipListingRow from "./MembershipListingRow";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import listingBehaviour from "seedwork/mixins/listingBehaviour";
import { mixin as RecordMixin } from "../Membership";
import json from "../../../infrastructure/json/config.json";

export default {
  name: "MembershipListing",
  mixins: [pageBehaviour, listingBehaviour, RecordMixin],
  components: { MembershipListingRow },
  props: {},
  data: () => ({
    results: [],
    currency: json.currency
  }),
  async created() {
    await this.getOptionList();
    this.getAll();
  },
  computed: {
    filterCriteria() {
      return {
        pageNumber: this.currentPage,
        rowPerPage: this.rowPerPage,
      };
    },
  },
  methods: {
    async getOptionList() {
            const [[, languageOptions]] = await Promise.all([
                this.$service.settingService.getAllLanguage(),
            ]);

            this.languageOptions = languageOptions.content;
        },
    async getAll() {
      const [error, result] = await this.$service.membershipService.getAll(
        this.filterCriteria
      );
      if (error) {
      } else {
        this.userBanks = result.content;
        this.totalPage = result.paginationInfo.totalPages;
        const items = [];
        result.content.map((d) => {
          const languageList = JSON.parse(d.mtTitle);
          languageList.forEach((i) => {
            var obj = {
              language: i.ltId,
              membershipTitle: this.getMembershipTitles(d),
              membershipDescription: this.getMembershipDescriptions(d),
              ...d,
            };
            items.push(obj);
          });
        });
        this.records = items.filter(
          (d) => d.language == this.languageOptions[0].ltId
        );
      }
    },
    getMembershipTitles(d) {
      const contents = JSON.parse(d.mtTitle);
      let result = "";
      contents.forEach((i) => {
        result = i.value;
      });
      return result;
    },
    getMembershipDescriptions(d) {
      const contents = JSON.parse(d.mtDescription);
      let result = "";
      contents.forEach((i) => {
        result = i.value;
      });
      return result;
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
