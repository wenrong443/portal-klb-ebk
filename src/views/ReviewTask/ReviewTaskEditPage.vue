    <template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelReviewTaskEditPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label for="inputState">{{ $messages.fieldLabelType() }}</label>
						<select class="form-control" v-model="grtType">
							<option v-for="typeOption in typeOptions" v-bind:value="typeOption.id" v-bind:key="typeOption.id">
								{{ $messages[typeOption.value]() }}
							</option>
						</select>
						<div v-if="v$.grtType.$error">
							<div v-if="v$.grtType.required" class="error">
								{{ $messages.fieldLabelTypeIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelAnnouncementTitle() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelAnnouncementTitle()"
							v-model="grtTitle" />
						<div v-if="v$.grtTitle.$error">
							<div v-if="v$.grtTitle.required" class="error">
								{{ $messages.fieldLabelAnnouncementTitle() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelDescription() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelDescription()"
							v-model="grtDescription" />
						<div v-if="v$.grtDescription.$error">
							<div v-if="v$.grtDescription.required" class="error">
								{{ $messages.fieldLabelDescription() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
                    <div class="form-group" v-if="isV2">
						<label>{{ $messages.fieldLabelDisplayQuantity() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelDisplayQuantity()"
							v-model="displayQuantity" />
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelPrice() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelPrice()"
							v-model="grtPrice" />
						<div v-if="v$.grtPrice.$error">
							<div v-if="v$.grtPrice.required" class="error">
								{{ $messages.fieldLabelPrice() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.grtPrice.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 1
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelTotalIssuing() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTotalIssuing()"
							v-model="grtQuantity" />
						<div v-if="v$.grtQuantity.$error">
							<div v-if="v$.grtQuantity.required" class="error">
								{{ $messages.fieldLabelTotalIssuing() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.grtQuantity.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelRedPacketMaxPerUser() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelRedPacketMaxPerUser()"
							v-model="grtMaxPerUser" />
						<div v-if="v$.grtMaxPerUser.$error">
							<div v-if="v$.grtMaxPerUser.required" class="error">
								{{ $messages.fieldLabelRedPacketMaxPerUser() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.grtMaxPerUser.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group">
						<label>{{ $messages.fieldLabelPriority() }}</label>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelPriority()"
							v-model="priority" />
						<div v-if="v$.priority.$error">
							<div v-if="v$.priority.required" class="error">
								{{ $messages.fieldLabelPriority() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.priority.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>

					<div class="form-group">
						<cave-image-upload :title="$messages.fieldLabelImage()" v-model="image" :existedImage="grtImage1"></cave-image-upload>
					</div>

					<cave-switch-checkbox v-model="grtStatus" :text="$messages.labelStatus()"></cave-switch-checkbox>
				</div>
				<div class="card-footer">
					<button type="submit" class="btn btn-danger btn-round" @click="cancel()">{{ $messages.labelCancel() }}</button>
					<button type="submit" class="btn btn-info btn-round" @click="save()">
						{{ $messages.labelSave() }}
					</button>
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
import {
	createInstance,
	createValidator,
	createValidatorEdit,
	assign,
	mixin as RecordMixin,
} from "./ReviewTask";
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import useVuelidate from "@vuelidate/core";
import json from "../../infrastructure/json/config.json";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import CaveImageUpload from "@components/CaveImageUpload";

export default {
	name: "",
	components: { CaveAdvancedTextArea, CaveSwitchCheckbox, CaveImageUpload },
	mixins: [RecordMixin, pageBehaviour],
	props: {
		recordId: { type: Number, required: true, default: null },
	},
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		isV2: process.env.IS_V2 == "true" ? true : false,
		totalProfileImages: json.totalProfileImages,
		...createInstance(),
	}),
	validations: {
		...createValidatorEdit(),
	},
	async created() {
		await this.getDetail();
	},
	methods: {
		cancel() {
			history.back();
		},
		async getDetail() {
			const [error, result] =
				await this.$service.reviewService.getTaskDetail(this.recordId);

			if (error) {
				this.$swal("Failed to get detail");
			} else {
				assign(this, result.content);
			}
		},
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}

			var formData = new FormData();
			if (this.image != null) {
				formData.append("image", this.image);
			}
			formData.append("grtType", this.grtType);
			formData.append("grtPrice", this.grtPrice);
			formData.append("grtQuantity", this.grtQuantity);
			formData.append("grtMaxPerUser", this.grtMaxPerUser);
			formData.append("grtTitle", this.grtTitle);
			formData.append("grtDescription", this.grtDescription);
			formData.append("grtStatus", this.grtStatus);
			formData.append("priority", this.priority);
			if (this.isV2) {
				formData.append("displayQuantity", this.displayQuantity);
			}

			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] =
				await this.$service.reviewService.updateTask(
					formData,
					this.recordId
				);
			loader.hide();
			if (error) {
				this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "ReviewTaskSummaryPage" });
			}
		},
	},
};
</script>

<style>
</style>