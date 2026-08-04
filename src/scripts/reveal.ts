const observed = new Set<Element>();
const visible = new Set<Element>();
const hasObserver =
  typeof IntersectionObserver !== 'undefined' && typeof document !== 'undefined';

function onIntersect(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      visible.add(entry.target);
      entry.target.classList.add('is-visible');
    }
  }
}

const io = hasObserver
  ? new IntersectionObserver(onIntersect, {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    })
  : null;

export function observeReveals(scope: ParentNode = document) {
  if (!io) return;
  scope.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
    if (observed.has(el)) return;
    observed.add(el);
    if (visible.has(el)) return;
    io.observe(el);
  });
}

if (hasObserver) {
  observeReveals();
}
