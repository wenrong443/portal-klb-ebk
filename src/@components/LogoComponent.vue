<template>
	<div class="logo">
		<!-- <a href="#" class="simple-text logo-mini">
			<div class="logo-image-small">
				<img src="../assets/logo.png" />
			</div>
		</a> -->
		<a href="#" class="simple-text">
			<!-- {{ companyName }} -->
            <img :src="companyLogo" style="width: auto; height: 80px; text-align: center;" class="center"/>
		</a>
	</div>
</template>

<script>
export default {
	name: "LogoComponent",
	data: () => ({
		companyName: "",
        companyLogo: ""
	}),
	async created() {
        const [
				error,
				result,
			] = await this.$service.settingService.getGeneralSetting();
			if (error) {
			} else {
				this.records = result.content;

                this.records.map((d) => {
                    switch(d.stName){
                        case "WEBSITE_TITLE":
                            document.title = d.stValue;
                        case "WEBSITE_LOGO":
                            this.companyLogo = d.stValue;
                            console.log(this.companyLogo);
							break;
                    }
                })
			}
	},
};
</script>

<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>