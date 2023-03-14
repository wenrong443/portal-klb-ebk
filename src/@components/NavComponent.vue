<template>
	<nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
		<div class="container-fluid">
			<div class="navbar-wrapper">
				<div class="navbar-minimize">
					<button @click="minimizeSidebar" id="minimizeSidebar" class="btn btn-icon btn-round">
						<i class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"></i>
						<i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i>
					</button>
				</div>
                <div>
                    <a href="/account/deposit"><u>{{ $messages.labelPendingDeposit() }}</u></a>: <b>{{ pendingDeposit }}</b> | <a href="/account/withdraw"><u>{{ $messages.labelPendingWithdraw() }}</u></a>: <b>{{ pendingWithdraw }}</b>
                </div>
				<div class="navbar-toggle">
					<button type="button" class="navbar-toggler">
						<span class="navbar-toggler-bar bar1"></span>
						<span class="navbar-toggler-bar bar2"></span>
						<span class="navbar-toggler-bar bar3"></span>
					</button>
				</div>
				<a class="navbar-brand" href="javascript:;"></a>
			</div>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index"
				aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-bar navbar-kebab"></span>
				<span class="navbar-toggler-bar navbar-kebab"></span>
				<span class="navbar-toggler-bar navbar-kebab"></span>
			</button>
			<div class="collapse navbar-collapse justify-content-end" id="navigation">
				<!-- <form>
					<div class="input-group no-border">
						<input type="text" value class="form-control" placeholder="Search..." />
						<div class="input-group-append">
							<div class="input-group-text">
								<i class="nc-icon nc-zoom-split"></i>
							</div>
						</div>
					</div>
				</form> -->
				<ul class="navbar-nav">
					<li class="nav-item">
						<!-- <a class="nav-link btn-magnify" href="javascript:;">
							<i class="nc-icon nc-layout-11"></i>
							<p>
								<span class="d-lg-none d-md-block">Stats</span>
							</p>
						</a> -->
					</li>
					<li class="nav-item btn-rotate dropdown">
						<a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown"
							aria-haspopup="true" aria-expanded="false">
							<i class="nc-icon nc-world-2"></i>
						</a>
						<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
							<a class="dropdown-item" v-for="languageOption in languageOptions" v-bind:key="languageOption.id"
								@click="changeLanguage(languageOption.id)">{{languageOption.value}}</a>
						</div>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link btn-rotate dropdown-toggle" href="javascript:;" id="navbarDropdownSettingMenuLink" data-toggle="dropdown"
							aria-haspopup="true" aria-expanded="false">
							<i class="nc-icon nc-settings-gear-65"></i>
							<p>
								<span class="d-lg-none d-md-block">Account</span>
							</p>
						</a>
						<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownSettingMenuLink">
							<a class="dropdown-item" @click="logout">{{ $messages.labelLogout() }}</a>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: "NavComponent",
    data: () => ({
		pendingWithdraw: 0,
        pendingDeposit: 0
	}),
	computed: {
		languageOptions() {
			return [
				{ id: "en", value: "English" },
				{ id: "zh_cn", value: "中文" },
                { id: "vn", value: "Vietnamese" },
			];
		},
	},
    async created() {
        this.checkPendingRequest();
         setInterval(() => {
                this.checkPendingRequest();
        }, 10000);
    },
	methods: {
        async checkPendingRequest() {
            const [error, result] = await this.$service.accountService.getPendingCount();
			if (error) {
			} else {
				this.pendingDeposit = result.content.totalDeposit;
                this.pendingWithdraw = result.content.totalWithdrawal;

                if (localStorage.getItem("lastDepositUpdated") == null || localStorage.getItem("lastDepositUpdated") == ""){
                    localStorage.setItem("lastDepositUpdated", result.content.lastUpdateOn);

                    if (result.content.lastUpdateOn != ""){
                        const audio = new Audio("https://audio-previews.elements.envatousercontent.com/files/259410951/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22R2ZWYCP-notification.mp3%22");
                        audio.play();
                    }
                }else{
                    if (localStorage.getItem("lastDepositUpdated") != result.content.lastUpdateOn){
                        if (result.content.lastUpdateOn != ""){
                            const audio = new Audio("https://audio-previews.elements.envatousercontent.com/files/259410951/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22R2ZWYCP-notification.mp3%22");
                            audio.play();
                        }
                    }
                    localStorage.setItem("lastDepositUpdated", result.content.lastUpdateOn);
                }
			}
        },
		async logout() {
			const [error, result] = await this.$service.authService.logout();
			if (error) {
			} else {
				let selectedLanguage = localStorage.getItem("lang");
				localStorage.clear();
				this.$swal({
					title: "Logout",
					text: "You are logged out",
					icon: "success",
				});
				localStorage.setItem(
					"lang",
					selectedLanguage == null ? "en" : selectedLanguage
				);

				this.$router.push({ name: "AdminLoginPage" });
			}
		},
		minimizeSidebar() {
            if (!this.hasClass(document.getElementsByTagName("body")[0], "sidebar-mini")){
                this.addClass(document.getElementsByTagName("body")[0], "sidebar-mini");
            }else{
                this.removeClass(document.getElementsByTagName("body")[0], "sidebar-mini")
            }
		},
		changeLanguage(id) {
			localStorage.setItem("lang", id);
			location.reload();
		},
		hasClass(ele, cls) {
			return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
		},
		addClass(ele, cls) {
			if (!this.hasClass(ele, cls)) ele.className += " " + cls;
		},
		removeClass(ele, cls) {
			if (this.hasClass(ele, cls)) {
				var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
				ele.className = ele.className.replace(reg, " ");
			}
		},
	},
};
</script>

<style>
</style>