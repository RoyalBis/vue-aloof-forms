<template>
    <div class="flex flex-col">
        <slot name="label">
            <label for="name"
                class="text-2xl block text-gray-700 font-bold mb-2"
            >{{ labelText }}</label>
        </slot>
        <div v-if="fieldType === 'text'" class="flex justify-center gap-4">
            <slot v-if="fieldType === 'text'" name="textInput">
                <AloofTextInput :fieldName="fieldName" :placeholder="placeholderText" :startingValue="startingValue" :v-model="value">

                </AloofTextInput>
            </slot>
            <slot v-else-if="fieldType === 'file'" name="fileInput">
                <AloofFileInput :startingFiles="startingValue.split(',')" :files="value">

                </AloofFileInput>
            </slot>
            <slot v-else-if="fieldType === 'options'" name="selectInput">

            </slot>
            <slot name="submitButton">
                <button @click="submit()"
                    class="w-28 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >{{ buttonText }}</button>
            </slot>
        </div>
        <!-- <SolitaryFileInput v-if="fieldType === 'file'">

        </SolitaryFileInput> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import  type { PropType } from 'vue';

import { AloofTextInput, AloofFileInput } from '@/components'
import type { Validator } from '@/types';
import '@/assets/tailwind.css';

import { DefaultValidators } from '@/types';

export interface Props {
    fieldName: string
    fieldType: string
    labelText: string
    placeholderText?: string
    buttonText?: string 
    startingValue?: string
    validation: Validator[]
}

const props = withDefaults(defineProps<Props>(), {
    fieldName: "",
    fieldType: "text",
    labelText: "",
    placeholderText: "",
    buttonText: "Next",
    startingValue: "",
    validation: () => [ DefaultValidators.NONE() ]
});

// Emits
const emit = defineEmits<{
    (e: 'submitted', value: string): void
}>()

// Methods
function submit() {
    const val = value.value;
    console.log(val)

    let valid = props.validation.reduce(
        (valid,f) => { 
            return f.rule(val) && valid
        }, true 
    );

    valid ? emit('submitted', val) : console.log("Invalid") //display Validation Rules;
}

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