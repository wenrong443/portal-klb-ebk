<template>
	<div class="container">
		<div class="col-lg-4 col-md-6 ml-auto mr-auto">
			<div class="card card-login">
				<div class="card-header">
					<div class="card-header">
						<h3 class="header text-center">{{ $messages.labelLogin() }}</h3>
					</div>
				</div>
				<div class="card-body">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">
								<i class="nc-icon nc-single-02"></i>
							</span>
						</div>
						<input type="text" class="form-control" :placeholder="$messages.fieldLabelEnter() + $messages.labelUsername()"
							v-model="username" />
					</div>
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">
								<i class="nc-icon nc-key-25"></i>
							</span>
						</div>
						<input type="password" :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelPassword()" class="form-control"
							v-model="password" />
					</div>
					<!-- <div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">
								<i class="fa fa-refresh"></i>
							</span>
						</div>
						<input type="text" placeholder="Recaptcha Token" class="form-control" v-model="recaptchaToken" />
					</div> -->
					<br />
				</div>
				<div class="card-footer">
					<button class="btn btn-warning btn-round btn-block mb-3" @click="login">
						{{ $messages.labelLogin() }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { createInstance, mixin as RecordMixin } from "./Auth";
import useVuelidate from "@vuelidate/core";
import json from "../../infrastructure/json/config.json";

export default {
	name: "AdminPage",
	mixins: [RecordMixin],
	components: {},
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		...createInstance(),
	}),
	async created() {
		document.title = json.companyName;
	},
	methods: {
		async login() {
			
			this.v$.$touch();
			if (this.v$.$invalid) return;

            await this.$recaptchaLoaded();
			this.recaptchaToken = await this.$recaptcha("login");

			const record = {
				...createInstance(this),
			};

			const [error, result] = await this.$service.authService.login(
				record
			);

			if (error) {
				localStorage.clear();
				this.$swal({
					title: "Your login credential is wrong",
					text: "Please enter correct username and password",
					icon: "error",
				});
			} else {
				localStorage.setItem("token", result.token);
				this.$swal({
					title: " Welcome back",
					icon: "success",
				});
				await this.timeout(500);
				location.reload();
				this.$router.push({ name: "NormalUserSummaryPage" });
			}

            return;
		},
		timeout(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		},
	},
};
</script>
<style>
</style>