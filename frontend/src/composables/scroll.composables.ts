export function useScroll() {
  function disableScroll() {
    const scrollbarWidth: number = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
  }

  function enableScroll() {
    document.documentElement.style.paddingRight = '';
    document.body.style.overflow = '';
  }

  return {
    disableScroll,
    enableScroll,
  };
}
