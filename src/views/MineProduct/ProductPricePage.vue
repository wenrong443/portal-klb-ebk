<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{records.gmptShortCode}} - {{ $messages.fieldLabelPriceHistory() }}</h4>
				</div>
				<div class="card-body">
					<div id="chart"></div>
				</div>
			</div>
		</div>
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.fieldLabelUpdatePrice() }}</h4>
				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label>{{ $messages.fieldLabelPrice() }}</label>
								<input type="number" class="form-control" :placeholder="$messages.fieldLabelPrice()" v-model="requestParam.price" />
							</div>
						</div>
						<div class="col-md-6">
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<cave-date-time-picker :label="$messages.fieldLabelRedPacketStartDate()" v-model="requestParam.startDatetime">
								</cave-date-time-picker>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">

								<cave-date-time-picker :label="$messages.fieldLabelRedPacketEndDate()" v-model="requestParam.endDatetime">
								</cave-date-time-picker>
							</div>
						</div>
						<div class="col-md-6">
							<button type="submit" class="btn btn-info btn-round" @click="submitPrice()">
								{{$messages.labelSave()}}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
        <div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.fieldLabelUpdatePrice() }}</h4>
				</div>
                <div class="card-body">
                    <manual-price-listing
                    :recordId="recordId"
            :currentPage="currentPage"
            @refresh="getAll()"
          ></manual-price-listing>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import {
	assign,
	createInstance,
	STATUS_CLASS,
	STATUS,
	createValidator,
	RETURN_MODAL,
	RETURN_MODAL_STATUS,
	mixin as RecordMixin,
} from "./MineProduct";
import useVuelidate from "@vuelidate/core";
import CaveDetailComponent from "@components/CaveDetailComponent";
import LanguageContent from "./@components/LanguageContent.vue";
import { Chart } from "chart.js";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import CaveDateTimePicker from "@components/CaveDateTimePicker";
import { formatToDateTime } from "seedwork/dateFormatter";
import ManualPriceListing from "./@components/ManualPriceListing";

export default {
	name: "DepositDetailPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveDetailComponent, LanguageContent, Chart, CaveDateTimePicker, ManualPriceListing },
	setup() {
		return { v$: useVuelidate() };
	},
	props: {
		recordId: { type: String, require: true },
	},
	data: () => ({
		requestParam: {},
		STATUS: {},
		RETURN_MODAL: {},
		payoutModeType: {},
		isRead: true,
		chartData: {},
		records: {},
		chartOptions: {
			scales: {
				xAxes: [
					{
						stacked: true,
						gridLines: { display: false },
					},
				],
				yAxes: [
					{
						ticks: {
							stepSize: 300,
							callback: function (value, index, values) {
								return parseFloat(value).toFixed(0);
							},
						},
						// stacked: true
					},
				],
			},
			maintainAspectRatio: false,
			legend: {
				labels: {
					boxWidth: 10,
				},
				position: "top",
			},
			animation: {
				duration: 2000,
				easing: "easeInOutQuart",
			},
		},
		...createInstance(),
	}),
	validations: {
		...createValidator(),
	},
	computed: {},
	async created() {
		await this.getDetail();
	},
	methods: {
		async getDetail() {
			const [error, result] =
				await this.$service.mineProductService.getPriceInfo(
					this.recordId
				);

			if (error) {
				this.showError(error);
			} else {
				this.records = result.content;
				document.getElementById("chart").innerHTML =
					"<canvas height='300px'></canvas>";
				const chartElement = document.querySelector("canvas");

				let labels = [];
				let data = [];
				this.records.priceHistoryDAOSubList.forEach(
					(element, index) => {
						if (index % 1 == 0) {
							labels.push(element.time);
							data.push(element.price);
						}
					}
				);

				this.chartData = {
					labels: labels,
					datasets: [
						{
							label: result.content.gmptShortCode,
							data: data,
							backgroundColor: "rgba(224, 248, 255, 0.4)",
							borderColor: "#5cddff",
							lineTension: 0,
							pointBackgroundColor: "#5cddff",
						},
					],
				};
				const chart = new Chart(chartElement, {
					type: "line",
					data: this.chartData,
					options: this.chartOptions,
				});
			}
		},
		async submitPrice() {
			if (
				this.requestParam.price == null ||
				this.requestParam.price == ""
			) {
				this.$swal(
					"Error",
					this.$messages.fieldLabelPrice() +
						" " +
						this.$messages.fieldLabelIsRequired(),
					"error"
				);
				return;
			}

			if (
				this.requestParam.startDatetime == null ||
				this.requestParam.startDatetime == ""
			) {
				this.$swal(
					"Error",
					this.$messages.fieldLabelRedPacketStartDate() +
						" " +
						this.$messages.fieldLabelIsRequired(),
					"error"
				);
				return;
			}

			if (
				this.requestParam.endDatetime == null ||
				this.requestParam.endDatetime == ""
			) {
				this.$swal(
					"Error",
					this.$messages.fieldLabelRedPacketEndDate() +
						" " +
						this.$messages.fieldLabelIsRequired(),
					"error"
				);
				return;
			}

			var formData = new FormData();
			formData.append("gmptId", this.recordId);
			formData.append("price", this.requestParam.price);
			formData.append("startDateTime", formatToDateTime(this.requestParam.startDatetime));
			formData.append("endDateTime", formatToDateTime(this.requestParam.endDatetime));

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] =
				await this.$service.mineProductService.updatePrice(formData);

			loader.hide();

			if (error) {
				this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.getDetail();
			}

			this.requestParam.price = null;
			this.requestParam.datetime = null;
		},
	},
};
</script>

<style lang="scss" scoped>
.card-title--right {
	float: right;
}
.cave-detail--side {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 4px;
	padding-top: 10px;
	.cave-detail--side-image {
		display: grid;
		grid-template-rows: 30px auto;
		img {
			max-width: 250px;
		}
	}
}
</style>