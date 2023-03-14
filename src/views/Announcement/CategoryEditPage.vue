<template>
  <div class="row">
    <div class="col-md-9">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">{{ $messages.labelAnnouncementCategoryEditPage() }}</h4>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label>{{ $messages.fieldLabelTitle() }}</label>
            <input
              type="text"
              class="form-control"
              :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTitle()"
              v-model="actName"
            />
            <div v-if="v$.actName.$error">
              <div v-if="v$.actName.required" class="error">
                {{ $messages.fieldLabelTitle() }}{{ $messages.fieldLabelIsRequired() }}
              </div>
              <div v-if="v$.actName.minLength" class="error">
                {{ $messages.fieldLabelPleaseInsertAtLeast() }} 3 {{ $messages.fieldLabelCharacters() }}
              </div>
              <div v-if="v$.actName.maxLength" class="error">
                {{ $messages.fieldLabelPleaseInsertAtMax() }} 255 {{ $messages.fieldLabelCharacters() }}
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>{{ $messages.fieldLabelUIURL() }}</label>
            <input
              type="text"
              class="form-control"
              :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUIURL()"
              v-model="actUiLink"
            />
            <div v-if="v$.actUiLink.$error">
              <div v-if="v$.actUiLink.required" class="error">
                {{ $messages.fieldLabelUIURL() }}{{ $messages.fieldLabelIsRequired() }}
              </div>
              <div v-if="v$.actUiLink.minLength" class="error">
                {{ $messages.fieldLabelPleaseInsertAtLeast() }} 3 {{ $messages.fieldLabelCharacters() }}
              </div>
              <div v-if="v$.actUiLink.maxLength" class="error">
                {{ $messages.fieldLabelPleaseInsertAtMax() }} 255 {{ $messages.fieldLabelCharacters() }}
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>{{ $messages.fieldLabelUserRemarks() }}</label>
            <input
              type="text"
              class="form-control"
              :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserRemarks()"
              v-model="actRemarks"
            />
          </div>
          <cave-switch-checkbox
            v-model="actStatus"
            :text="$messages.labelStatus()"
          ></cave-switch-checkbox>
        </div>
        <div class="card-footer">
          <button type="submit" class="btn btn-danger btn-round" @click="cancel()">{{ $messages.labelCancel() }}</button>
          <button type="submit" class="btn btn-info btn-round" @click="save()">
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
} from "./Category";
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import useVuelidate from "@vuelidate/core";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
  name: "",
  components: { CaveAdvancedTextArea, CaveSwitchCheckbox },
  mixins: [RecordMixin, pageBehaviour],
  props: {
    categoryId: { type: Number, required: true, default: null },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
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
      const [
        error,
        result,
      ] = await this.$service.announcementService.getCategoryDetail(
        this.categoryId
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

      let loader = this.$loading.show({
                    // Optional parameters
                    container: null,
                });

      const [
        error,
        result,
      ] = await this.$service.announcementService.updateCategory(record);
      if (error) {
          loader.hide();
          this.showError(error);
      } else {
          loader.hide();
        this.$swal("", this.$messages.labelSuccess(), "success");
        this.$router.push({ name: "CategorySummaryPage" });
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