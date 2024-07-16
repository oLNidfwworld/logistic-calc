<script setup lang="ts">
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot } from 'radix-vue'
import { useVModel } from '@vueuse/core';
import { ref, shallowReactive, useAttrs } from 'vue';


defineOptions({
    inheritAttrs: false
})

const props = defineProps<{
    modelValue: number | string,
}>();

const emits = defineEmits(['update:modelValue']);

const model = useVModel(props, 'modelValue', emits);

const attrs = shallowReactive(useAttrs());

</script>
<template>
    <NumberFieldRoot v-model="model" class="cu-inpt-number" :min="0">
        <NumberFieldInput v-bind="{
            id: attrs.id,
            placeholder: attrs.placeholder
        }" class="cu-inpt" />
        <div class="cu-inpt-number__controls">
            <NumberFieldIncrement class="cu-inpt-number__up">
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.69868 4.25729L4.30457 1.07531C4.09629 0.880044 3.7586 0.880044 3.55032 1.07531L0.156207 4.25729C-0.0520726 4.45255 -0.0520725 4.76913 0.156207 4.96439C0.364487 5.15966 0.702175 5.15966 0.910455 4.96439L3.92744 2.13597L6.94443 4.96439C7.15271 5.15966 7.4904 5.15966 7.69868 4.96439C7.90696 4.76913 7.90696 4.45255 7.69868 4.25729Z"
                        fill="#738692" />
                </svg>
            </NumberFieldIncrement>
            <NumberFieldDecrement class="cu-inpt-number__down">
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.69868 1.35735L4.30457 4.18577C4.09629 4.35934 3.7586 4.35934 3.55032 4.18577L0.156207 1.35735C-0.0520726 1.18378 -0.0520725 0.902374 0.156207 0.728807C0.364487 0.555241 0.702175 0.555241 0.910455 0.728807L3.92744 3.24296L6.94443 0.728808C7.15271 0.555241 7.4904 0.555241 7.69868 0.728808C7.90696 0.902374 7.90696 1.18378 7.69868 1.35735Z"
                        fill="#738692" />
                </svg>
            </NumberFieldDecrement>
        </div>
    </NumberFieldRoot>
</template>
<style>
.cu-inpt-number {
    position: relative;
}

.cu-inpt-number__controls {
    position: absolute;
    display: flex;
    height: fit-content;
    flex-direction: column;
    gap: 4px;
    right: 14px;
    top: 0;
    bottom: 0;
    margin: auto 0;
}
</style>