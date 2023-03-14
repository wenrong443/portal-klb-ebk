    <template>
  <div class="row">
    <div class="col-md-9">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">{{ $messages.labelRankingEditPage() }}</h4>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label for="inputState">{{ $messages.fieldLabelType() }}</label>
            <select class="form-control" v-model="drdtType">
              <option
                v-for="typeOption in typeOptions"
                v-bind:value="typeOption.id"
                v-bind:key="typeOption.id"
              >
                {{ $messages[typeOption.value]() }}
              </option>
            </select>
            <div v-if="v$.drdtType.$error">
              <div v-if="v$.drdtType.required" class="error">{{ $messages.fieldLabelTypeIsRequired() }}</div>
            </div>
          </div>
          <div class="form-group">
            <label for="inputState">{{ $messages.fieldLabelProfileImage() }}</label>
            <div class="row ml-2">
              <div
                class="form-check-radio col-md-2"
                v-for="profileIndex in totalProfileImages"
                v-bind:value="profileIndex"
                v-bind:key="profileIndex"
              >
                <label class="form-check-label">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="drdtProfileImage"
                    v-model="drdtProfileImage"
                    :value="profileIndex - 1"
                  />
                    

                  <span class="form-check-sign"></span>

                  <img
                      style="height: 35px; width: 35px"
                      :src="getImgUrl(profileIndex - 1)"
                    />
                </label>
              </div>
            </div>
            <div v-if="v$.drdtProfileImage.$error">
              <div v-if="v$.drdtProfileImage.required" class="error">
                {{ $messages.fieldLabelProfileImageIsRequired() }}
              </div>
            </div>
          </div>
          <label>{{ $messages.fieldLabelMobileInfo() }}</label>
          <div class="cave-form--group">
            <div class="form-group">
              <label>{{ $messages.fieldLabelCountryCode() }}</label>
              <select v-model="drdtCountryCode" class="form-control">
                <option
                  v-for="country in countrys"
                  v-bind:value="country.id"
                  v-bind:key="country.id"
                >
                  {{ country.value }}
                </option>
              </select>
              <div v-if="v$.drdtCountryCode.$error">
                <div v-if="v$.drdtCountryCode.required" class="error">
                  {{ $messages.fieldLabelCountryCodeIsRequired() }}
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>{{ $messages.fieldLabelUserMobileNumber() }}</label>
              <input
                type="text"
                class="form-control"
                :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelUserMobileNumber()"
                v-model="drdtMobileNumber"
              />
              <div v-if="v$.drdtMobileNumber.$error">
                <div v-if="v$.drdtMobileNumber.required" class="error">
                  {{ $messages.fieldLabelUserMobileNumber() }}{{ $messages.fieldLabelIsRequired() }}
                </div>
                <div v-if="v$.drdtMobileNumber.minLength" class="error">
                  {{ $messages.fieldLabelPleaseInsertAtLeast() }} 5 {{ $messages.fieldLabelCharacters() }}
                </div>
                <div v-if="v$.drdtMobileNumber.maxLength" class="error">
                  {{ $messages.fieldLabelPleaseInsertAtMax() }} 20 {{ $messages.fieldLabelCharacters() }}
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>{{ $messages.labelAmount() }}</label>
            <input
              type="text"
              class="form-control"
              :placeholder="$messages.fieldLabelEnter() + $messages.labelAmount()"
              v-model="drdtAmount"
            />
            <div v-if="v$.drdtAmount.$error">
              <div v-if="v$.drdtAmount.required" class="error">
                {{ $messages.labelAmount() }}{{ $messages.fieldLabelIsRequired() }}
              </div>
              <div v-if="v$.drdtAmount.minValue" class="error">
                {{ $messages.fieldLabelMin() }} 1
              </div>
            </div>
          </div>

          <cave-switch-checkbox
            v-model="drdtStatus"
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
} from "./Ranking";
import CaveAdvancedTextArea from "@components/CaveAdvancedTextArea";
import CaveSwitchCheckbox from "@components/CaveSwitchCheckbox";
import useVuelidate from "@vuelidate/core";
import json from "../../infrastructure/json/config.json";
import pageBehaviour from "seedwork/mixins/pageBehaviour";

export default {
  name: "",
  components: { CaveAdvancedTextArea, CaveSwitchCheckbox },
  mixins: [RecordMixin, pageBehaviour],
  props: {
    recordId: { type: Number, required: true, default: null },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    totalProfileImages: json.totalProfileImages,
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
    getImgUrl(index) {
      index = index % this.totalProfileImages;
      var images = require.context("../../assets/img/profile", false, /\.png$/);
      return images("./" + index + ".png");
    },
    async getDetail() {
      const [
        error,
        result,
      ] = await this.$service.rankingService.getDetail(this.recordId);

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
      const [error, result] = await this.$service.rankingService.update(
        record
      );
      loader.hide();
      if (error) {
          this.showError(error);
      } else {
        this.$swal("", this.$messages.labelSuccess(), "success");
        this.$router.push({ name: "RankingSummaryPage" });
      }
    },
  },
};
</script>

<style>
</style>