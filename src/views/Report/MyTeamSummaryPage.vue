<template>
  <div class="row">
    <div class="col-md-12">
      <my-team-filter @search="search"></my-team-filter>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title"></h4>
        </div>
        <div class="card-body">
          <my-team-listing
            @refresh="getAll()"
            :currentPage="currentPage"
            :startDate="startDate"
            :endDate="endDate"
            :selfUtId="selfUtId"
            :utId="utId"
          ></my-team-listing>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyTeamListing from "./@components/MyTeamListing";
import MyTeamFilter from "./@components/MyTeamFilter.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
  name: "",
  components: { MyTeamListing, MyTeamFilter },
  mixins: [pageBehaviour],
  props: {
      selfUtId: { type: Number },
		utId: { type: Number }
  },
  data: () => ({
    startDate: new Date().toISOString().slice(0,10),
    endDate: new Date().toISOString().slice(0,10),
  }),
  async created() {},
  computed: {},
  methods: {
    search(filter) {
      this.startDate = filter.startDate;
      this.endDate = filter.endDate;
    },
  },
};
</script>

<style>
</style>