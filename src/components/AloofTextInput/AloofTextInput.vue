<template>
    <input :id="fieldName" type="text" :placeholder="placeholder" v-model="value"
        class="h-24 text-4xl bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
    >
</template>

<script setup lang="ts">
import { ref } from'vue';
import '@/assets/tailwind.css';

export interface Props {
    fieldName: string
    placeholder: string
    startingValue: string
}

const props = defineProps<Props>();

let value = ref(props.startingValue);
</script>

<style>

</style>