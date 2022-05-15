<script setup>
	import Menu from './components/Menu.vue';
	import Footer from './components/Footer.vue';
	import { useTokenStore } from './stores/token'
	import { computed } from 'vue';
import { c } from '../dist/assets/index.10d5764e';

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
		console.log("🚀 ~ file: App.vue ~ line 25 ~ menuItems ~ token.token", token.token? "true": "false");
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
      console.log("🚀 ~ file: App.vue ~ line 46 ~ menuItems ~ token.token", token.token)
		if (token.token.isAdmin) {
			temp.mainMenu.push({
				name: 'Admin',
				link: '/admin',
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