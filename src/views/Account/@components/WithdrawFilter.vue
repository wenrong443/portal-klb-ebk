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
						<label>{{ $messages.labelUsername() }}</label>
						<input type="email" class="form-control" v-model="cwrtUtUsername" />
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.labelMenuUserBankList() }}</label>
						<select class="form-control" v-model="cwrtUbtId">
							<option v-for="typeOption in ubtRecords" v-bind:value="typeOption.ubtId"
								v-bind:key="typeOption.ubtId">
								{{ typeOption.bankName }}
							</option>
						</select>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.labelFilteringSortStatus() }}</label>
						<select class="form-control" v-model="cwrtStatus">
							<option v-for="statusOption in statusOptions" v-bind:value="statusOption.id"
								v-bind:key="statusOption.id">
								{{ statusOption.name }}
							</option>
						</select>
					</div>
                    <div class="form-group">
						<label for="inputState">{{ $messages.labelROC() }}</label>
						<select class="form-control" v-model="roc">
							<option v-for="statusOption in rocOptions" v-bind:value="statusOption.id"
								v-bind:key="statusOption.id">
								{{ statusOption.name }}
							</option>
						</select>
					</div>
					<div class="form-group">
						<label>{{$messages.labelCreatedAt()}} ({{$messages.labelFrom()}})</label>
						<input type="datetime-local" class="form-control" v-model="createdDatetimeStart" />
					</div>
					<div class="form-group">
						<label>{{$messages.labelCreatedAt()}} ({{$messages.labelTo()}})</label>
						<input type="datetime-local" class="form-control" v-model="createdDatetimeEnd" />
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
import { mixin as RecordMixin } from "../Account";
export default {
	components: {},
	mixins: [RecordMixin],
	data: () => ({
        roc: -99,
		cwrtStatus: 0,
		cwrtUbtId: -99,
		cwrtUtLevelId: -99,
		cwrtUtUsername: "",
		createdDatetimeEnd: "",
		createdDatetimeStart: "",
		sortBy: "cwrtId",
		sortDirection: "ASC",
		isFilter: false,
		ubtRecords: [],
		languageOptions: [],
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
					id: "cwrtId",
					value: "ID",
				},
				{
					id: "cwrtUtUsername",
					value: this.$messages.labelUsername(),
				},
				{
					id: "cwrtUbtId",
					value: this.$messages.labelMenuUserBankList(),
				},
				{
					id: "cwrtStatus",
					value: this.$messages.labelFilteringSortStatus(),
				},
				{
					id: "createdDatetime",
					value: this.$messages.labelCreatedAt(),
				},
			];
		},
	},
	async created() {
		await this.getCollectMoneyBankList();
		const filter = sessionStorage.getItem("WITHDRAW_LISTING_FILTER_LIST");

		if (filter) {
			const formattedFilter = JSON.parse(filter);
			this.cwrtStatus = formattedFilter.cwrtStatus;
            this.roc = formattedFilter.roc;
			this.cwrtUbtId = formattedFilter.cwrtUbtId;
			this.cwrtUtLevelId = formattedFilter.cwrtUtLevelId;
			this.cwrtUtUsername = formattedFilter.cwrtUtUsername;
			this.createdDatetimeStart = formattedFilter.createdDatetimeStart;
			this.createdDatetimeEnd = formattedFilter.createdDatetimeEnd;
			this.sortBy = formattedFilter.sort.sortBy;
			this.sortDirection = formattedFilter.sort.sortDirection;
		}
	},
	methods: {
		async getCollectMoneyBankList() {
			const [[, languageOptions]] = await Promise.all([
				this.$service.settingService.getAllLanguage(),
			]);

			this.languageOptions = languageOptions.content;

			const [error, result] = await this.$service.bankService.getAdminAll({});
			if (error) {
			} else {
				let tmpArray;
				const items = [];
				result.content.map((d) => {
					const userBanks = JSON.parse(d.ubtName);
					userBanks.forEach((i) => {
						var obj = {
							language: i.ltId,
							bankName: i.value,
							...d,
						};
						items.push(obj);
					});
				});
				tmpArray = items.filter(
					(d) => d.language == this.languageOptions[0].ltId
				);

				this.ubtRecords = [
					{
						ubtId: -99,
						bankName: this.$messages.fieldLabelAll(),
					},
				];

				this.ubtRecords = this.ubtRecords.concat.apply(
					this.ubtRecords,
					tmpArray
				);
			}
		},
		emitSearch(isReset = false) {
			this.$emit("search", {
				cwrtStatus: this.cwrtStatus,
                roc: this.roc,
				cwrtUbtId: this.cwrtUbtId,
				cwrtUtLevelId: this.cwrtUtLevelId,
				cwrtUtUsername: this.cwrtUtUsername,
				createdDatetimeEnd: this.createdDatetimeEnd,
				createdDatetimeStart: this.createdDatetimeStart,
				sortBy: this.sortBy,
				sortDirection: this.sortDirection,
				isReset: isReset,
			});
		},
		resetFilter() {
			sessionStorage.removeItem("WITHDRAW_LISTING_FILTER_LIST");
			this.cwrtUbtId = -99;
			this.cwrtStatus = 0;
            this.roc = -99;
			this.cwrtUtLevelId = -99;
			this.cwrtUtUsername = "";
			this.createdDatetimeEnd = "";
			this.createdDatetimeStart = "";
			this.sortBy = "cwrtId";
			this.sortDirection = "ASC";
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