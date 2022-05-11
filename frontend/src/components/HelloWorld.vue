<script setup>
	import { useCounterStore } from '../stores/token'

			const counter = useCounterStore()

			counter.count++
			// with autocompletion ✨
			counter.$patch({ count: counter.count + 1 })
			// or using an action instead
		counter.increment()
</script>

<template>
	<div>
		Test: {{counter.count}}
		<!-- button -->
		<button @click="counter.increment">Increment</button>
	</div>
</template>