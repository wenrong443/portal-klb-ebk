<template>
  <div class="row">
    <div class="col-md-12">
      <announcement-filter @search="search"></announcement-filter>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title"></h4>
          <button class="btn btn-primary" @click="goToAddPage()">{{ $messages.labelButtonAdd() }}</button>
        </div>
        <div class="card-body">
          <anouncement-listing
            @refresh="getAll()"
            :currentPage="currentPage"
            :atLtId="atLtId"
            :atStatus="atStatus"
            :atActId="atActId"
            :atTitle="atTitle"
            :sortBy="sortBy"
            :sortDirection="sortDirection"
          ></anouncement-listing>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import AnouncementListing from "./@components/AnnouncementListing";
import AnnouncementFilter from "./@components/AnnouncementFilter";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "",
	components: { AnouncementListing, AnnouncementFilter },
	mixins: [pageBehaviour],
	data: () => ({
		atLtId: -99,
		atStatus: -99,
		atActId: -99,
		atTitle: "",
		sortBy: "atTitle",
		sortDirection: "ASC",
	}),
	async created() {
        
	},
	computed: {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "AnnouncementAddPage" });
		},
		search(filter) {
			this.atStatus = filter.atStatus;
			this.atTitle = filter.atTitle;
			this.atActId = filter.atActId;
			this.atLtId = filter.atLtId;
			this.sortBy = filter.sortBy;
			this.sortDirection = filter.sortDirection;
		},
	},
	
};
</script>
