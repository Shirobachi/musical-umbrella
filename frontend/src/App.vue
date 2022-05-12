<script setup>
	import Menu from './components/Menu.vue';
	import Footer from './components/Footer.vue';

	const menuItems = {
		mainMenu: [
			{
				name: 'Home',
				link: '/',
			},
			{
				name: 'Something',
				link: 'sadas',
			},
		], 
		optionalManu: [
			{
				name: 'Sign in',
				link: '/sign-in',
			},
			{
				name: 'Sign up',
				link: '/sign-up',
			},
		]
	}
</script>

<template>
	<div class="container">

		<Menu :menuItems='menuItems'/>
		<router-view class="my-10"></router-view>
		<Footer/>

	</div>
</template>