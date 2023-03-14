<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.labelIPAddressAddPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label>{{ $messages.fieldLabelIPAddress() }}</label>
						<input type="email" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelIPAddress()" v-model="witIp" />
						<div v-if="v$.witIp.$error">
							<div v-if="v$.witIp.ipValidator" class="error">{{ $messages.labelInvalid() }}{{ $messages.fieldLabelIPAddress() }}</div>
							<div v-if="v$.witIp.required" class="error">{{ $messages.fieldLabelIPAddress() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.witIp.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 5 {{ $messages.fieldLabelCharacters() }}</div>
							<div v-if="v$.witIp.maxLength" class="error">{{ $messages.fieldLabelPleaseInsertAtMax() }} 50 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelUserRemarks() }}</label>
						<textarea class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserRemarks()" v-model="witRemarks" />
						<div v-if="v$.witRemarks.$error">
							<div v-if="v$.witRemarks.required" class="error">{{ $messages.fieldLabelUserRemarks() }}{{ $messages.fieldLabelIsRequired() }}</div>
							<div v-if="v$.witRemarks.maxLength" class="error">{{ $messages.fieldLabelPleaseInsertAtMax() }} 300 {{ $messages.fieldLabelCharacters() }}</div>
						</div>
					</div>
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
import {
	createInstance,
	createValidator,
	mixin as RecordMixin,
} from "./WhitelistIp";
import useVuelidate from "@vuelidate/core";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: {},
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
			const [error, result] = await this.$service.settingService.addWhitelistIp(
				record
			);
            loader.hide();

			if (error) {
                this.showError(error);
			} else {
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "WhitelistIpSummaryPage" });
			}
		},
		cancel() {
			this.$router.push({ name: "WhitelistIpSummaryPage" });
		},
	},
};
</script>

<style></style>
