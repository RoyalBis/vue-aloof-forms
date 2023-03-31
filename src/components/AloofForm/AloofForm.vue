<template>
        <AloofField v-if="!submissionPrompt" v-for="field in currentField" :field-type="field.fieldType" :label-text="field.labelText" :placeholder-text="field.placeholderText" :button-text="field.buttonText" :starting-vsalue="field.value" :key="field.fieldName" @submitted="handleSubmitted($event, currentFieldIndex)" />
        <div v-if="submissionPrompt" 
            class="flex flex-col justify-center items-center gap-8 p-12 rounded overflow-hidden shadow-lg"
        >
            <h1 class="text-2xl block text-gray-700 font-bold mb-2">Create Memorial?</h1>
            <div class="flex justify-center items-center gap-8">
                <button 
                    class="w-48 h-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >Go Back</button>
                <button @click="$event => submit()"
                    class="w-48 h-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >Create</button>
            </div>
        </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AloofField } from  '@/components';

export interface Props {
    name: string
    fields: Array<AloofFieldData>
}

export interface AloofFieldData {
    fieldName: string
    fieldType: string
    labelText?: string
    placeholderText?: string
    buttonText?: string 
    value: string
    validator?: (input: string) => boolean; 
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'submitted', data: Array<AloofFieldData>): void
}>();

function handleSubmitted(value: string, fieldIndex: number) {
    if(fieldIndex === props.fields.length -1) {
        submissionPrompt.value = true;
    } else {
        currentFieldIndex.value = fieldIndex + 1;
        props.fields[fieldIndex].value = value;
    }
}

function submit() {
    emit('submitted', props.fields);
}

let currentFieldIndex = ref(0);
let currentField = computed(() => props.fields.slice(currentFieldIndex.value,currentFieldIndex.value + 1))
let submissionPrompt = ref(false);
</script>

<style lang="scss" scoped>

</style>