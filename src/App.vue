<template>
	<div class>
		<router-view></router-view>
	</div>
</template>

<script>
import SidebarComponent from "@/@components/SidebarComponent";
import LogoComponent from "./@components/LogoComponent.vue";
import NavComponent from "./@components/NavComponent.vue";

export default {
	name: "App",
	components: { LogoComponent, NavComponent, SidebarComponent },
	data: () => ({}),
};
</script>

<style lang="css" src="./assets/css/bootstrap.min.css"></style>
<style lang="css" src="./assets/css/paper-dashboard.min.css"></style>

<style lang="scss">
@import 'sweetalert2/dist/sweetalert2.min.css';

// @import url("assets/styles.scss");
@import "assets/styles.scss";

#app {
	font-family: "Montserrat", sans-serif;
	// -webkit-font-smoothing: antialiased;
	// -moz-osx-font-smoothing: grayscale;
	// text-align: center;
	// color: #2c3e50;
	// margin-top: 60px;
}

.vld-shown {
  overflow: hidden;
}

.vld-overlay {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  display: none;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
}

.vld-overlay.is-active {
  display: flex;
}

.vld-overlay.is-full-page {
  z-index: 9999;
  position: fixed;
}

.vld-overlay .vld-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  opacity: 0.5;
}

.vld-overlay .vld-icon, .vld-parent {
  position: relative;
}
</style>
