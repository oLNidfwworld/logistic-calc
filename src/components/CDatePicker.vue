<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import {
    DatePickerArrow,
    DatePickerCalendar,
    DatePickerCell,
    DatePickerCellTrigger,
    DatePickerContent,
    DatePickerField,
    DatePickerGrid,
    DatePickerGridBody,
    DatePickerGridHead,
    DatePickerGridRow,
    DatePickerHeadCell,
    DatePickerHeader,
    DatePickerHeading,
    DatePickerInput,
    DatePickerNext,
    DatePickerPrev,
    DatePickerRoot,
    DatePickerTrigger,
} from 'radix-vue';
import type { DateValue } from '@internationalized/date';
import { ref } from 'vue';
import { CalendarDate } from '@internationalized/date';
import { shallowReactive, useAttrs } from 'vue'
const placeholder = ref({
    day: 'дд',
    month: 'мм',
    year: 'гггг'
});

const formattedSegments = (segments) => {

    const mappedSegments = segments.map(segment => {
        if (segment.part === 'day') {
            return { ...segment, value: (segment.value === 'dd') ? placeholder.value.day : segment.value };
        }
        if (segment.part === 'month') {
            return {
                ...segment, value: (segment.value === 'mm') ? placeholder.value.month : segment.value
            };
        }
        if (segment.part === 'year') {
            return { ...segment, value: (segment.value === 'yyyy') ? placeholder.value.year : segment.value };
        }
        return segment;
    });
    const sortedSegments = [
        mappedSegments[2],
        mappedSegments[1],
        mappedSegments[0],
        mappedSegments[3],
        mappedSegments[4]
    ]
    return sortedSegments;

};

const props = defineProps<{
    modelValue: any
}>();

const emits = defineEmits(['update:modelValue']);

const model = useVModel(props, 'modelValue', emits);

const dateNow = new CalendarDate((new Date()).getFullYear(), (new Date()).getMonth() + 1, (new Date()).getDate()) as DateValue;

const attrs = shallowReactive(useAttrs());

</script>
<template>
    <div class="cu-date-field">
        <DatePickerRoot :min-value="dateNow" v-model="model" id="date-field" granularity="day">
            <DatePickerField v-slot="{ segments }" class="cu-date-field__inpt">
                <div class="cu-date-field__data">
                    <template v-for="item in formattedSegments(segments)" :key="item.part">
                        <DatePickerInput v-if="item.part === 'literal'" :part="item.part"
                            class="cu-date-field__literal">
                            .
                        </DatePickerInput>
                        <DatePickerInput v-else :part="item.part" class="cu-date-field__segment">
                            {{ item.value }}
                        </DatePickerInput>
                    </template>
                </div>

                <DatePickerTrigger class="cu-date-field__popover-trigger">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_303_269)">
                            <path
                                d="M15.8333 1.66667H15V0.833333C15 0.61232 14.9122 0.400358 14.7559 0.244078C14.5996 0.0877974 14.3877 0 14.1667 0C13.9457 0 13.7337 0.0877974 13.5774 0.244078C13.4211 0.400358 13.3333 0.61232 13.3333 0.833333V1.66667H6.66667V0.833333C6.66667 0.61232 6.57887 0.400358 6.42259 0.244078C6.26631 0.0877974 6.05435 0 5.83333 0C5.61232 0 5.40036 0.0877974 5.24408 0.244078C5.0878 0.400358 5 0.61232 5 0.833333V1.66667H4.16667C3.062 1.66799 2.00296 2.1074 1.22185 2.88852C0.440735 3.66963 0.00132321 4.72867 0 5.83333L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V5.83333C19.9987 4.72867 19.5593 3.66963 18.7782 2.88852C17.997 2.1074 16.938 1.66799 15.8333 1.66667ZM1.66667 5.83333C1.66667 5.17029 1.93006 4.53441 2.3989 4.06557C2.86774 3.59673 3.50363 3.33333 4.16667 3.33333H15.8333C16.4964 3.33333 17.1323 3.59673 17.6011 4.06557C18.0699 4.53441 18.3333 5.17029 18.3333 5.83333V6.66667H1.66667V5.83333ZM15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V8.33333H18.3333V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333Z"
                                fill="#738692" />
                            <path
                                d="M10 13.75C10.6904 13.75 11.25 13.1904 11.25 12.5C11.25 11.8096 10.6904 11.25 10 11.25C9.30964 11.25 8.75 11.8096 8.75 12.5C8.75 13.1904 9.30964 13.75 10 13.75Z"
                                fill="#738692" />
                            <path
                                d="M5.83334 13.75C6.5237 13.75 7.08334 13.1904 7.08334 12.5C7.08334 11.8096 6.5237 11.25 5.83334 11.25C5.14299 11.25 4.58334 11.8096 4.58334 12.5C4.58334 13.1904 5.14299 13.75 5.83334 13.75Z"
                                fill="#738692" />
                            <path
                                d="M14.1667 13.75C14.857 13.75 15.4167 13.1904 15.4167 12.5C15.4167 11.8096 14.857 11.25 14.1667 11.25C13.4763 11.25 12.9167 11.8096 12.9167 12.5C12.9167 13.1904 13.4763 13.75 14.1667 13.75Z"
                                fill="#738692" />
                        </g>
                        <defs>
                            <clipPath id="clip0_303_269">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </DatePickerTrigger>
            </DatePickerField>

            <DatePickerContent align="end" :side-offset="16" class="cu-date-field__popover-content">
                <DatePickerArrow class="cu-date-field__popover-arrow" />
                <DatePickerCalendar locale="ru" weekStartsOn="0" v-slot="{ weekDays, grid }" class="Calendar">
                    <DatePickerHeader class="cu-date-field__calendar-header">
                        <DatePickerPrev class="cu-date-field__calendar-nav">
                            <svg style="transform:rotate(270deg)" width="16" height="12" viewBox="0 0 8 6" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M7.69868 4.25729L4.30457 1.07531C4.09629 0.880044 3.7586 0.880044 3.55032 1.07531L0.156207 4.25729C-0.0520726 4.45255 -0.0520725 4.76913 0.156207 4.96439C0.364487 5.15966 0.702175 5.15966 0.910455 4.96439L3.92744 2.13597L6.94443 4.96439C7.15271 5.15966 7.4904 5.15966 7.69868 4.96439C7.90696 4.76913 7.90696 4.45255 7.69868 4.25729Z"
                                    fill="var(--light-blue)"></path>
                            </svg>
                        </DatePickerPrev>

                        <DatePickerHeading class="cu-date-field__calendar-heading" />
                        <DatePickerNext class="cu-date-field__calendar-nav">
                            <svg style="transform:rotate(90deg)" width="16" height="12" viewBox="0 0 8 6" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M7.69868 4.25729L4.30457 1.07531C4.09629 0.880044 3.7586 0.880044 3.55032 1.07531L0.156207 4.25729C-0.0520726 4.45255 -0.0520725 4.76913 0.156207 4.96439C0.364487 5.15966 0.702175 5.15966 0.910455 4.96439L3.92744 2.13597L6.94443 4.96439C7.15271 5.15966 7.4904 5.15966 7.69868 4.96439C7.90696 4.76913 7.90696 4.45255 7.69868 4.25729Z"
                                    fill="var(--light-blue)"></path>
                            </svg>
                        </DatePickerNext>
                    </DatePickerHeader>
                    <div class="cu-date-field__calendar-wrapper">
                        <DatePickerGrid v-for="month in grid" :key="month.value.toString()"
                            class="cu-date-field__calendar-grid">
                            <DatePickerGridHead>
                                <DatePickerGridRow class="cu-date-field__calendar-grid-row">
                                    <DatePickerHeadCell v-for="day in weekDays" :key="day"
                                        class="cu-date-field__calendar-header-cell">
                                        {{ day }}
                                    </DatePickerHeadCell>
                                </DatePickerGridRow>
                            </DatePickerGridHead>
                            <DatePickerGridBody>
                                <DatePickerGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`"
                                    class="cu-date-field__calendar-grid-row">
                                    <DatePickerCell v-for="weekDate in weekDates" :key="weekDate.toString()"
                                        :date="weekDate" class="cu-date-field__calendar-cell">
                                        <DatePickerCellTrigger :day="weekDate" :month="month.value"
                                            class="cu-date-field__calendar-trigger" />
                                    </DatePickerCell>
                                </DatePickerGridRow>
                            </DatePickerGridBody>
                        </DatePickerGrid>
                    </div>
                </DatePickerCalendar>
            </DatePickerContent>
        </DatePickerRoot>
    </div>
</template>
<style>
.cu-date-field__inpt {
    display: flex;
    background-color: var(--white);
    padding: 12px 15px;
    justify-content: space-between;
    border-radius: 4px;
    font-weight: 700;
}

.cu-date-field__data {
    display: flex;
}

.cu-date-field__calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cu-date-field__calendar-header-cell {
    font-size: 15px;

}

.cu-date-field__calendar-nav {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    color: #000000;
    background-color: transparent;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.cu-date-field__calendar-nav:hover {
    background-color: var(--light-blue);
}

.cu-date-field__calendar-nav * {
    transition: fill 0.3s;
}

.cu-date-field__calendar-nav:hover * {
    fill: var(--white);
}

.cu-date-field__calendar-heading {
    font-weight: 500;
    color: var(--light-blue);
    font-size: 18px;
}

.cu-date-field__calendar-wrapper {
    display: flex;
    padding-top: 1rem;
    flex-direction: column;
}

@media (min-width: 640px) {
    .CalendarWrapper {
        flex-direction: row;
    }
}

.cu-date-field__calendar-grid {
    margin-top: 0.25rem;
    width: 100%;
    user-select: none;
    border-collapse: collapse;
}

.cu-date-field__calendar-grid-row {
    display: grid;
    margin-bottom: 0.25rem;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    width: 100%;
}

.cu-date-field__calendar-grid-row[data-radix-vue-calendar-month-view] {
    grid-template-columns: repeat(7, minmax(0, 1fr));
}

.CalendarHeadCell {
    border-radius: 0.375rem;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #000000;
    font-weight: 400;
}

.cu-date-field__calendar-cell {
    position: relative;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
}

.cu-date-field__calendar-trigger {
    display: flex;
    position: relative;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-color: transparent;
    outline-style: none;
    font-size: 15px;
    line-height: 1;
    font-weight: 400;
    color: #000000;
    white-space: nowrap;
    background-color: transparent;
    transition: all 0.3s;
}

.cu-date-field__calendar-trigger:hover {
    border-color: var(--blue);
}

.cu-date-field__calendar-trigger:focus {
    box-shadow: 0 0 0 2px var(--light-blue);
}

.cu-date-field__calendar-trigger[data-disabled] {

    color: rgba(0, 0, 0, 0.3);
}

.cu-date-field__calendar-trigger[data-selected] {
    background-color: var(--light-blue);
    color: var(--white);
    font-weight: 500;
}

.cu-date-field__calendar-trigger[data-selected]::before {
    background-color: var(--white);
}

.cu-date-field__calendar-trigger[data-unavailable] {
    color: rgba(0, 0, 0, 0.3);
    text-decoration: line-through;
}

.cu-date-field__calendar-trigger::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 0;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 9999px;
    background-color: var(--white);
}

.cu-date-field__calendar-trigger[data-today]::before {
    display: block;
    background-color: var(--grass-9);
}

.PopoverTrigger:focus {
    box-shadow: 0 0 0 2px #000000;
}

.cu-date-field__popover-content {
    border-radius: 4px;
    padding: 15px;
    width: 320px;
    background-color: white;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
}

.cu-date-field__popover-content:focus {
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px,
        0 0 0 2px var(--grass-7);
}

.cu-date-field__popover-content[data-state='open'][data-side='top'] {
    animation-name: slideDownAndFade;
}

.cu-date-field__popover-content[data-state='open'][data-side='right'] {
    animation-name: slideLeftAndFade;
}

.cu-date-field__popover-content[data-state='open'][data-side='bottom'] {
    animation-name: slideUpAndFade;
}

.cu-date-field__popover-content[data-state='open'][data-side='left'] {
    animation-name: slideRightAndFade;
}

.cu-date-field__popover-arrow {
    fill: var(--white);
}

@keyframes slideUpAndFade {
    from {
        opacity: 0;
        transform: translateY(2px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideRightAndFade {
    from {
        opacity: 0;
        transform: translateX(-2px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideDownAndFade {
    from {
        opacity: 0;
        transform: translateY(-2px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideLeftAndFade {
    from {
        opacity: 0;
        transform: translateX(2px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>