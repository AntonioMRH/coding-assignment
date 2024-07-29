class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe(element) {
    this.callback([{ isIntersecting: true, target: element }]);
  }

  unobserve() {}

  disconnect() {}
}

global.IntersectionObserver = IntersectionObserver;
