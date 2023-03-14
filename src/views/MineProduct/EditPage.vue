<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelMineProductEditPage() }}
					</h4>
				</div>
				<div class="card-body">
					<div class="form-group cave-form">
						<tabs :tabs="tabs" keyField="id" valueField="name" v-model="selectedTab" :key="tabKey"
							v-if="tabs.length > 0"></tabs>
						<div class="form-group cave-form">
							<div class v-for="fieldOptionDisplayTitle in fieldOptionDisplayTitles"
								v-bind:key="fieldOptionDisplayTitle.ltId">
								<div class="cave-form--input-group"
									v-if="selectedTab.id == fieldOptionDisplayTitle.ltId">
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
								<div class="cave-form--input-group"
									v-if="selectedTab.id == fieldOptionDisplayDescriptionShort.ltId">
									<label>{{ $messages.fieldLabelShortDescription() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelShortDescription()"
										v-model="fieldOptionDisplayDescriptionShort.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionDisplayDescriptionShorts.$error">
								<div v-if="v$.fieldOptionDisplayDescriptionShorts.checkIfSelectAllLanguage"
									class="error">
									{{ $messages.fieldLabelShortDescription() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>
						<div class="form-group cave-form">
							<div class v-for="fieldOptionDisplayDescriptionLong in fieldOptionDisplayDescriptionLongs"
								v-bind:key="fieldOptionDisplayDescriptionLong.ltId">
								<div class="cave-form--input-group"
									v-if="selectedTab.id == fieldOptionDisplayDescriptionLong.ltId">
									<label>{{ $messages.fieldLabelLongDescription() }}</label>
									<input type="text" class="form-control mr-2"
										:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelLongDescription()"
										v-model="fieldOptionDisplayDescriptionLong.value" />
								</div>
							</div>
							<div v-if="v$.fieldOptionDisplayDescriptionLongs.$error">
								<div v-if="v$.fieldOptionDisplayDescriptionLongs.checkIfSelectAllLanguage"
									class="error">
									{{ $messages.fieldLabelLongDescription() }}{{ $messages.fieldLabelIsRequired() }}
								</div>
							</div>
						</div>

					</div>
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelShortCode() }}</label>
						<input type="text" v-model="gmptShortCode" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelShortCode()" />
						<div v-if="v$.gmptShortCode.$error">
							<div v-if="v$.gmptShortCode.required" class="error">
								{{ $messages.fieldLabelShortCode() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelMinExchange() }}</label>
						<input type="number" v-model="gmptMinExchange" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMinExchange()" />
						<div v-if="v$.gmptMinExchange.$error">
							<div v-if="v$.gmptMinExchange.required" class="error">
								{{ $messages.fieldLabelMinExchange() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelMaxExchange() }}</label>
						<input type="number" v-model="gmptMaxExchange" class="form-control mr-2"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelMaxExchange()" />
						<div v-if="v$.gmptMaxExchange.$error">
							<div v-if="v$.gmptMaxExchange.required" class="error">
								{{ $messages.fieldLabelMaxExchange() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
                    <div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelFromColor() }} (e.g. #F0F0F0 / rgba(240,140,36,.8) )</label>
						<input type="text" v-model="fromColor" class="form-control mr-2" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelFromColor()" />
						<div v-if="v$.fromColor.$error">
							<div v-if="v$.fromColor.required" class="error">
                                {{ $messages.fieldLabelFromColor() }}{{ $messages.fieldLabelIsRequired() }}
                            </div>
						</div>
					</div>

                    <div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelToColor() }} (e.g. #F0F0F0) (e.g. #F0F0F0 / rgba(240,140,36,.8) )</label>
						<input type="text" v-model="toColor" class="form-control mr-2" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelToColor()" />
						<div v-if="v$.toColor.$error">
							<div v-if="v$.toColor.required" class="error">
                                {{ $messages.fieldLabelToColor() }}{{ $messages.fieldLabelIsRequired() }}
                            </div>
						</div>
					</div>

                    <div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelBodyFromColor() }} (e.g. #F0F0F0) (e.g. #F0F0F0 / rgba(240,140,36,.8) )</label>
						<input type="text" v-model="contentColorFrom" class="form-control mr-2" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelBodyFromColor()" />
						<div v-if="v$.contentColorFrom.$error">
							<div v-if="v$.contentColorFrom.required" class="error">
                                {{ $messages.fieldLabelBodyFromColor() }}{{ $messages.fieldLabelIsRequired() }}
                            </div>
						</div>
					</div>

                    <div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelBodyToColor() }} (e.g. #F0F0F0) (e.g. #F0F0F0 / rgba(240,140,36,.8) )</label>
						<input type="text" v-model="contentColorTo" class="form-control mr-2" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelBodyToColor()" />
						<div v-if="v$.contentColorTo.$error">
							<div v-if="v$.contentColorTo.required" class="error">
                                {{ $messages.fieldLabelBodyToColor() }}{{ $messages.fieldLabelIsRequired() }}
                            </div>
						</div>
					</div>

                    
					<!-- <cave-switch-checkbox v-model="gmptCanSubscribeMultiplePackage" :text="$messages.fieldLabelCanSubscribeMultiple()"></cave-switch-checkbox> -->
					<cave-switch-checkbox v-model="gmptStatus" :text="$messages.labelStatus()"></cave-switch-checkbox>
					<cave-switch-checkbox v-model="gmptExchangeable" :text="$messages.fieldExchangeable()">
					</cave-switch-checkbox>
					<div class="form-group">
						<cave-image-upload :title="$messages.fieldLabelImageExchange()" v-model="image"
							:existedImage="gmptImageFileName"></cave-image-upload>
						<!-- <div v-if="v$.image.$error">
							<div v-if="v$.image.required" class="error">Image is required.</div>
						</div> -->
					</div>
                    <div class="form-group">
						<cave-image-upload :title="$messages.fieldLabelImageBanner()" v-model="image2"
							:existedImage="imageForBanner"></cave-image-upload>
						<!-- <div v-if="v$.image.$error">
							<div v-if="v$.image.required" class="error">Image is required.</div>
						</div> -->
					</div>
				</div>
				<div class="card-footer">
					<button type="submit" class="btn btn-danger btn-round"
						@click="cancel()">{{ $messages.labelCancel() }}</button>
					<button type="submit" class="btn btn-info btn-round"
						@click="save()">{{ $messages.labelSave() }}</button>
				</div>
			</div>
		</div>
		<div class="col-md-3">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">Good Title Would Help</h4>
				</div>
				<div class="card-body">
					<p>Discover how a title would help to make the post attractive</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	assign,
	createInstance,
	createValidator,
	mixin as RecordMixin,
} from "./MineProduct";
import useVuelidate from "@vuelidate/core";
import Tabs from "@components/Tabs.vue";
import CaveImageUpload from "@components/CaveImageUpload";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";

export default {
	name: "DepositDetailPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { Tabs, CaveImageUpload, CaveSwitchCheckbox },
	setup() {
		return { v$: useVuelidate() };
	},
	props: {
		recordId: { type: String, require: true },
	},
	data: () => ({
		isRead: true,
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
			const [error, result] = await this.$service.mineProductService.getDetail(
				this.recordId
			);

			if (error) {
				this.showError(error);
			} else {
				//TODO: maybe got a better way, see back later
				// Can try with computed
				assign(this, result.content);

				this.fieldOptionDisplayDescriptionLongs = JSON.parse(
					this.gmptDisplayDescriptionLong
				);
				this.fieldOptionDisplayDescriptionShorts = JSON.parse(
					this.gmptDisplayDescriptionShort
				);

				this.fieldOptionDisplayTitles = JSON.parse(this.gmptDisplayTitle);
			}
		},
		cancel() {
			this.$router.push({ name: "MineProductSummaryPage" });
		},
		async save() {
			this.v$.$touch();

			if (this.v$.$invalid) {
				return;
			}

			//TODO: maybe got a better way, see back later
			// Can try with computed

			this.gmptDisplayDescriptionLong = this.fieldOptionDisplayDescriptionLongs;
			this.gmptDisplayDescriptionShort =
				this.fieldOptionDisplayDescriptionShorts;
			this.gmptDisplayTitle = this.fieldOptionDisplayTitles;

			const record = {
				...createInstance(this),
			};
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] = await this.$service.mineProductService.update(
				record
			);

			if (error) {
				loader.hide();
				this.showError(error);
			} else {
				loader.hide();
				if (!this.image && this.image2) {
					this.$swal("", this.$messages.labelSuccess(), "success");
					this.$router.push({ name: "MineProductSummaryPage" });
				} else {
					await this.uploadImage(this.recordId);
				}
			}
		},
		async uploadImage(id) {
			var formData = new FormData();
			formData.append("imageCoin", this.image);
            formData.append("imageBanner", this.image2);
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] =
				await this.$service.mineProductService.uploadImage(id, formData);

			if (error) {
				loader.hide();
			} else {
				loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "MineProductSummaryPage" });
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.card-title--right {
	float: right;
}
</style>