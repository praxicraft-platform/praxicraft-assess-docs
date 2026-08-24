document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-postman-collection]");
  if (!link || !(link instanceof HTMLAnchorElement)) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const filename =
    link.getAttribute("download") || "praxicraft-assess.postman_collection.json";

  fetch(link.href)
    .then((response) => {
      if (!response.ok) {
        throw new Error("collection fetch failed");
      }
      return response.blob();
    })
    .then((blob) => {
      const file = new Blob([blob], { type: "application/octet-stream" });
      const objectUrl = URL.createObjectURL(file);
      const saver = document.createElement("a");
      saver.href = objectUrl;
      saver.download = filename;
      saver.rel = "noopener";
      document.body.appendChild(saver);
      saver.click();
      saver.remove();
      URL.revokeObjectURL(objectUrl);
    })
    .catch(() => {
      window.location.assign(link.href);
    });
});
