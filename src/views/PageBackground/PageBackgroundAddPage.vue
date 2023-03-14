<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
						{{ $messages.labelPageBackgroundAddPage() }}</h4>
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
						<cave-image-upload :title="$messages.fieldLabelImage()"
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
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import CaveImageUpload from "@components/CaveImageUpload";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

import {
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./PageBackground";
import useVuelidate from "@vuelidate/core";

export default {
	name: "SlieshowAddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveAdvancedTextArea, CaveSwitchCheckbox, CaveImageUpload },
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		...createInstance(),
	}),
	validations: {
		...createValidator(true),
	},
	created() {},
	methods: {
        cancel() {
			history.back();
		},
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}

			var formData = new FormData();
			formData.append("image", this.image);
			formData.append("pbtUiLink", this.pbtUiLink);
			formData.append("pbtRemark", this.pbtRemark);
			formData.append("pbtStatus", this.pbtStatus);
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] = await this.$service.pageBackgroundService.add(
				formData
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

<style></style>