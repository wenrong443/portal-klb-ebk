<template>
  <div class="row">
    <div class="col-md-9">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">{{$messages.labelAnnouncementAddPage()}}</h4>
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
          <div class="form-group">
            <label for="inputState">{{ $messages.fieldLabelCategory() }}</label>
            <select class="form-control" v-model="atActId">
              <option
                v-for="categoryOption in categoryOptions2"
                v-bind:value="categoryOption.actId"
                v-bind:key="categoryOption.actId"
              >{{ categoryOption.actName }}</option>
            </select>
            <div v-if="v$.atActId.$error">
              <div v-if="v$.atActId.required" class="error">{{ $messages.fieldLabelCategory() }}{{ $messages.fieldLabelIsRequired() }}</div>
            </div>
          </div>

          <cave-switch-checkbox v-model="atStatus" :text="$messages.labelStatus()"></cave-switch-checkbox>
          <cave-switch-checkbox v-model="atDisplayType" :text="$messages.fieldLabelShowOnceOnly()"></cave-switch-checkbox>

          <label>{{ $messages.fieldLabelShortDescription() }}</label>
          <cave-text-area v-model="atContent" />
          <div v-if="v$.atContent.$error">
            <div v-if="v$.atContent.required" class="error">{{ $messages.fieldLabelShortDescription() }}{{ $messages.fieldLabelIsRequired() }}</div>
            <div v-if="v$.atContent.minLength" class="error">{{ $messages.fieldLabelPleaseInsertAtLeast() }} 20 {{ $messages.fieldLabelCharacters() }}</div>
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
import CaveTextArea from "@components/CaveTextArea";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";

import {
	createInstance,
	createValidator,
	assign,
	mixin as RecordMixin,
} from "./Announcement";
import useVuelidate from "@vuelidate/core";

export default {
	name: "AddPage",
	mixins: [RecordMixin, pageBehaviour],
	components: { CaveTextArea, CaveSwitchCheckbox, CaveAdvancedTextArea },
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

			const [error, result] = await this.$service.announcementService.add(
				record
			);

			if (error) {
                loader.hide();
                this.showError(error);
			} else {
                loader.hide();
				this.$swal("", this.$messages.labelSuccess(), "success");
				this.$router.push({ name: "AnnouncementSummaryPage" });
			}
		},
        cancel() {
			history.back();
		},
	},
};
</script>

<style></style>
