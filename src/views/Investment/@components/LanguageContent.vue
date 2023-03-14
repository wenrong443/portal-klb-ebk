<template>
	<div class="language-content">
		<label>{{ language }}</label>
		<cave-detail-component :label="$messages.fieldLabelTitle()" :value="giptDisplayTitle" />
		<cave-detail-component :label="$messages.fieldLabelShortDescription()" :value="giptDisplayDescriptionShort" />
		<cave-detail-component :label="$messages.fieldLabelLongDescription()" :value="giptDisplayDescriptionLong" />
		<cave-detail-component :label="$messages.fieldLabelDividendPerShare()" :value="giptDisplayDividendPerShare" />
	</div>
</template>

<script>
import CaveDetailComponent from "@components/CaveDetailComponent";

export default {
	name: "LanguageContent",
	components: { CaveDetailComponent },
	props: {
		content: { type: Array },
	},
	data: () => ({}),

	computed: {
		language() {
			return this.content ? this.content[0].ltName : "sss";
		},
		giptDisplayDescriptionLong() {
			const giptDisplayDescriptionLong = this.content
				? this.content.find(
						(d) => d.type == "giptDisplayDescriptionLong"
				  )
				: "-";

			return giptDisplayDescriptionLong.value;
		},
		giptDisplayDescriptionShort() {
			const giptDisplayDescriptionShort = this.content
				? this.content.find(
						(d) => d.type == "giptDisplayDescriptionShort"
				  )
				: "-";
			return giptDisplayDescriptionShort.value;
		},
		giptDisplayDividendPerShare() {
			const giptDisplayDividendPerShare = this.content
				? this.content.find(
						(d) => d.type == "giptDisplayDividendPerShare"
				  )
				: "-";
			return giptDisplayDividendPerShare.value;
		},
		giptDisplayTitle() {
			const giptDisplayTitle = this.content
				? this.content.find((d) => d.type == "giptDisplayTitle")
				: "-";
			return giptDisplayTitle.value;
		},
	},
};
</script>

<style lang="scss" scoped>
.language-content {
	display: grid;
	gap: 4px;
	padding: 4px;
	margin: 12px 0px;
	border-radius: 4px;
	box-shadow: 0 6px 10px -4px rgb(0 0 0 / 15%);

	label {
		font-weight: 700;
		font-size: 14px;
		color: black;
		padding: 8px;
	}
}
</style>
