<template>
	<div class="sidebar-wrapper sidebar-wrapper--custom">
		<div class="user">
			<div class="photo">
				<img :src="profileImageUrl" alt="Profile image" />
			</div>
			<div class="info">
				<a data-toggle="collapse" href="#collapseExample" class="collapsed">
					<span>
						{{ loggedInUserFullName }}
						<br />
						<small>({{ loggedInUserDepartment }})</small>
						<b class="caret"></b>
					</span>
				</a>
				<div class="clearfix"></div>
				<div class="collapse" id="collapseExample">
					<ul class="nav">
						<li>
							<a href="#">
								<span class="sidebar-mini-icon"><i class="nc-icon nc-circle-10"></i></span>
								<span class="sidebar-normal"
									@click="goToProfilePage()">{{ $messages.labelMyProfile() }}</span>
							</a>
						</li>
						<li>
							<a href="#">
								<span class="sidebar-mini-icon"><i class="nc-icon nc-key-25"></i></span>
								<span class="sidebar-normal"
									@click="goToChangePasswordPage()">{{ $messages.labelChangePassword() }}</span>
							</a>
						</li>
						<li>
							<a href="#">
								<span class="sidebar-mini-icon"><i class="nc-icon nc-user-run"></i></span>
								<span class="sidebar-normal" @click="logout">{{ $messages.labelLogout() }}</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<ul class="nav">
			<li v-for="sidebar in sidebars" v-bind:key="sidebar.link"
				:class="{'active': sidebar.id == activatedMainMenu}">
				<a @click="toggleChildren(sidebar)" data-toggle="collapse" :class="{'collapsed' : !sidebar.isOpen}"
					:aria-expanded="sidebar.isOpen" v-if="isShowSidebarMenu(sidebar.permissions)">
					<i :class="sidebar.icon" />
					<p>
						{{ $messages[sidebar.name]() }}
						<b class="caret" v-if="sidebar.submenus.length > 0"></b>
					</p>
				</a>
				<div class="collapse" v-show="sidebar.isOpen" :class="{'show': sidebar.isOpen}">
					<ul class="nav">
						<li v-for="submenu in sidebar.submenus" v-bind:key="submenu.id"
							:class="{'active': submenu.link == activatedSubMenu}">
							<router-link :to="submenu.link" v-if="isShowSidebarMenu(submenu.permissions)">
								<i :class="submenu.icon" class="active submenu" />
								<span class="sidebar-normal">{{ $messages[submenu.name]() }}</span>
							</router-link>
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import json from "../infrastructure/json/config.json";

export default {
	name: "SidebarComponent",
	props: {
		userInfo: { type: Object },
	},
	data: () => ({
		sidebars: [],
	}),
	computed: {
		activatedMainMenu() {
			const path = this.$route.path;
			const formattedPath = path.split("/");
			this.sidebars.map((d) => {
				if (d.id == formattedPath[1]) {
					d.isOpen = true;
				}
			});

			return formattedPath[1];
		},
		activatedSubMenu() {
			return this.$route.path;
		},
		profileImageUrl() {
			const images = require.context("../assets/img/profile", false, /\.png$/);
			return images("./" + this.loggedInUserProfileImage + ".png");
		},
		loggedInUserFullName() {
			return localStorage.loggedInUserFullName || this.userInfo.fullNam;
		},
		loggedInUserDepartment() {
			return localStorage.loggedInUserDepartment || this.userInfo.department;
		},
		loggedInUserProfileImage() {
			const profileImage = localStorage.loggedInUserProfileImage || 0;
			return profileImage % json.totalProfileImages;
		},
	},
	async created() {
		await this.getSidebarLists();
	},
	methods: {
		async getSidebarLists() {
			const [, result] = await this.$service.lookupService.getSidebarLlist();
			this.sidebars = result;
		},
		toggleChildren(item) {
			item.isOpen = !item.isOpen;
		},
		goToProfilePage() {
			this.$router.push({ name: "ProfileViewPage" });
		},
		goToChangePasswordPage() {
			this.$router.push({ name: "ChangePasswordViewPage" });
		},
		async logout() {
			const [error, result] = await this.$service.authService.logout();
			if (error) {
			} else {
				localStorage.clear();
				this.$swal({
					title: "Logout",
					text: "You are logged out",
					icon: "success",
				});

				this.$router.push({ name: "AdminLoginPage" });
			}
		},
		isShowSidebarMenu(permissions) {
			if (!permissions) return false;
			const matchedPermissions =
				this.$permissions.length > 0
					? this.$permissions.filter((permission) =>
							permissions.includes(permission)
					  )
					: false;
			if (matchedPermissions.length > 0) return true;
			return false;
		},
	},
};
</script>

<style>
.show {
	display: block !important;
}
.sidebar-wrapper--custom {
	overflow-y: auto !important;
	overflow-x: hidden !important;
}
.submenu {
	margin-left: 4px;
	font-size: 18px;
}
::-webkit-scrollbar {
	width: 10px;
}
</style>
