<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <div class="card card-login">
        <div class="card-header">
          <div class="card-header">
            <h3 class="header text-center">Login</h3>
          </div>
        </div>
        <div class="card-body">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="nc-icon nc-single-02"></i>
              </span>
            </div>
            <select class="form-select form-control" v-model="countryCode">
              <option
                v-for="country in countryOptions"
                v-bind:key="country.id"
                :value="country.id"
              >
                {{ country.value }}
              </option>
            </select>

            <div class="input-group-prepend">
              <input
                type="text"
                class="form-control"
                placeholder="Phone number..."
                v-model="phoneNumber"
              />
            </div>
          </div>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="nc-icon nc-key-25"></i>
              </span>
            </div>
            <input
              type="password"
              placeholder="Password"
              class="form-control"
              v-model="password"
            />
          </div>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="nc-icon nc-key-25"></i>
              </span>
            </div>
            <input
              type="text"
              placeholder="RecaptchaTokenn"
              class="form-control"
              v-model="recaptchaToken"
            />
          </div>
          <br />
        </div>
        <div class="card-footer">
          <button
            class="btn btn-warning btn-round btn-block mb-3"
            @click="login"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createInstance,
  createUserValidator,
  mixin as RecordMixin,
} from "./Auth";
import useVuelidate from "@vuelidate/core";

export default {
  name: "UserPage",
  mixins: [RecordMixin],
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    countryOptions: [],
    ...createInstance(),
  }),
  validations: { ...createUserValidator },
  created() {
    this.getCountryList();
  },
  methods: {
    getCountryList() {
      const [, result] = this.$service.lookupService.getCountryList();
      this.countryOptions = result;
    },
    async login() {
      this.v$.$touch();
      if (this.v$.$invalid) return;

      const record = {
        ...createInstance(this),
      };

      const [error, result] = await this.$service.authService.userLogin(record);
      if (error) {
        localStorage.clear();
        this.$swal({
          title: "Your login credential is wrong",
          text: "Please enter correct username and password",
          icon: "error",
        });
      } else {
        this.$swal({
          title: " Welcome back",
          icon: "success",
        });
        localStorage.token = result.token;
        this.$router.push({ name: "AnnouncementSummaryPage" });
      }
    },
  },
};
</script>

<style>
</style>