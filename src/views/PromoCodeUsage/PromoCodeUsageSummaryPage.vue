<template>
  <div class="row">
    <div class="col-md-12">
      <promo-code-usage-filter @search="search"></promo-code-usage-filter>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title"></h4>
        </div>
        <div class="card-body">
          <promo-code-usage-listing
            @refresh="getAll()"
            :currentPage="currentPage"
            :pcutUtUsername="pcutUtUsername"
            :pctCode="pctCode"
          ></promo-code-usage-listing>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PromoCodeUsageListing from "./@components/PromoCodeUsageListing";
import PromoCodeUsageFilter from "./@components/PromoCodeUsageFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
  name: "",
  components: { PromoCodeUsageListing, PromoCodeUsageFilter },
  mixins: [pageBehaviour],
  data: () => ({
    pcutUtUsername: "",
    pctCode: ""
  }),
  async created() {},
  computed: {},
  methods: {
    search(filter) {
      this.pcutUtUsername = filter.pcutUtUsername;
      this.pctCode = filter.pctCode;
    },
  },
};
</script>

<style>
</style>