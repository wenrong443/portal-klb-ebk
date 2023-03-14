<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
						{{ $messages.labelPageBackgroundEditPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label>{{ $messages.fieldLabelUIURL() }}</label>
						<input type="email" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUIURL()"
							v-model="pbtUiLink" />
                        <div v-if="v$.pbtUiLink.$error">
							<div v-if="v$.pbtUiLink.required" class="error">
								{{ $messages.fieldLabelUIURL() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>    
					</div>
                    <div class="form-group">
						<label>{{ $messages.fieldLabelUserRemarks() }}</label>
						<input type="email" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserRemarks()"
							v-model="pbtRemark" />
                        <div v-if="v$.pbtRemark.$error">
							<div v-if="v$.pbtRemark.required" class="error">
								{{ $messages.fieldLabelUserRemarks() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<cave-image-upload :title="$messages.fieldLabelImage()" :existedImage="pbtImage"
							v-model="image"></cave-image-upload>
						<div v-if="v$.image.$error">
							<div v-if="v$.image.required" class="error">
								{{ $messages.fieldLabelImage() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<cave-switch-checkbox v-model="pbtStatus"
						:text="$messages.labelStatus()"></cave-switch-checkbox>
				</div>
				<div class="card-footer">
					<button type="submit"
						class="btn btn-danger btn-round" @click="cancel()">{{ $messages.labelCancel() }}</button>
					<button type="submit" class="btn btn-info btn-round"
						@click="save()">
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
					<p>Discovere how a title would help to make the post
						attractive</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./PageBackground";
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import CaveImageUpload from "@components/CaveImageUpload";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import useVuelidate from "@vuelidate/core";
import json from "../../infrastructure/json/config.json";

export default {
	name: "",
	components: { CaveAdvancedTextArea, CaveSwitchCheckbox, CaveImageUpload },
	mixins: [RecordMixin, pageBehaviour],
	data: {
		previewImage: "",
	},
	props: {
		recordId: { type: Number, required: true, default: null },
	},
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		...createInstance(),
	}),
	validations: {
		...createValidator(false),
	},
	async created() {
		await this.getDetail();
	},
	methods: {
        cancel() {
			history.back();
		},
		async getDetail() {
			const [error, result] = await this.$service.pageBackgroundService.getDetail(
				this.recordId
			);

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

			const record = {
				...createInstance(this),
			};

			var formData = new FormData();
            if (this.image != null){
			formData.append("image", this.image);
            }
			formData.append("pbtUiLink", this.pbtUiLink);
			formData.append("pbtRemark", this.pbtRemark);
			formData.append("pbtStatus", this.pbtStatus);
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] = await this.$service.pageBackgroundService.update(
				formData, this.recordId
			);
			loader.hide();
			if (error) {
				this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "PageBackgroundSummaryPage" });
			}
		},
	},
};
</script>

<style>
</style>