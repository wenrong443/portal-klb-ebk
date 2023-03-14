<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header cave-card-header">
					<h4 class="card-title">{{$messages.labelFilteringSection()}}</h4>
					<button type="submit" class="btn btn-info btn-round" @click="showFilter()">
						{{ filterWord }}
					</button>
				</div>
				<div class="card-body" v-if="isFilter">
                    <div class="form-group">
						<label>{{$messages.fieldLabelUserFullname()}} ( * split with '|' )</label>
						<input type="email" class="form-control" v-model="fullName" />
					</div>
					<div class="form-group">
						<label>{{$messages.labelUsername()}}</label>
						<input type="email" class="form-control" :placeholder="$messages.fieldTooltipEnterUsername()"
							v-model="utUsername" />
					</div>
                    <div class="form-group">
						<label>{{$messages.fieldLabelUserInvitationCode()}}</label>
						<input type="email" class="form-control"
							v-model="invitationId" />
					</div>
					<div class="form-group">
						<label>{{$messages.fieldLabelWalletAddress()}} ({{ $messages.fieldLabelCollectTypeCryto() }})</label>
						<input type="email" class="form-control" v-model="walletAddress1" />
					</div>
                    <div class="form-group">
						<label>{{$messages.fieldLabelWalletAddress()}} ({{ $messages.fieldLabelCollectTypeBank() }})</label>
						<input type="email" class="form-control" v-model="walletAddress2" />
					</div>
					<div class="form-group">
						<label>{{$messages.fieldLabelIPAddress()}}</label>
						<input type="email" class="form-control" v-model="ipAddress" />
					</div>
                    <div class="form-group">
						<label>{{$messages.fieldLabelRegisteredIP()}}</label>
						<input type="email" class="form-control" v-model="registeredIpAddress" />
					</div>
                    
					<div class="form-group">
						<label>{{$messages.labelCreatedAt()}} ({{$messages.labelFrom()}})</label>
						<input type="datetime-local" class="form-control"
							:placeholder="$messages.fieldTooltipEnterCreatedAtFrom()" v-model="createdDatetimeStart" />
					</div>
					<div class="form-group">
						<label>{{$messages.labelCreatedAt()}} ({{$messages.labelTo()}})</label>
						<input type="datetime-local" class="form-control"
							:placeholder="$messages.fieldTooltipEnterCreatedAtTo()" v-model="createdDatetimeEnd" />
					</div>
                    <div class="form-group">
						<label>{{$messages.labelDemoAcc()}}</label>
						<select class="form-control" v-model="testUser">
									<option v-for="sortByOption in demoOption" v-bind:value="sortByOption.id"
										v-bind:key="sortByOption.id">
										{{ sortByOption.value }}
									</option>
								</select>
					</div>
                    <div class="form-group">
						<label>{{$messages.labelStatus()}}</label>
						<select class="form-control" v-model="status">
									<option v-for="sortByOption in statusOption" v-bind:value="sortByOption.id"
										v-bind:key="sortByOption.id">
										{{ sortByOption.value }}
									</option>
								</select>
					</div>

					<div class="cave-form">
						<div class="cave-form--input-group cave-form--input-group-two">
							<div class="form-group">
								<label for="inputState">{{$messages.labelFilteringSortBy()}}</label>
								<select class="form-control" v-model="sortBy">
									<option v-for="sortByOption in sortByOptions" v-bind:value="sortByOption.id"
										v-bind:key="sortByOption.id">
										{{ sortByOption.value }}
									</option>
								</select>
							</div>
							<div class="form-group">
								<label for="inputState">{{$messages.labelFilteringSortDirection()}}</label>
								<select class="form-control" v-model="sortDirection">
									<option v-for="sortDirection in sortDirectionOptions"
										v-bind:value="sortDirection.id" v-bind:key="sortDirection.id">
										{{ sortDirection.value }}
									</option>
								</select>
							</div>
						</div>
					</div>

					<div class="card-footer card-footer-right">
						<button type="submit" class="btn btn-danger btn-round" @click="resetFilter()">
							{{$messages.labelFilteringReset()}}
						</button>
						<button type="submit" class="btn btn-info btn-round" @click="emitSearch()">
							{{$messages.labelFilteringSearch()}}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { formMessagesEn } from '../../../domain/formMessage';
export default {
	components: {},
	data: () => ({
        invitationId: "",
		utUsername: "",
		walletAddress1: "",
        walletAddress2: "",
		ipAddress: "",
        status: -99,
        testUser: -99,
        registeredIpAddress: "",
        fullName: "",
		createdDatetimeStart: "",
		createdDatetimeEnd: "",
		sortBy: "utId",
		sortDirection: "DESC",
		isFilter: false,
        statusOption: [
            {
                id: -99,
                value: "ALL"
            },
            {
                id: 0,
                value: "Inactive"
            },
             {
                id: 1,
                value: "Active"
            },
        ],
        demoOption: [
            {
                id: -99,
                value: "ALL"
            },
            {
                id: 0,
                value: "No"
            },
             {
                id: 1,
                value: "Yes"
            },
        ]
	}),
	computed: {
		filterWord() {
			return this.isFilter
				? this.$messages.labelFilteringHide()
				: this.$messages.labelFilteringShow();
		},
		sortDirectionOptions() {
			return [
				{
					id: "ASC",
					value: this.$messages.labelFilteringSortAsc(),
				},
				{
					id: "DESC",
					value: this.$messages.labelFilteringSortDesc(),
				},
			];
		},
		sortByOptions() {
			return [
				{
					id: "utId",
					value: "ID",
				},
				{
					id: "utUsername",
					value: this.$messages.labelUsername(),
				},
				{
					id: "createdDatetime",
					value: this.$messages.labelCreatedAt(),
				},
			];
		},
	},
	created() {
		const filter = sessionStorage.getItem("NORMAL_LISTING_FILTER_LIST");
		if (filter) {
			const formattedFilter = JSON.parse(filter);
			console.log(formattedFilter);
			this.utUsername = formattedFilter.utUsername;
			this.walletAddress1 = formattedFilter.walletAddress1;
            this.walletAddress2 = formattedFilter.walletAddress2;
			this.ipAddress = formattedFilter.ipAddress;
            this.status = formattedFilter.status;
            this.testUser = formattedFilter.testUser;
            this.registeredIpAddress = formMessagesEn.registeredIpAddress;
            this.fullName = formMessagesEn.fullName;
			this.createdDatetimeStart = formattedFilter.createdDatetimeStart;
			this.createdDatetimeEnd = formattedFilter.createdDatetimeEnd;
			this.sortBy = formattedFilter.sort.sortBy;
			this.sortDirection = formattedFilter.sort.sortDirection;
            this.invitationId = formattedFilter.invitationId;
		}
	},
	methods: {
		emitSearch(isReset = false) {
			this.$emit("search", {
                invitationId: this.invitationId,
				utUsername: this.utUsername,
				walletAddress1: this.walletAddress1,
                walletAddress2: this.walletAddress2,
				ipAddress: this.ipAddress,
                registeredIpAddress: this.registeredIpAddress,
                fullName: this.fullName,
				createdDatetimeStart: this.createdDatetimeStart,
				createdDatetimeEnd: this.createdDatetimeEnd,
                status: this.status,
                testUser: this.testUser,
				sortBy: this.sortBy,
				sortDirection: this.sortDirection,
                isReset: isReset
			});
		},
		resetFilter() {
			sessionStorage.removeItem("NORMAL_LISTING_FILTER_LIST");
            this.invitationId = "";
			this.utUsername = "";
			this.walletAddress1 = "";
            this.walletAddress2 = "";
			this.ipAddress = "";
            this.registeredIpAddress = "";
            this.fullName = "";
			this.createdDatetimeStart = "";
			this.createdDatetimeEnd = "";
			this.sortBy = "utId";
			this.sortDirection = "DESC";
            this.status = -99;
            this.testUser = -99;
           
			this.emitSearch(true);
		},
		showFilter() {
			this.isFilter = !this.isFilter;
		},
	},
};
</script>

<style>
.card-footer-right {
	display: grid;
	grid-template-columns: auto auto;
	grid-gap: 10px;
	padding: 10px 0;
	float: right;
}

.cave-card-header {
	display: grid;
	grid-template-columns: 1fr auto;
}
</style>