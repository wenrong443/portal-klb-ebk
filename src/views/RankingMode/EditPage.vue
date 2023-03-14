    <template>
	<div class="row">
		<div class="col-md-9">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">
						{{ $messages.labelRankingModeEditPageTitle() }}</h4>
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
                                <cave-advanced-text-area v-model="fieldOption.value" />
								<!-- <input type="text" class="form-control mr-2"
									:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTitle()"
									v-model="fieldOption.value" /> -->
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
								<label>{{ $messages.fieldLabelRuleNRegulation() }}</label>
                                <cave-advanced-text-area v-model="fieldOption.value" />
								<!-- <input type="text" class="form-control mr-2"
									:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelRuleNRegulation()"
									v-model="fieldOption.value" /> -->
							</div>
						</div>
						<div v-if="v$.fieldOptionsDescription.$error">
							<div v-if="v$.fieldOptionsDescription.checkIfSelectAllLanguage"
								class="error">
								{{ $messages.fieldLabelRuleNRegulation() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
                    <div class="form-group cave-form">
						<div class
							v-for="fieldOption in fieldOptionsUnit"
							v-bind:key="fieldOption.ltId">
							<div class="cave-form--input-group"
								v-if="selectedTab.id == fieldOption.ltId">
								<label>{{ $messages.fieldLabelUnitTitle() }}</label>
								<input type="text" class="form-control mr-2"
									:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUnitTitle()"
									v-model="fieldOption.value" />
							</div>
						</div>
						<div v-if="v$.fieldOptionsUnit.$error">
							<div v-if="v$.fieldOptionsUnit.checkIfSelectAllLanguage"
								class="error">
								{{ $messages.fieldLabelUnitTitle() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label
							for="inputState">{{ $messages.fieldLabelRankingModeMode() }}</label>
						<select class="form-control" v-model="rmtMode">
							<option v-for="modeOption in modeOptions"
								v-bind:value="modeOption.id"
								v-bind:key="modeOption.id">
								{{ $messages[modeOption.value]() }}
							</option>
						</select>
						<div v-if="v$.rmtMode.$error">
							<div v-if="v$.rmtMode.required" class="error">
								{{ $messages.fieldLabelRankingModeMode() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelRankingModeStartDate() }}</label>
						<input type="date" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelRankingModeStartDate()"
							v-model="rmtStart" />
						<div v-if="v$.rmtStart.$error">
							<div v-if="v$.rmtStart.required" class="error">
								{{ $messages.fieldLabelRankingModeStartDate() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label>{{ $messages.fieldLabelRankingModeEndDate() }}</label>
						<input type="date" class="form-control"
							:placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelRankingModeEndDate()"
							v-model="rmtEnd" />
						<div v-if="v$.rmtEnd.$error">
							<div v-if="v$.rmtEnd.required" class="error">
								{{ $messages.fieldLabelRankingModeEndDate() }}{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
					<!-- <cave-switch-checkbox v-model="rmtStatus"
						:text="$messages.labelStatus()">
					</cave-switch-checkbox> -->
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
} from "./Ranking";
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import useVuelidate from "@vuelidate/core";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import Tabs from "@components/Tabs.vue";

export default {
	name: "",
	components: { CaveAdvancedTextArea, CaveSwitchCheckbox, Tabs },
	mixins: [RecordMixin, pageBehaviour],
	props: {
		recordId: { type: Number, required: true, default: null },
	},
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		selectedTab: {},
		tabKey: 0,
		tabs: [],
		...createInstance(),
	}),
	validations: {
		...createValidator(false),
	},
	async created() {
		this.setLoading();
		await this.getLanguageOptions();
		await this.getDetail();
		this.setCompleted();
	},
	methods: {
        cancel() {
			history.back();
		},
		async getDetail() {
			const [error, result] = await this.$service.rankingModeService.getDetail(
				this.recordId
			);

			if (error) {
				this.$swal("Failed to get detail");
			} else {
				assign(this, result.content);
				this.fieldOptionsTitle = JSON.parse(result.content.rmtTitle);
				this.fieldOptionsDescription = JSON.parse(
					result.content.rmtDescription
				);
                this.fieldOptionsUnit = JSON.parse(
					result.content.rmtParam1
				);

               
			}
		},
		async save() {
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}

			this.rmtTitle = this.fieldOptionsTitle;
			this.rmtDescription = this.fieldOptionsDescription;
             this.rmtParam1 = this.fieldOptionsUnit;

			const record = {
				...createInstance(this),
			};
			this.setLoading();

			const [error, result] = await this.$service.rankingModeService.update(
				record
			);
			if (error) {
				this.showError(error);
			} else {
				this.setCompleted();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "RankingModeSummaryPage" });
			}
		},
	},
	watch: {
		languageOptions() {
			this.fieldOptionsTitle = this.languageOptions.map((d) => {
				return {
					ltId: d.ltId,
					value: "",
				};
			});
			this.fieldOptionsDescription = this.languageOptions.map((d) => {
				return {
					ltId: d.ltId,
					value: "",
				};
			});

			this.tabs = this.languageOptions.map((d) => {
				return {
					id: d.ltId.toString(),
					name: d.ltName,
					routeName: d.ltName,
				};
			});
			this.selectedTab = this.tabs[0];
		},
	},
};
</script>
