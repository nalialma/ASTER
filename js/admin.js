

document.addEventListener("DOMContentLoaded", () => {
  // Cargar datos existentes
  const content = JSON.parse(localStorage.getItem('aster_content') || '{}');
  if (content.mainTitle) document.getElementById('mainTitle').value = content.mainTitle;
  if (content.mainDescription) document.getElementById('mainDescription').value = content.mainDescription;
  if (content.mainImage) document.getElementById('mainImage').value = content.mainImage;
  if (content.services) document.getElementById('services').value = content.services.join(', ');

  // Guardar cambios
  document.getElementById('contentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const updatedContent = {
      mainTitle: document.getElementById('mainTitle').value,
      mainDescription: document.getElementById('mainDescription').value,
      mainImage: document.getElementById('mainImage').value,
      services: document.getElementById('services').value.split(',').map(s => s.trim())
    };
    localStorage.setItem('aster_content', JSON.stringify(updatedContent));
    document.getElementById('status').textContent = "¡Contenido actualizado!";
  });
});
