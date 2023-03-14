<template>
	<div class="row">
		<div class="col-md-5 col-centered">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ $messages.fieldLabelUseAnAuthenticatorApp() }}</h4>
				</div>
				<br>
				<div class="card-body">
					<p>{{ $messages.fieldLabelDownloadTheFree() }} <b>{{ $messages.fieldLabelGoogleAuthenticator() }}</b>
						({{ $messages.fieldLabelAvailableFor() }} <a href="http://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8"
							target="_blank"><b>{{ $messages.fieldLabeliOS() }}</b></a> {{ $messages.fieldLabelAnd() }} <a
							href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
							target="_blank"><b>{{ $messages.fieldLabelAndroid() }}</b></a>)
						{{ $messages.fieldLabelAppAddNewAccountAndThenScanThis() }}</p>
					<br>
					<qrcode-vue class="canvas-center" :value="qrCodeContent" size="200"></qrcode-vue>
					<div class="col-md-6 col-centered">
						<button class="btn btn-default btn-fill btn-block">{{ username }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
	name: "",
	components: { QrcodeVue },
	mixins: [],
	props: {
		userId: { type: Number, required: true, default: null },
	},
	data: () => ({
		qrCodeContent: "",
		username: "",
	}),
	async created() {
		this.getDetail();
	},
	computed: {},
	methods: {
		async getDetail() {
			const [error, result] =
				await this.$service.managementService.getUserDetail(
					this.userId
				);

			if (error) {
				this.$swal("Failed to get detail");
			} else {
				this.qrCodeContent = result.content.googleAuthenticatorURL;
				this.username = result.content.utUsername;
				(this.qrCodeContent);
			}
		},
	},
};
</script>

<style>
</style>