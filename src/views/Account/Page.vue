<template>
  <cave-page>
    <router-view></router-view>
  </cave-page>
</template>

<script>
import CavePage from "@components/CavePage";

export default {
	name: "Page",
	components: { CavePage },
};
</script>

<style>
</style>