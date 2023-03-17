<template>
    <div class="flex flex-col">
        <label for="name"
            class="text-2xl block text-gray-700 font-bold mb-2"
        >{{ labelText }}</label>
        <div v-if="fieldType === 'text'" class="flex justify-center gap-4">
            <input :id="fieldName" :type="fieldType" :placeholder="placeholderText" v-model="value"
                class="h-24 text-4xl bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            >
            <button @click="submit()"
                class="w-28 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >{{ buttonText }}</button>
        </div>
        <!-- <SolitaryFileInput v-if="fieldType === 'file'">

        </SolitaryFileInput> -->
    </div>
</template>

<script setup lang="ts">
// import SolitaryFileInput from '@/components/SolitaryFileInput.vue';
import { ref } from 'vue';
import '@/assets/tailwind.css'

export interface SolitaryFieldProps {
    fieldName: string
    fieldType: string
    labelText: string
    placeholderText?: string
    buttonText?: string 
    startingValue?: string
    validator?: (input: string) => boolean; 
}

const props = withDefaults(defineProps<SolitaryFieldProps>(), {
    fieldName: "",
    fieldType: "text",
    labelText: "",
    placeholderText: "",
    buttonText: "Next",
    startingValue: "",
    validator: (value: string) => { return value !== "" }
})

const emit = defineEmits<{
    (e: 'submitted', value: string): void
}>()


function submit() {
    const val = value.value;
    console.log(val)

    if(props.validator(val)) {
        emit('submitted', val);
    } else {
        //display validation rules
    }
}
console.log(props.fieldType)
let value = ref(props.startingValue);
</script>


<style scoped>
.avatar-button {
    background-color: #1c1c1c;
    color: #fff;
    border: none;
    outline: none;
    width: 220px;
    font-family: "degular", sans-serif;
    font-size: 12px;
    font-weight: 900;
    font-style: normal;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
}
</style>