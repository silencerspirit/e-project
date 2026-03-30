import { ref } from 'vue';

const isDisabledScroll = ref<boolean>(false);

export const useScroll = () => {
  function disableScroll() {
    const scrollbarWidth: number = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
    isDisabledScroll.value = true;
  }

  function enableScroll() {
    document.documentElement.style.paddingRight = '';
    document.body.style.overflow = '';
    isDisabledScroll.value = false;
  }

  return {
    disableScroll,
    enableScroll,
  };
};
