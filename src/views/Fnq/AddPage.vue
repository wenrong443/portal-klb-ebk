<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
						{{ $messages.labelFnqAddPage() }}</h4>
				</div>
				<div class="card-body">
					<div class="form-group cave-form">
						<tabs :tabs="tabs" keyField="id" valueField="name"
							v-model="selectedTab" :key="tabKey"
							v-if="tabs.length > 0"></tabs>
						<div class v-for="fieldOption in fieldOptionsTitle"
							v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group"
								v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelTitle() }}</label>
								<input type="text" class="form-control mr-2"
									:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTitle()"
									v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsTitle.$error">
							<div v-if="v$.fieldOptionsTitle.checkIfSelectAllLanguage"
								class="error">
								{{ $messages.fieldLabelTitle() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group cave-form">
						<div class
							v-for="fieldOption in fieldOptionsDescription"
							v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group"
								v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelDescription() }}</label>
								<cave-advanced-text-area
									:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelDescription()"
									v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsDescription.$error">
							<div v-if="v$.fieldOptionsDescription.checkIfSelectAllLanguage"
								class="error">
								{{ $messages.fieldLabelDescription() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>

					<cave-switch-checkbox v-model="ftStatus"
						:text="$messages.labelStatus()"></cave-switch-checkbox>

				</div>
				<div class="card-footer">
					<button type="submit" class="btn btn-danger btn-round"
						@click="cancel()">
						{{ $messages.labelCancel() }}
					</button>
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
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import {
	createInstance,
	createValidator,
	mixin as RecordMixin,
} from "./Fnq";
import useVuelidate from "@vuelidate/core";
import Tabs from "@components/Tabs.vue";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveSwitchCheckbox, Tabs, CaveAdvancedTextArea },
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		...createInstance(),
	}),
	validations: {
		...createValidator(),
	},
	methods: {
		async save() {
			this.v$.$touch();

			if (this.v$.$invalid) {
				return;
			}

			this.ftTitle = this.fieldOptionsTitle;
			this.ftDescription = this.fieldOptionsDescription;

			const record = {
				...createInstance(this),
			};
			this.setLoading();
			const [error, result] = await this.$service.fnqService.add(record);

			if (error) {
				this.showError(error);
			} else {
				this.setCompleted();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "FnqSummaryPage" });
			}
		},
	},
};
</script>
