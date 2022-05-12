<script setup>

	import { computed, ref, onMounted } from 'vue';
  import { useToast } from "vue-toastification";
  import axios from "axios";
	import { useTokenStore } from '../stores/token'
	import router from '../router'

	const Toast = useToast();

	onMounted(async () => {
		const token = await useTokenStore()
		token.clearToken();

		// redirect to home page
		router.push('/');
	})
</script>

<template>

	<div class="text-center">

		Loggin out...

	</div>

</template>