<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title"></h4>
					<button class="btn btn-primary" @click="goToAddPage()">{{ $messages.labelButtonAdd() }}</button>
				</div>
				<div class="card-body">
					<language-listing />
				</div>
			</div>
		</div>
	</div>

</template>

<script>
import LanguageListing from "./@components/LanguageListing";

export default {
	name: "",
	components: { LanguageListing },
	computed: {},
	methods: {
		goToAddPage() {
			this.$router.push({ name: "LanguageAddPage" });
		},
		search(filter) {},
	},
};
</script>
