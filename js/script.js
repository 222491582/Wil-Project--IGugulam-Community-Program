
function go(page){
  window.location.href = page;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-search]").forEach(input => {
    input.addEventListener("input", () => {
      const term = input.value.toLowerCase();
      const rows = document.querySelectorAll("[data-search-row]");
      rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(term) ? "" : "none";
      });
    });
  });

  document.querySelectorAll("[data-demo]").forEach(btn => {
    btn.addEventListener("click", () => {
      const message = btn.dataset.demo;
      alert(message);
    });
  });

  const modal = document.querySelector(".modal-backdrop");
  document.querySelectorAll("[data-open-modal]").forEach(btn => {
    btn.addEventListener("click", () => modal?.classList.add("show"));
  });
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => modal?.classList.remove("show"));
  });
  modal?.addEventListener("click", e => {
    if(e.target === modal) modal.classList.remove("show");
  });
});
