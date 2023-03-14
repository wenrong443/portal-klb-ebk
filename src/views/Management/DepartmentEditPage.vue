<template>
  <div class="row">
    <div class="col-md-9">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">{{ $messages.labelDepartmentEditPage() }}</h4>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label>{{ $messages.fieldLabelTitle() }}</label>
            <input
              type="text"
              class="form-control"
              :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelTitle()"
              v-model="dtName"
            />
            <div v-if="v$.dtName.$error">
              <div v-if="v$.dtName.required" class="error">
                {{ $messages.fieldLabelTitle() }}{{ $messages.fieldLabelIsRequired() }}
              </div>
              <div v-if="v$.dtName.minLength" class="error">
                {{ $messages.fieldLabelPleaseInsertAtLeast() }} 3 {{ $messages.fieldLabelCharacters() }}
              </div>
              <div v-if="v$.dtName.maxLength" class="error">
                {{ $messages.fieldLabelPleaseInsertAtMax() }} 20 {{ $messages.fieldLabelCharacters() }}
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>{{ $messages.fieldLabelUserRemarks() }}</label>
            <input
              type="text"
              class="form-control"
              :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserRemarks()"
              v-model="dtRemarks"
            />
            <div v-if="v$.dtRemarks.$error">
              <div v-if="v$.dtRemarks.maxLength" class="error">
                {{ $messages.fieldLabelPleaseInsertAtMax() }} 120 {{ $messages.fieldLabelCharacters() }}
              </div>
            </div>
          </div>
          <cave-switch-checkbox
            v-model="dtStatus"
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
} from "./Department";
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import useVuelidate from "@vuelidate/core";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
  name: "",
  components: { CaveAdvancedTextArea, CaveSwitchCheckbox },
  mixins: [RecordMixin, pageBehaviour],
  props: {
    departmentId: { type: Number, required: true, default: null },
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
    await this.getDetail();
  },
  methods: {
    cancel() {
			history.back();
		},
    async getDetail() {
      const [
        error,
        result,
      ] = await this.$service.managementService.getDepartmentDetail(this.departmentId);

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

      const [error, result] = await this.$service.managementService.updateDepartment(
        record
      );
      if (error) {
          loader.hide();
          this.showError(error);
      } else {
          loader.hide();
        this.$swal("", this.$messages.labelSuccess(), "success");
        this.$router.push({ name: "DepartmentSummaryPage" });
      }
    },
  },
};
</script>

<style>
</style>