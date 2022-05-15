<script setup>
	import Menu from './components/Menu.vue';
	import Footer from './components/Footer.vue';
	import { useTokenStore } from './stores/token'
	import { computed } from 'vue';

	const token = useTokenStore()

	const menuItems = computed(() => {
		var temp = {
			mainMenu: [
				{
					name: 'Home',
					link: '/',
				}
			], 
			optionalMenu: []
		}

		// add account buttons
		if (!token.token) {
			temp.optionalMenu = [
				{
					name: 'Sign up',
					link: '/sign-up',
				},
				{
					name: 'Sign in',
					link: '/sign-in',
				},
			]
		}
		else{
			temp.optionalMenu = [
				{
					name: 'Sign out',
					link: '/sign-out',
				},
			]
		}

		// add admin buttons
		if (token.token.isAdmin) {
			temp.mainMenu.push({
				name: 'Admin',
				link: '/offices/1',
			})
		}

		return temp;
	});


	
</script>

<template>
	<div class="container">

		<Menu :menuItems='menuItems'/>
		<router-view class="my-10"></router-view>
		<Footer/>

	</div>
</template>