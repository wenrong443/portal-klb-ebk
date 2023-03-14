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
						<input type="email" class="form-control" v-model="mfrtUtUsername" />
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelType() }}</label>
						<select class="form-control" v-model="mfrtType">
							<option v-for="typeOption in typeFilter" v-bind:value="typeOption.id" v-bind:key="typeOption.id">
								{{ typeOption.value }}
							</option>
						</select>
					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelIsRealMoney() }}</label>
						<select class="form-control" v-model="mfrtIsRealMoneyTransaction">
							<option v-for="typeOption in realMoneyFilter" v-bind:value="typeOption.id" v-bind:key="typeOption.id">
								{{ typeOption.value }}
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
									<option v-for="sortByOption in sortByOptions" v-bind:value="sortByOption.id" v-bind:key="sortByOption.id">
										{{ sortByOption.value }}
									</option>
								</select>
							</div>
							<div class="form-group">
								<label for="inputState">{{$messages.labelFilteringSortDirection()}}</label>
								<select class="form-control" v-model="sortDirection">
									<option v-for="sortDirection in sortDirectionOptions" v-bind:value="sortDirection.id"
										v-bind:key="sortDirection.id">
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
		mfrtIsRealMoneyTransaction: -99,
		mfrtType: "",
		mfrtUtUsername: "",
		createdDatetimeEnd: "",
		createdDatetimeStart: "",
		sortBy: "mfrtId",
		sortDirection: "ASC",
		isFilter: false,
		typeFilter: [],
		realMoneyFilter: [],
	}),
	computed: {
		filterWord() {
			return this.isFilter ? this.$messages.labelFilteringHide() : this.$messages.labelFilteringShow();
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
					id: "mfrtId",
					value: "ID",
				},
				{
					id: "mfrtUtUsername",
					value: this.$messages.labelUsername(),
				},
				{
					id: "mfrtType",
					value: this.$messages.fieldLabelType(),
				},
				{
					id: "createdDatetime",
					value: this.$messages.labelCreatedAt(),
				},
			];
		},
	},
	async created() {
        this.typeFilter = [
			{
				id: "",
				value: this.$messages.fieldLabelAll(),
			},
			{
				id: "IN",
				value: this.$messages.fieldLabelIn(),
			},
			{
				id: "OUT",
				value: this.$messages.fieldLabelOut(),
			},
		];

        this.realMoneyFilter = [
			{
				id: -99,
				value: this.$messages.fieldLabelAll(),
			},
			{
				id: 0,
				value: this.$messages.fieldLabelNo(),
			},
			{
				id: 1,
				value: this.$messages.fieldLabelYes()
			},
		];
    },
	methods: {
		emitSearch() {
			this.$emit("search", {
				mfrtIsRealMoneyTransaction: this.mfrtIsRealMoneyTransaction,
				mfrtType: this.mfrtType,
				mfrtUtUsername: this.mfrtUtUsername,
				createdDatetimeEnd: this.createdDatetimeEnd,
				createdDatetimeStart: this.createdDatetimeStart,
				sortBy: this.sortBy,
				sortDirection: this.sortDirection,
			});
		},
		resetFilter() {
			this.mfrtIsRealMoneyTransaction = -99;
			this.mfrtType = "";
			this.mfrtUtUsername = "";
			this.createdDatetimeEnd = "";
			this.createdDatetimeStart = "";
			this.sortBy = "mfrtId";
			this.sortDirection = "ASC";
			this.emitSearch();
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