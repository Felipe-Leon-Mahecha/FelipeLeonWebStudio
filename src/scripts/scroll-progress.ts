const bar = document.querySelector<HTMLElement>('#scroll-progress');

if (bar) {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${progress})`;
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}
