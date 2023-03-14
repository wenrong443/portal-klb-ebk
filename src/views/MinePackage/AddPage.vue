<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelMinePackageAddPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group cave-form">
						<tabs :tabs="tabs" keyField="id" valueField="name" v-model="selectedTab" :key="tabKey" v-if="tabs.length > 0"></tabs>
						<div class="form-group cave-form">
							<div class v-for="fieldOptionDisplayTitle in fieldOptionDisplayTitles" v-bind:key="fieldOptionDisplayTitle.ltId">
								<div class="cave-form--input-group" v-if="selectedTab.id == fieldOptionDisplayTitle.ltId">
									<label>{{ $messages.fieldLabelTitle() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTitle()"
										v-model="fieldOptionDisplayTitle.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionDisplayTitles.$error">
								<div v-if="v$.fieldOptionDisplayTitles.checkIfSelectAllLanguage" class="error">
									{{ $messages.fieldLabelTitle() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>
						<div class="form-group cave-form">
							<div class v-for="fieldOptionDisplayDescriptionShort in fieldOptionDisplayDescriptionShorts"
								v-bind:key="fieldOptionDisplayDescriptionShort.ltId">
								<div class="cave-form--input-group" v-if="selectedTab.id == fieldOptionDisplayDescriptionShort.ltId">
									<label>{{ $messages.fieldLabelDescription() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelDescription()"
										v-model="fieldOptionDisplayDescriptionShort.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionDisplayDescriptionShorts.$error">
								<div v-if="v$.fieldOptionDisplayDescriptionShorts.checkIfSelectAllLanguage" class="error">
									{{ $messages.fieldLabelDescription() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>

						<div class="form-group cave-form">
							<div class v-for="fieldOptionNotavailableConditional in fieldOptionNotavailableConditionals"
								v-bind:key="fieldOptionNotavailableConditional.ltId">
								<div class="cave-form--input-group" v-if="selectedTab.id == fieldOptionNotavailableConditional.ltId">
									<label>{{ $messages.fieldLabelNotAvailableConditional() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelNotAvailableConditional()"
										v-model="fieldOptionNotavailableConditional.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionNotavailableConditionals.$error">
								<div v-if="v$.fieldOptionNotavailableConditionals.checkIfSelectAllLanguage" class="error">
									{{ $messages.fieldLabelNotAvailableConditional() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>

						<div class="form-group cave-form">
							<div class v-for="fieldOptionNotavailableInactive in fieldOptionNotavailableInactives"
								v-bind:key="fieldOptionNotavailableInactive.ltId">
								<div class="cave-form--input-group" v-if="selectedTab.id == fieldOptionNotavailableInactive.ltId">
									<label>{{ $messages.fieldLabelNotAvailableInactive() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelNotAvailableInactive()"
										v-model="fieldOptionNotavailableInactive.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionNotavailableInactives.$error">
								<div v-if="v$.fieldOptionNotavailableInactives.checkIfSelectAllLanguage" class="error">
									{{ $messages.fieldLabelNotAvailableInactive() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>

						<div class="form-group cave-form">
							<div class v-for="fieldOptionNotavailableDowngrade in fieldOptionNotavailableDowngrades"
								v-bind:key="fieldOptionNotavailableDowngrade.ltId">
								<div class="cave-form--input-group" v-if="selectedTab.id == fieldOptionNotavailableDowngrade.ltId">
									<label>{{ $messages.fieldLabelNotAvailableDowngrade() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelNotAvailableDowngrade()"
										v-model="fieldOptionNotavailableDowngrade.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionNotavailableDowngrades.$error">
								<div v-if="v$.fieldOptionNotavailableDowngrades.checkIfSelectAllLanguage" class="error">
									{{ $messages.fieldLabelNotAvailableDowngrade() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>

						<div class="form-group cave-form">
							<div class v-for="fieldOptionNotavailablePurchaseonce in fieldOptionNotavailablePurchaseonces"
								v-bind:key="fieldOptionNotavailablePurchaseonce.ltId">
								<div class="cave-form--input-group" v-if="selectedTab.id == fieldOptionNotavailablePurchaseonce.ltId">
									<label>{{ $messages.fieldLabelNotAvailablePurchaseonce() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelNotAvailablePurchaseonce()"
										v-model="fieldOptionNotavailablePurchaseonce.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionNotavailablePurchaseonces.$error">
								<div v-if="v$.fieldOptionNotavailablePurchaseonces.checkIfSelectAllLanguage" class="error">
									{{ $messages.fieldLabelNotAvailablePurchaseonce() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>

						<div class="form-group cave-form">
							<div class v-for="fieldOptionNotavailableCurrent in fieldOptionNotavailableCurrents"
								v-bind:key="fieldOptionNotavailableCurrent.ltId">
								<div class="cave-form--input-group" v-if="selectedTab.id == fieldOptionNotavailableCurrent.ltId">
									<label>{{ $messages.fieldLabelNotAvailableCurrent() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelNotAvailableCurrent()"
										v-model="fieldOptionNotavailableCurrent.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionNotavailableCurrents.$error">
								<div v-if="v$.fieldOptionNotavailableCurrents.checkIfSelectAllLanguage" class="error">
									{{ $messages.fieldLabelNotAvailableCurrent() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>

						<div class="form-group cave-form">
							<div class v-for="fieldOptionAvailableUpgrade in fieldOptionAvailableUpgrades"
								v-bind:key="fieldOptionAvailableUpgrade.ltId">
								<div class="cave-form--input-group" v-if="selectedTab.id == fieldOptionAvailableUpgrade.ltId">
									<label>{{ $messages.fieldLabelAvailableUpgrade() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelAvailableUpgrade()"
										v-model="fieldOptionAvailableUpgrade.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionAvailableUpgrades.$error">
								<div v-if="v$.fieldOptionAvailableUpgrades.checkIfSelectAllLanguage" class="error">
									{{ $messages.fieldLabelAvailableUpgrade() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>

						<div class="form-group cave-form">
							<div class v-for="fieldOptionAvailablePurchase in fieldOptionAvailablePurchases"
								v-bind:key="fieldOptionAvailablePurchase.ltId">
								<div class="cave-form--input-group" v-if="selectedTab.id == fieldOptionAvailablePurchase.ltId">
									<label>{{ $messages.fieldLabelAvailablePurchase() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelAvailablePurchase()"
										v-model="fieldOptionAvailablePurchase.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionAvailablePurchases.$error">
								<div v-if="v$.fieldOptionAvailablePurchases.checkIfSelectAllLanguage" class="error">
									{{ $messages.fieldLabelAvailablePurchase() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>

					</div>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelProduct() }}</label>
						<select class="form-control" v-model="gmpaatGmptId">
							<option v-for="product in productList" v-bind:value="product.gmptId" v-bind:key="product.gmptId">
								{{ product.gmptShortCode }}
							</option>
						</select>
						<div v-if="v$.gmpaatGmptId.$error">
							<div v-if="v$.gmpaatGmptId.required" class="error">
								{{ $messages.fieldLabelProduct() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelRewardPerDay() }}</label>
						<input type="number" v-model="gmpaatRewardPerDay" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelRewardPerDay()" />
						<div v-if="v$.gmpaatRewardPerDay.$error">
							<div v-if="v$.gmpaatRewardPerDay.required" class="error">
								{{ $messages.fieldLabelRewardPerDay() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelValidity() }}</label>
						<input type="number" v-model="gmpaatValidityDay" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelValidity()" />
						<div v-if="v$.gmpaatValidityDay.$error">
							<div v-if="v$.gmpaatValidityDay.required" class="error">
								{{ $messages.fieldLabelValidity() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelOriginalPrice() }}</label>
						<input type="number" v-model="originalPrice" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelOriginalPrice()" />
						<div v-if="v$.originalPrice.$error">
							<div v-if="v$.originalPrice.required" class="error">
								{{ $messages.fieldLabelOriginalPrice() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelPrice() }}</label>
						<input type="number" v-model="gmpaatPackagePrice" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelPrice()" />
						<div v-if="v$.gmpaatPackagePrice.$error">
							<div v-if="v$.gmpaatPackagePrice.required" class="error">
								{{ $messages.fieldLabelPrice() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelConditionalPackage() }}</label>
						<select class="form-control" v-model="conditionalGmpaatId">
							<option v-for="typeOption in packageOptions" v-bind:value="typeOption.gmpaatId" v-bind:key="typeOption.gmpaatId">
								{{ typeOption.title }}</option>
						</select>
					</div>
					<div class="form-group">
						<cave-image-upload :title="$messages.fieldLabelImageCalculator()" v-model="image"></cave-image-upload>
						<!-- <div v-if="v$.image.$error">
							<div v-if="v$.image.required" class="error">Image is required.</div>
						</div> -->
					</div>
					<div class="form-group">
						<cave-image-upload :title="$messages.fieldLabelImageBanner()" v-model="image2"></cave-image-upload>
						<!-- <div v-if="v$.image.$error">
							<div v-if="v$.image.required" class="error">Image is required.</div>
						</div> -->
					</div>
					<!-- <cave-switch-checkbox v-model="gmptCanSubscribeMultiplePackage" :text="$messages.fieldLabelCanSubscribeMultiple()"></cave-switch-checkbox> -->
					<cave-switch-checkbox v-model="gmpaatPurchaseOnce" :text="$messages.fieldPurchaseOnce()"></cave-switch-checkbox>
					<cave-switch-checkbox v-model="gmpaatStatus" :text="$messages.labelStatus()"></cave-switch-checkbox>

				</div>
				<div class="card-footer">
					<button type="submit" class="btn btn-danger btn-round" @click="cancel()">{{ $messages.labelCancel() }}</button>
					<button type="submit" class="btn btn-info btn-round" @click="save()">{{ $messages.labelSave() }}</button>
				</div>
			</div>
		</div>
		<div class="col-md-3">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">Good Title Would Help</h4>
				</div>
				<div class="card-body">
					<p>Discovere how a title would help to make the post attractive</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import CaveImageUpload from "@components/CaveImageUpload";
import {
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./MinePackage";
import useVuelidate from "@vuelidate/core";
import Tabs from "@components/Tabs.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveSwitchCheckbox, CaveImageUpload, Tabs },
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		productList: [],
		...createInstance(),
	}),
	validations: {
		...createValidator(),
	},
	async created() {
		const [error, result] =
			await this.$service.mineProductService.getAll2();
		if (error) {
			this.showError(error);
		} else {
			this.productList = result.content;
		}
	},
	computed: {},
	methods: {
		async save() {
			this.v$.$touch();

			if (this.v$.$invalid) {
				return;
			}

			if (this.image == null) {
				this.$swal(
					"",
					this.$messages.fieldLabelImageIsRequired(),
					"error"
				);
				return;
			}
			if (this.image2 == null) {
				this.$swal(
					"",
					this.$messages.fieldLabelImageIsRequired(),
					"error"
				);
				return;
			}

			this.gmpaatDisplayDescription =
				this.fieldOptionDisplayDescriptionShorts;
			this.gmpaatDisplayTitle = this.fieldOptionDisplayTitles;

			this.gmpaatNotavailableConditional =
				this.fieldOptionNotavailableConditionals;
			this.gmpaatNotavailableInactive =
				this.fieldOptionNotavailableInactives;
			this.gmpaatNotavailableDowngrade =
				this.fieldOptionNotavailableDowngrades;
			this.gmpaatNotavailablePurchaseonce =
				this.fieldOptionNotavailablePurchaseonces;
			this.gmpaatNotavailableCurrent =
				this.fieldOptionNotavailableCurrents;
			this.gmpaatAvailableUpgrade = this.fieldOptionAvailableUpgrades;
			this.gmpaatAvailablePurchase = this.fieldOptionAvailablePurchases;

			const record = {
				...createInstance(this),
			};
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] =
				await this.$service.minePackageService.addFund(record);
			loader.hide();
			if (error) {
				this.showError(error);
			} else {
				await this.uploadImage(result.content);
			}
		},
		async uploadImage(id) {
			var formData = new FormData();
			formData.append("imageCalculator", this.image);
			formData.append("imageBanner", this.image2);

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});

			const [error, result] =
				await this.$service.mineProductService.uploadImagePackage(
					id,
					formData
				);

			if (error) {
				loader.hide();
				this.showError(error);
			} else {
				loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "MinePackageSummaryPage" });
			}
		},
		cancel() {
			this.$router.push({ name: "MinePackageSummaryPage" });
		},
	},
};
</script>

<style></style>
