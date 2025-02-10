// Función para convertir RGB a hexadecimal
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }
  
  // Función para convertir hexadecimal a RGB
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }
  
  // Función para actualizar el color y el código hexadecimal
  function updateColor() {
    // Obtener los valores de los controles
    const red = document.getElementById('red').value;
    const green = document.getElementById('green').value;
    const blue = document.getElementById('blue').value;
  
    // Actualizar el color del recuadro
    const colorBox = document.getElementById('color-box');
    colorBox.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  
    // Actualizar el código hexadecimal
    const hexCode = document.getElementById('hex-code');
    hexCode.textContent = rgbToHex(parseInt(red), parseInt(green), parseInt(blue));
  
    // Actualizar el color picker
    const colorPicker = document.getElementById('color-picker');
    colorPicker.value = rgbToHex(parseInt(red), parseInt(green), parseInt(blue));
  }
  
  // Función para sincronizar sliders y campos de texto
  function syncInputs(sliderId, inputId) {
    const slider = document.getElementById(sliderId);
    const input = document.getElementById(inputId);
  
    // Sincronizar slider -> input
    slider.addEventListener('input', () => {
      input.value = slider.value;
      updateColor();
    });
  
    // Sincronizar input -> slider
    input.addEventListener('input', () => {
      let value = parseInt(input.value);
      if (isNaN(value) || value < 0) value = 0;
      if (value > 255) value = 255;
      slider.value = value;
      input.value = value; // Asegurar que el valor esté dentro del rango
      updateColor();
    });
  }
  
  // Sincronizar los controles
  syncInputs('red', 'red-input');
  syncInputs('green', 'green-input');
  syncInputs('blue', 'blue-input');
  
  // Manejar el input de tipo color (color picker)
  const colorPicker = document.getElementById('color-picker');
  colorPicker.addEventListener('input', () => {
    const hex = colorPicker.value;
    const { r, g, b } = hexToRgb(hex);
  
    // Actualizar sliders y campos de texto
    document.getElementById('red').value = r;
    document.getElementById('red-input').value = r;
    document.getElementById('green').value = g;
    document.getElementById('green-input').value = g;
    document.getElementById('blue').value = b;
    document.getElementById('blue-input').value = b;
  
    // Actualizar el color
    updateColor();
  });
  
  // Inicializar el color al cargar la página
  updateColor();