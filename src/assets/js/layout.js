console.log('Hello world!');

document.addEventListener('DOMContentLoaded', () => {
  const MINI_HEADER_CLASS = 'mini-header';
  let isHeaderShrinked = false;
  document.addEventListener('scroll', () => {
    if (window.pageYOffset === 0 && isHeaderShrinked) {
      isHeaderShrinked = false;
      document.body.classList.remove(MINI_HEADER_CLASS);
    } else if (window.pageYOffset > 0 && !isHeaderShrinked) {
      isHeaderShrinked = true;
      document.body.classList.add(MINI_HEADER_CLASS);
    }
  });
});
