<script setup>
import CCombobox from './components/CCombobox.vue';
import CInputNumber from './components/CInputNumber.vue';
import CDatePicker from './components/CDatePicker.vue';
import { ref, shallowReactive, reactive, watch } from 'vue';


const comboItems = shallowReactive([
  {
    NAME: '20 футов'
  },
  {
    NAME: '40 футов'
  }
]);

const terminals = shallowReactive((window.containerPrices) ? window.containerPrices : [
  {
    NAME: 'Терминал 1',
    DISTANCE_VALUE: 6,
  },
  {
    NAME: 'Терминал 2',
    DISTANCE_VALUE: 12
  },
  {
    NAME: 'Терминал 3',
    DISTANCE_VALUE: 40
  }
]);

const data = reactive({
  containerType: '',
  distance: '',
  moveFrom: '',
  moveTo: '',
  date: ''
})
const submit = () => {
  const moveFromDistance = parseFloat(terminals.find(terminal => terminal.NAME === data.moveFrom)?.DISTANCE_VALUE);
  const moveToDistance = parseFloat(terminals.find(terminal => terminal.NAME === data.moveTo)?.DISTANCE_VALUE);
  if (moveFromDistance && moveToDistance) {
    const calcResult = (moveFromDistance + moveToDistance + (data.distance || 0)) * 100 + 20000;
    if ((typeof window.emulateFinalAction) === 'function') {
      window.emulateFinalAction({
        ...data,
        calcResult
      })
    } else {
      console.log(calcResult);
    }
  }
}

</script>
<template>
  <div class="cu-form">
    <h2 class="cu-title mb-[25px]">Расчитать стоимость перевозки по Москве</h2>
    <form @submit.prevent="submit" class="cu-form__wrapper">
      <div class="cu-form__grid">
        <div class="cu-inpt-group">
          <label for="container-type" class="cu-inpt-group__label">Тип контейнера</label>
          <CCombobox placeholder="40 футов" id="container-type" v-model="data.containerType" :items="comboItems" />
        </div>
        <div class="cu-inpt-group">
          <label for="distance" class="cu-inpt-group__label">Километраж от МКАД до склада</label>
          <CInputNumber placeholder="Расстояние" id="distance" v-model="data.distance" />
        </div>
        <div class="cu-inpt-group">
          <label for="moveFrom" class="cu-inpt-group__label">Терминал постановки</label>
          <CCombobox placeholder="Пункт отправки" id="moveFrom" v-model="data.moveFrom" :items="terminals"
            :display-trigger="false">
            <template #before>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_303_241)">
                  <path
                    d="M9.965 20.0068L9.3841 19.5088C8.58328 18.8383 1.59082 12.7993 1.59082 8.38199C1.59082 3.75707 5.34008 0.0078125 9.965 0.0078125C14.5899 0.0078125 18.3392 3.75707 18.3392 8.38199C18.3392 12.7994 11.3467 18.8383 10.5492 19.5121L9.965 20.0068ZM9.965 1.81855C6.34184 1.82266 3.4057 4.75879 3.4016 8.38195C3.4016 11.157 7.70363 15.5902 9.965 17.6192C12.2264 15.5893 16.5284 11.1537 16.5284 8.38195C16.5243 4.75879 13.5882 1.8227 9.965 1.81855Z"
                    fill="#738692" />
                  <path
                    d="M9.96502 11.7014C8.13174 11.7014 6.64557 10.2152 6.64557 8.38195C6.64557 6.54867 8.13174 5.0625 9.96502 5.0625C11.7983 5.0625 13.2845 6.54867 13.2845 8.38195C13.2845 10.2152 11.7983 11.7014 9.96502 11.7014ZM9.96502 6.72219C9.04838 6.72219 8.3053 7.46527 8.3053 8.38191C8.3053 9.29855 9.04838 10.0416 9.96502 10.0416C10.8817 10.0416 11.6247 9.29855 11.6247 8.38191C11.6247 7.46527 10.8817 6.72219 9.96502 6.72219Z"
                    fill="#738692" />
                </g>
                <defs>
                  <clipPath id="clip0_303_241">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </template>
          </CCombobox>
        </div>
        <div class="cu-inpt-group">
          <label for="moveTo" class="cu-inpt-group__label">Терминал сдачи</label>
          <CCombobox placeholder="Пункт назначения" id="moveTo" v-model="data.moveTo" :items="terminals"
            :display-trigger="false">

            <template #before>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_303_241)">
                  <path
                    d="M9.965 20.0068L9.3841 19.5088C8.58328 18.8383 1.59082 12.7993 1.59082 8.38199C1.59082 3.75707 5.34008 0.0078125 9.965 0.0078125C14.5899 0.0078125 18.3392 3.75707 18.3392 8.38199C18.3392 12.7994 11.3467 18.8383 10.5492 19.5121L9.965 20.0068ZM9.965 1.81855C6.34184 1.82266 3.4057 4.75879 3.4016 8.38195C3.4016 11.157 7.70363 15.5902 9.965 17.6192C12.2264 15.5893 16.5284 11.1537 16.5284 8.38195C16.5243 4.75879 13.5882 1.8227 9.965 1.81855Z"
                    fill="#738692" />
                  <path
                    d="M9.96502 11.7014C8.13174 11.7014 6.64557 10.2152 6.64557 8.38195C6.64557 6.54867 8.13174 5.0625 9.96502 5.0625C11.7983 5.0625 13.2845 6.54867 13.2845 8.38195C13.2845 10.2152 11.7983 11.7014 9.96502 11.7014ZM9.96502 6.72219C9.04838 6.72219 8.3053 7.46527 8.3053 8.38191C8.3053 9.29855 9.04838 10.0416 9.96502 10.0416C10.8817 10.0416 11.6247 9.29855 11.6247 8.38191C11.6247 7.46527 10.8817 6.72219 9.96502 6.72219Z"
                    fill="#738692" />
                </g>
                <defs>
                  <clipPath id="clip0_303_241">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </template>
          </CCombobox>
        </div>
        <div class="cu-inpt-group full">
          <label for="date" class="cu-inpt-group__label">Дата подачи машины</label>
          <CDatePicker v-model="data.date" id="date" />
        </div>
      </div>
      <div class="cu-form__approve">
        <button class="cu-btn" type="submit">
          Расчитать
        </button>
        <div class="cu-form__desc">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.25 5.41667C11.25 5.6639 11.1767 5.90557 11.0393 6.11113C10.902 6.3167 10.7068 6.47691 10.4784 6.57152C10.25 6.66613 9.99862 6.69088 9.75614 6.64265C9.51367 6.59442 9.29094 6.47537 9.11612 6.30055C8.94131 6.12574 8.82225 5.90301 8.77402 5.66053C8.72579 5.41806 8.75055 5.16672 8.84515 4.93832C8.93976 4.70991 9.09998 4.51469 9.30554 4.37733C9.5111 4.23998 9.75278 4.16667 10 4.16667C10.3315 4.16667 10.6495 4.29837 10.8839 4.53279C11.1183 4.76721 11.25 5.08515 11.25 5.41667ZM20 10C20 8.02219 19.4135 6.08879 18.3147 4.4443C17.2159 2.79981 15.6541 1.51809 13.8268 0.761209C11.9996 0.00433286 9.98891 -0.193701 8.0491 0.192152C6.10929 0.578004 4.32746 1.53041 2.92894 2.92894C1.53041 4.32746 0.578004 6.10929 0.192152 8.0491C-0.193701 9.98891 0.00433286 11.9996 0.761209 13.8268C1.51809 15.6541 2.79981 17.2159 4.4443 18.3147C6.08879 19.4135 8.02219 20 10 20H20V10ZM18.3333 10V18.3333H10C8.35183 18.3333 6.74066 17.8446 5.37025 16.9289C3.99984 16.0132 2.93174 14.7118 2.30101 13.189C1.67028 11.6663 1.50525 9.99076 1.82679 8.37425C2.14834 6.75774 2.94201 5.27289 4.10745 4.10745C5.27289 2.94201 6.75774 2.14834 8.37425 1.82679C9.99076 1.50525 11.6663 1.67028 13.189 2.30101C14.7118 2.93174 16.0132 3.99984 16.9289 5.37025C17.8446 6.74066 18.3333 8.35183 18.3333 10ZM11.6667 10C11.6667 9.55798 11.4911 9.13405 11.1785 8.82149C10.866 8.50893 10.442 8.33334 10 8.33334H8.33334V10H10V15.8333H11.6667V10Z"
              fill="#97B7CE" />
          </svg>
          <span>Нажимая на кнопку я соглашаюсь с политикой обработки и хранения персональных данных</span>
        </div>
      </div>
    </form>
    <form action=""></form>
  </div>
</template>
<style lang="css">
.cu-custom .cu-form {
  background-color: var(--blue);
  padding: 30px;
}

.cu-custom .cu-form .cu-title {
  color: var(--white);
}

.cu-custom .cu-form__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.cu-custom .cu-inpt {
  width: 100%;
  font-size: 16px;
  border-radius: 4px;
  padding: 12px 15px;
  background: var(--white);
  font-weight: 600;
}

.cu-custom .cu-inpt-group__label {
  display: block;
  font-weight: 600;
  color: var(--turquoise);
  margin-bottom: 11px;
}


.cu-custom .cu-btn {
  padding: 12px 15px;
  background-color: var(--light-blue);
  color: var(--white);
  font-size: 15px;
  border-radius: 4px;
  font-weight: bold;
  height: fit-content;
}

.cu-custom .cu-form__approve {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}


.cu-custom .cu-form__desc {
  display: flex;
  font-weight: semibold;
  align-items: flex-start;
  gap: 11px;
  color: var(--turquoise);
}

.cu-custom .cu-custom .cu-form__desc>*:first-child {
  flex-shrink: 0;
}

@media (min-width: 480px) {
  .cu-custom .cu-form__approve {
    flex-direction: row;
    align-items: center;
  }
}

@media (min-width: 1024px) {
  .cu-custom .cu-form__grid {
    grid-template-columns: 1fr 1fr;
  }

  .cu-custom .cu-form__approve {
    flex-direction: row;
  }

  .cu-custom .cu-inpt-group.full {
    grid-column: span 2;
  }
}
</style>