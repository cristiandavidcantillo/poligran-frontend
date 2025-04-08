document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const formulario = document.getElementById('formularioPlatillo');
    const btnCancelar = document.getElementById('btnCancelar');
    const inputImagen = document.getElementById('imagen');
    const imagenPrevia = document.getElementById('imagenPrevia');
    const iconoSubir = document.getElementById('iconoSubir');
    
    // Obtener el ID del platillo de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const platilloId = urlParams.get('id');
    
    // Si hay un ID, estamos editando un platillo existente
    if (platilloId) {
        cargarPlatilloParaEdicion(platilloId);
    }
    
    // Manejar la subida de imagen
    inputImagen.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagenPrevia.src = e.target.result;
                imagenPrevia.classList.remove('hidden');
                iconoSubir.classList.add('hidden');
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Manejar el envío del formulario
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const id = document.getElementById('platilloId').value || Date.now().toString();
        const nombre = document.getElementById('nombre').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const descripcion = document.getElementById('descripcion').value;
        const categoria = document.getElementById('categoria').value;
        const imagen = imagenPrevia.src || '';
        
        // Crear objeto platillo
        const platillo = {
            id,
            nombre,
            precio,
            descripcion,
            categoria,
            imagen
        };
        
        // Guardar en localStorage
        guardarPlatillo(platillo);
        
        // Redirigir al listado o dashboard
        window.location.href = '../admin/service.html';
    });
    
    // Manejar el botón cancelar
    btnCancelar.addEventListener('click', function() {
        if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no se guardarán.')) {
            window.location.href = '../admin/service.html';
        }
    });
    
    // Función para cargar un platillo para edición
    function cargarPlatilloParaEdicion(id) {
        const platillos = JSON.parse(localStorage.getItem('platillos')) || [];
        const platillo = platillos.find(p => p.id === id);
        
        if (platillo) {
            document.getElementById('platilloId').value = platillo.id;
            document.getElementById('nombre').value = platillo.nombre;
            document.getElementById('precio').value = platillo.precio;
            document.getElementById('descripcion').value = platillo.descripcion;
            document.getElementById('categoria').value = platillo.categoria;
            
            if (platillo.imagen) {
                imagenPrevia.src = platillo.imagen;
                imagenPrevia.classList.remove('hidden');
                iconoSubir.classList.add('hidden');
            }
        }
    }
    
    // Función para guardar un platillo en localStorage
    function guardarPlatillo(platillo) {
        let platillos = JSON.parse(localStorage.getItem('platillos')) || [];
        
        // Buscar si el platillo ya existe
        const index = platillos.findIndex(p => p.id === platillo.id);
        
        if (index !== -1) {
            // Actualizar platillo existente
            platillos[index] = platillo;
        } else {
            // Agregar nuevo platillo
            platillos.push(platillo);
        }
        
        localStorage.setItem('platillos', JSON.stringify(platillos));
    }
  });
  const inputPrecio = document.getElementById('precio');

// Mostrar formato tipo $20.000 mientras escribe, pero internamente manejar solo números
inputPrecio.addEventListener('input', function (e) {
    let valor = e.target.value.replace(/[^0-9]/g, ''); // Solo números

    if (valor) {
        // Formato visual con punto como separador de miles y $ al inicio
        e.target.value = `$${parseInt(valor).toLocaleString('es-CO')}`;
    } else {
        e.target.value = '';
    }
});

// Al enviar el formulario, limpiar el valor y convertir a número
formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const precioRaw = document.getElementById('precio').value.replace(/[^0-9]/g, ''); // Solo dígitos
    const precio = parseFloat(precioRaw);

    // Continuar con los datos
    const id = document.getElementById('platilloId').value || Date.now().toString();
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;
    const imagen = imagenPrevia.src || '';

    const platillo = {
        id,
        nombre,
        precio,
        descripcion,
        categoria,
        imagen
    };

    guardarPlatillo(platillo);
    window.location.href = '../admin/service.html';
});