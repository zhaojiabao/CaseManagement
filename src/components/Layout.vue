<template>
	<div>
		<main-header></main-header>
			<router-view/>

	</div>
</template>

<script>
	import mainHeader from '../common/main-header'
	export default {
		data() {
			return {

			}
		},
		mounted() {

		},
		components: {
			mainHeader
		}
	}
</script>

<style>

</style>