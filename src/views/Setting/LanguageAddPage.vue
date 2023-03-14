<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelLanguageAddPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label>{{ $messages.fieldLabelTitle() }}</label>
						<input type="email" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTitle()" v-model="ltName" />
						<div v-if="v$.ltName.$error">
							<div v-if="v$.ltName.required" class="error">{{ $messages.fieldLabelTitle() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.ltName.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 1 {{ $messages.fieldLabelCharacters() }}</div>
							<div v-if="v$.ltName.maxLength" class="error">{{ $messages.fieldLabelPleaseInsertAtMax() }} 30 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelCode() }}</label>
						<input type="email" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelCode()" v-model="ltFileName" />
						<div v-if="v$.ltFileName.$error">
							<div v-if="v$.ltFileName.required" class="error">{{ $messages.fieldLabelCode() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.ltFileName.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 3 {{ $messages.fieldLabelCharacters() }}</div>
							<div v-if="v$.ltFileName.maxLength" class="error">{{ $messages.fieldLabelPleaseInsertAtMax() }} 300 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelPriority() }}</label>
						<input type="number" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelPriority()" v-model="ltPriority" />
						<div v-if="v$.ltPriority.$error">
							<div v-if="v$.ltPriority.required" class="error">{{ $messages.fieldLabelPriority() }}{{ $messages.fieldLabelIsRequired() }}</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelUserRemarks() }}</label>
						<textarea class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserRemarks()" v-model="ltRemarks" />
						<div v-if="v$.ltRemarks.$error">
							<div v-if="v$.ltRemarks.required" class="error">{{ $messages.fieldLabelUserRemarks() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.ltRemarks.maxLength" class="error">{{ $messages.fieldLabelPleaseInsertAtMax() }} 300 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>
					<cave-switch-checkbox v-model="ltStatus" :text="$messages.labelStatus()"></cave-switch-checkbox>
				</div>
				<div class="card-footer">
					<button type="submit" class="btn btn-danger btn-round" @click="cancel">{{ $messages.labelCancel() }}</button>
					<button type="submit" class="btn btn-info btn-round" @click="save">{{ $messages.labelSave() }}</button>
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

import {
	createInstance,
	createValidator,
	mixin as RecordMixin,
} from "./Language";
import useVuelidate from "@vuelidate/core";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveSwitchCheckbox },
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		...createInstance(),
	}),
	validations: {
		...createValidator(),
	},
	created() {},
	methods: {
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}

			const record = {
				...createInstance(this),
			};
let loader = this.$loading.show({
                    // Optional parameters
                    container: null,
                });
			const [error, result] = await this.$service.settingService.addLanguage(
				record
			);
loader.hide();
			if (error) {
                this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "LanguageSummaryPage" });
			}
		},
		cancel() {
			this.$router.push({ name: "LanguageSummaryPage" });
		},
	},
};
</script>

<style></style>
