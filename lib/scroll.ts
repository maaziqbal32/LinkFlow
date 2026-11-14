/** Scrolls to the top instantly and removes any #hash from the URL. */
export function scrollToTop() {
  document.body.style.overflow = "";

  // Browser ki scroll restoration band karo — yeh sabse zaroori hai
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  // "smooth" ki jagah "instant" — warna AOS ke saath conflict hota hai
  window.scrollTo({ top: 0, behavior: "instant" });
  window.history.replaceState(null, "", window.location.pathname);
}