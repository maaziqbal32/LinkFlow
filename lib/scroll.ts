/** Smoothly scrolls to the top and removes any #hash from the URL. */
export function scrollToTop() {
  document.body.style.overflow = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.history.replaceState(null, "", window.location.pathname);
}