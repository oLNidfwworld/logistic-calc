<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxRoot, ComboboxSeparator, ComboboxTrigger, ComboboxViewport } from 'radix-vue';
import { ref, watch, shallowReactive, useAttrs } from 'vue';

defineOptions({
    inheritAttrs: false
})

const props = defineProps<{
    items: Array<{
        NAME: string
    }>,
    modelValue: String,
    displayTrigger?: Boolean
}>();

const emits = defineEmits(['update:modelValue']);

const model = useVModel(props, 'modelValue', emits);
const attrs = shallowReactive(useAttrs());

const slots = defineSlots<{
    before?: () => any
}>();

const isOpen = ref(false);

</script>
<template>
    <ComboboxRoot v-model="model" v-model:open="isOpen" class="cu-combo">
        <ComboboxAnchor class="cu-combo__anchor">
            <div class="cu-combo__before" v-if="slots.before">
                <slot name="before" />
            </div>
            <ComboboxInput @focus="isOpen = true" v-bind="{
                id: attrs.id,
                placeholder: attrs.placeholder
            }" class="cu-inpt" />
        </ComboboxAnchor>
        <ComboboxContent class="cu-combo__content">
            <ComboboxViewport class="cu-combo__viewport">
                <ComboboxEmpty class="cu-combo__item">
                    Нет вариантов
                </ComboboxEmpty>
                <ComboboxGroup class="cu-combo__group">
                    <ComboboxItem v-for="(item, index) in items" :key="index" class="cu-combo__item" :value="item.NAME">
                        <span>
                            {{ item.NAME }}
                        </span>
                        <ComboboxItemIndicator class="cu-combo__indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" x="0" y="0"
                                viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"
                                class="">
                                <g>
                                    <path
                                        d="M511.877 117.167a42.739 42.739 0 0 1-12.6 30.419L228.011 418.854a65.095 65.095 0 0 1-91.924 0L12.72 295.486a43.021 43.021 0 1 1 60.841-60.84l108.488 108.489L438.44 86.745a43.017 43.017 0 0 1 73.437 30.422z"
                                        fill="var(--black)" opacity="1" data-original="var(--black)" class=""></path>
                                </g>
                            </svg>
                        </ComboboxItemIndicator>
                    </ComboboxItem>
                </ComboboxGroup>
            </ComboboxViewport>
        </ComboboxContent>
    </ComboboxRoot>
</template>
<style>
.cu-combo__viewport {
    MAX-HEIGHT: 300px;
    overflow-y: scroll;
}

.cu-combo {
    position: relative;
    width: 100%;
}

.cu-combo__anchor {
    position: relative;
}

.cu-combo__trigger {
    position: absolute;
    right: 17px;
    top: 0;
    bottom: 0;
    margin: auto 0;
}

.cu-combo__content {
    overflow: hidden;
    font-size: 16px;
    font-weight: 600;
    border-radius: 4px;
    box-shadow: 1px 3px 8px #3333333b;
    position: absolute;
    width: 100%;
    background-color: var(--white);
    top: calc(100% + 15px);
    z-index: 1;
}

.cu-combo__group {
    display: flex;
    flex-direction: column;
}

.cu-combo__item {
    cursor: pointer;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    transition: all 0.3s;
}

.cu-combo__item>* {
    transition: fill 0.3s;
}

.cu-combo__item:hover {
    background-color: var(--light-blue);
    color: var(--white);
}

.cu-combo__item:hover * {
    fill: var(--white);
}

.cu-combo__before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 15px;
    margin: auto 0;
    height: fit-content;
}

.cu-combo__before+.cu-inpt {
    padding-left: 45px !important;
}
</style>