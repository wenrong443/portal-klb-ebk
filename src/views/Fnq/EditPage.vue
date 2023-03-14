<template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
						{{ $messages.labelFnqEditPage() }}</h4>
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
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import Tabs from "@components/Tabs.vue";
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";

import {
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./Fnq";
import useVuelidate from "@vuelidate/core";

export default {
	name: "EditPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveSwitchCheckbox, Tabs, CaveAdvancedTextArea },
	setup() {
		return { v$: useVuelidate() };
	},
	props: {
		recordId: { type: String, required: true },
	},
	data: () => ({
		...createInstance(),
	}),
	validations: {
		...createValidator(),
	},
	async created() {
        console.log("faq oncreate")
        await this.getLanguageOptions();
		await this.getDetail();
	},
	methods: {
        async getLanguageOptions() {
            const [error, result] =
                await this.$service.settingService.getAllLanguage();
            this.languageOptions = result.content;
            this.selectedLanguage = this.languageOptions[0].id;
        }, 
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}

			this.ftTitle = this.fieldOptionsTitle;
			this.ftDescription = this.fieldOptionsDescription;

			const record = {
				ftId: this.recordId,
				...createInstance(this),
			};
			this.setLoading();

			const [error, result] = await this.$service.fnqService.update(record);
			if (error) {
				this.showError(error);
			} else {
				this.setCompleted();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "FnqSummaryPage" });
			}
		},
		async getDetail() {
			const [error, result] = await this.$service.fnqService.getDetail(
				this.recordId
			);

			if (error) {
                        console.log("faq oncreate2")

				this.showError(error);
			} else {
                        console.log("faq oncreate3")

				assign(this, result.content);
				this.fieldOptionsTitle = JSON.parse(this.ftTitle);
				this.fieldOptionsDescription = JSON.parse(this.ftDescription);
                        console.log("faq oncreate4")

			}
		},
	},
};
</script>
