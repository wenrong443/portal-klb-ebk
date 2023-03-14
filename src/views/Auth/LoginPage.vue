<template>
	<div class="login-page">
		<nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
			<div class="container">
				<div class="navbar-wrapper">
					<div class="navbar-toggle">
						<button type="button" class="navbar-toggler">
							<span class="navbar-toggler-bar bar1"></span>
							<span class="navbar-toggler-bar bar2"></span>
							<span class="navbar-toggler-bar bar3"></span>
						</button>
					</div>
					<a class="navbar-brand" href="javascript:;">
						<!-- <img src="../../assets/img/company_logo.png" style="width: 200px; height auto; text-align: center" /> -->

					</a>
				</div>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index"
					aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-bar navbar-kebab"></span>
					<span class="navbar-toggler-bar navbar-kebab"></span>
					<span class="navbar-toggler-bar navbar-kebab"></span>
				</button>
				<div class="collapse navbar-collapse justify-content-end" id="navigation">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a href="#" class="nav-link">
								<i class="nc-icon nc-atom"></i>
								{{ version }}
							</a>
						</li>
						<li class="nav-item btn-rotate dropdown">
							<a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown"
								aria-haspopup="true" aria-expanded="false">
								<i class="nc-icon nc-world-2"></i> {{ $messages.fieldLabelLanguage() }}&nbsp;&nbsp;
							</a>
							<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
								<a class="dropdown-item" v-for="languageOption in languageOptions" v-bind:key="languageOption.id"
									@click="changeLanguage(languageOption.id)">{{languageOption.value}}</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<div class="wrapper wrapper-full-page">
			<div class="full-page section-image" filter-color="black">
				<div class="content">
					<router-view></router-view>
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
	name: "LoginPage",
	mixins: [RecordMixin],
	computed: {
		languageOptions() {
			return [
				{ id: "en", value: "English" },
				{ id: "zh_cn", value: "中文" },
                { id: "vn", value: "Vietnamese" },
			];
		},
	},
	setup() {
		return { v$: useVuelidate() };
	},
	data: () => ({
		companyName: json.companyName,
		version: json.version,
		...createInstance(),
	}),
	methods: {
		changeLanguage(id) {
			localStorage.setItem("lang", id);
			location.reload();
		},
	},
};
</script>

<style>
.wrapper-full-page {
	background: url("../../assets/img/bg/gukhwa-jangs.jpg");
	height: 100%;

	/* Center and scale the image nicely */
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
