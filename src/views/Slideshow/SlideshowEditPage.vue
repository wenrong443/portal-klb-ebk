<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
						{{ $messages.labelSlideshowEditPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label>{{ $messages.fieldLabelTitle() }}</label>
						<input type="email" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTitle()"
							v-model="sstName" />
						<div v-if="v$.sstName.$error">
							<div v-if="v$.sstName.required" class="error">
								{{ $messages.fieldLabelTitle() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.sstName.minLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtLeast() }}
								3 {{ $messages.fieldLabelCharacters() }}</div>
							<div v-if="v$.sstName.maxLength" class="error">
								{{ $messages.fieldLabelPleaseInsertAtMax() }} 50
								{{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>
					<div class="form-group">
						<label
							for="inputState">{{ $messages.fieldLabelType() }}</label>
						<select class="form-control" v-model="sstType">
							<option v-for="typeOption in typeOptions"
								v-bind:value="typeOption.id"
								v-bind:key="typeOption.id">
								{{ typeOption.value }}</option>
						</select>
						<div v-if="v$.sstType.$error">
							<div v-if="v$.sstType.required" class="error">
								{{ $messages.fieldLabelType() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label
							for="inputState">{{ $messages.fieldLabelLanguage() }}</label>
						<select class="form-control" v-model="sstLtId">
							<option v-for="languageOption in languageOptions"
								v-bind:value="languageOption.ltId"
								v-bind:key="languageOption.ltId">
								{{ languageOption.ltName }}</option>
						</select>
						<div v-if="v$.sstLtId.$error">
							<div v-if="v$.sstLtId.required" class="error">
								{{ $messages.fieldLabelLanguage() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelUIURL() }}</label>
						<input type="email" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUIURL()"
							v-model="sstUrl" />
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelPriority() }}</label>
						<input type="number" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelPriority()"
							v-model="sstPriority" />
						<div v-if="v$.sstPriority.$error">
							<div v-if="v$.sstPriority.required" class="error">
								{{ $messages.fieldLabelPriority() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
							<div v-if="v$.sstPriority.minValue" class="error">
								{{ $messages.fieldLabelMin() }} 0
							</div>
						</div>
					</div>
					<!-- <div class="form-group">
						<label>Image</label>
						<br>
						<img id="imagePreview" src="../../assets/img/image-add-icon.png" class="image-picker" @click="chooseImage()" />
						<input id="imageInput" type="file" class="form-control" @change="imageOnChange()" accept="image/*" hidden />
						<div v-if="v$.image.$error">
							<div v-if="v$.image.required" class="error">Image is required.</div>
						</div>
					</div> -->
					<div class="form-group">
						<cave-image-upload v-model="image"
							:title="$messages.fieldLabelImage()"
							:existedImage="fileDownloadURL"></cave-image-upload>
						<div v-if="v$.image.$error">
							<div v-if="v$.image.required" class="error">
								{{ $messages.fieldLabelImage() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<cave-switch-checkbox v-model="sstStatus"
						:text="$messages.labelStatus()"></cave-switch-checkbox>
					<div class="form-group">
						<label>{{ $messages.fieldLabelSlideshowDescription() }}</label>
						<cave-advanced-text-area v-model="sstDescription" />
						<!-- <div v-if="v$.sstDescription.$error">
							<div v-if="v$.sstDescription.required"
								class="error">
								{{ $messages.fieldLabelSlideshowDescription() }}
								{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div> -->
					</div>
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
} from "./Slideshow";
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
        await this.getOptionList();
		await this.getDetail();
	},
	methods: {
        async getOptionList() {
            const [[, languageOptions]] = await Promise.all([
                this.$service.settingService.getAllLanguage(),
            ]);
            this.languageOptions = languageOptions.content;
        },
        cancel() {
			history.back();
		},
		async getDetail() {
			const [error, result] = await this.$service.slideshowService.getDetail(
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
			formData.append("sstId", this.recordId);
			formData.append("sstType", this.sstType);
			formData.append("image", this.image);
			formData.append("sstName", this.sstName);
			formData.append("sstLtId", this.sstLtId);
			formData.append("sstUrl", this.sstUrl ? this.sstUrl : "");
			formData.append("sstPriority", this.sstPriority);
			formData.append("sstStatus", this.sstStatus);
			formData.append("sstDescription", this.sstDescription);
			let loader = this.$loading.show({
				// Optional parameters
				container: null,
			});
			const [error, result] = await this.$service.slideshowService.update(
				formData
			);
			loader.hide();
			if (error) {
				this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "SlideshowSummaryPage" });
			}
		},
	},
};
</script>

<style>
</style>