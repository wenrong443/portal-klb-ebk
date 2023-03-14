<template>
  <div class="row">
    <div class="col-md-9">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">{{$messages.labelAnnouncementEditPage()}}</h4>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label>{{$messages.fieldLabelAnnouncementTitle()}}</label>
            <input type="email" class="form-control" :placeholder="$messages.fieldTooltipAnnouncementTitle()" v-model="atTitle" />
            <div v-if="v$.atTitle.$error">
              <div v-if="v$.atTitle.required" class="error">{{$messages.fieldValidationAnnouncementTitleRequired()}}</div>
              <div v-if="v$.atTitle.minLength" class="error">{{$messages.fieldValidationAnnouncementTitleMinLength()}}</div>
            </div>
          </div>
          <div class="form-group">
            <label for="inputState">{{ $messages.fieldLabelLanguage() }}</label>
            <select class="form-control" v-model="atLtId">
              <option
                v-for="settingOption in languageOptions2"
                v-bind:value="settingOption.ltId"
                v-bind:key="settingOption.ltId"
              >{{ settingOption.ltName }}</option>
            </select>
            <div v-if="v$.atLtId.$error">
              <div v-if="v$.atLtId.required" class="error">{{ $messages.fieldLabelLanguage() }}{{ $messages.fieldLabelIsRequired() }}</div>
            </div>
          </div>
          <label for="inputState">{{ $messages.fieldLabelCategory() }}</label>
          <div class="form-group">
            <select class="form-control" v-model="atActId">
              <option
                v-for="categoryOption in categoryOptions2"
                v-bind:value="categoryOption.actId"
                v-bind:key="categoryOption.actId"
              >{{ categoryOption.actName }}</option>
            </select>
          </div>

          <cave-switch-checkbox v-model="atStatus" :text="$messages.labelStatus()"></cave-switch-checkbox>
          <cave-switch-checkbox v-model="atDisplayType" :text="$messages.fieldLabelShowOnceOnly()"></cave-switch-checkbox>

          <label>{{ $messages.fieldLabelShortDescription() }}</label>
          <cave-text-area v-model="atContent" />
          <div v-if="v$.atContent.$error">
            <div v-if="v$.atContent.required" class="error">{{ $messages.fieldLabelShortDescription() }}{{ $messages.fieldLabelIsRequired() }}</div>
            <div v-if="v$.atContent.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtMax() }} 20 {{ $messages.fieldLabelCharacters() }}</div>
          </div>

          <div class="form-group">
						<label>{{ $messages.fieldLabelLongDescription() }}</label>
						<cave-advanced-text-area v-model="htmlContent" />
						<div v-if="v$.htmlContent.$error">
							<div v-if="v$.htmlContent.required"
								class="error">
								{{ $messages.fieldLabelLongDescription() }}
								{{ $messages.fieldLabelIsRequired() }}
							</div>
						</div>
					</div>
        </div>
        <div class="card-footer">
          <button type="submit" class="btn btn-danger btn-round" @click="cancel()">{{ $messages.labelCancel() }}</button>
          <button type="submit" class="btn btn-info btn-round" @click="save()">{{ $messages.labelSave() }}</button>
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
	assign,
	mixin as RecordMixin,
} from "./Announcement";
import CaveTextArea from "@components/CaveTextArea";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import useVuelidate from "@vuelidate/core";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";

export default {
	name: "",
	components: { CaveTextArea, CaveSwitchCheckbox, CaveAdvancedTextArea },
	setup() {
		return { v$: useVuelidate() };
	},
	mixins: [RecordMixin, pageBehaviour],
	props: {
		announcementId: { type: Number, required: true, default: null },
	},
	data: () => ({
		result: {},
		categoryOptions: [],
		settingOptions: [],
		...createInstance(),
	}),
	validations: {
		...createValidator(),
	},
	async created() {
		await this.getDetail();
	},
	methods: {
		async getDetail() {
			const [error, result] = await this.$service.announcementService.getDetail(
				this.announcementId
			);

			if (error) {
				this.$swal("Failed to add ");
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

			const [error, result] = await this.$service.announcementService.update(
				record
			);
			if (error) {
                this.showError(error);
			} else {
				this.$swal("Update successfully.");
				this.$router.push({ name: "AnnouncementSummaryPage" });
			}
		},
        cancel() {
			history.back();
		},
	},
};
</script>

<style>
</style>