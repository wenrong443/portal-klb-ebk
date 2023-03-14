<template>
	<div class="wrapper">
		<div class="sidebar" data-color="default" data-active-color="danger">
			<logo-component></logo-component>
			<sidebar-component :userInfo="userInfo"></sidebar-component>
		</div>
		<div class="main-panel">
			<nav-component></nav-component>
			<div class="content">
				<slot>
					<router-view></router-view>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
import SidebarComponent from "@components/SidebarComponent";
import LogoComponent from "@components/LogoComponent.vue";
import NavComponent from "@components/NavComponent.vue";
import { onBeforeMount, ref } from "vue";
import { jwtDecrypt } from "seedwork/jwtVerify"

export default {
	name: "CavePage",
	components: { LogoComponent, NavComponent, SidebarComponent },
	setup() {
		const userInfo = ref({});

		const getUserDetail = async () => {
            const decryptedJwt = jwtDecrypt(localStorage.getItem('token'))
            localStorage.loggedInUserFullName = decryptedJwt.fullName;
            localStorage.loggedInUserProfileImage = decryptedJwt.profileImage;
            localStorage.loggedInUserDepartment = decryptedJwt.department;
		};
		onBeforeMount(() => getUserDetail());
		return { userInfo };
	},
	data: () => ({}),
	methods: {},
};
</script>
