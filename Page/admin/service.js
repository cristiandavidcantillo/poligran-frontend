const products = [
    {
      id: 1,
      name: "Pizza Pepperoni",
      price: 25000,
      category: "Pizzas",
      status: "active",
      date: "2023-05-15"
    },
    {
      id: 2,
      name: "Hamburguesa Clásica",
      price: 27000,
      category: "Hamburguesas",
      status: "active",
      date: "2023-05-16"
    },
    {
      id: 3,
      name: "Ensalada César",
      price: 20000,
      category: "Ensaladas",
      status: "active",
      date: "2023-05-17"
    },
    {
      id: 4,
      name: "Jugo de Naranja",
      price: 6000,
      category: "Bebidas",
      status: "active",
      date: "2023-05-18"
    },
    {
      id: 5,
      name: "Pizza Hawaiana",
      price: 26000,
      category: "Pizzas",
      status: "active",
      date: "2023-05-19"
    },
    {
      id: 6,
      name: "Hamburguesa Doble",
      price: 32000,
      category: "Hamburguesas",
      status: "active",
      date: "2023-05-20"
    }
  ];
  
  // Variables de estado
  let currentPage = 1;
  let rowsPerPage = 4;
  let filteredProducts = [...products];
  
  // Inicializar la aplicación
  document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    renderProducts();
    setupPagination();
    document.getElementById('filterSection').style.display = 'none';
    document.getElementById('clearFilters').style.display = 'none';
  });
  
  function initializeFilters() {
    const filterButton = document.getElementById('filterButton');
    const filterSection = document.getElementById('filterSection');
    const clearFilters = document.getElementById('clearFilters');
    
  
     filterButton.addEventListener('click', function() {
      const isVisible = filterSection.style.display === 'block';
      filterSection.style.display = isVisible ? 'none' : 'block';
      clearFilters.style.display = isVisible ? 'none' : 'flex'; // Cambiado a 'flex'
      
      if (filterSection.style.display === 'block') {
        this.classList.add('bg-blue-600');
        this.classList.remove('bg-blue-500');
      } else {
        this.classList.add('bg-blue-500');
        this.classList.remove('bg-blue-600');
      }
    });
    
    // Limpiar filtros
    clearFilters.addEventListener('click', function() {
      document.getElementById('dateFilter').value = '';
      currentPage = 1;
      filteredProducts = [...products];
      renderProducts();
      setupPagination();
    });
    
    // Evento para el filtro de fecha
    document.getElementById('dateFilter').addEventListener('change', function() {
      const dateValue = this.value;
      
      if (dateValue) {
        filteredProducts = products.filter(product => {
          return product.date === dateValue;
        });
      } else {
        filteredProducts = [...products];
      }
      
      currentPage = 1;
      renderProducts();
      setupPagination();
    });
  }
  
  // Renderizado de productos
  function renderProducts() {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedProducts = filteredProducts.slice(start, end);
    
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    if (paginatedProducts.length === 0) {
      container.innerHTML = `
        <div class="col-span-2 text-center py-10">
          <p class="text-gray-500">No se encontraron productos para la fecha seleccionada</p>
        </div>
      `;
      return;
    }
    
    // Sección de Nombre del platillo
    const dishesDiv = document.createElement('div');
    dishesDiv.className = 'bg-white p-6 rounded-lg shadow';
    dishesDiv.innerHTML = '<h2 class="text-xl font-bold text-gray-800 mb-4">Nombre del platillo</h2>';
    
    const dishesList = document.createElement('div');
    dishesList.className = 'space-y-3';
    
    paginatedProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product-card bg-gray-50 p-4 rounded-lg flex justify-between items-center';
      productDiv.innerHTML = `
        <span class="font-medium">${product.name}</span>
        <span class="font-bold text-green-600">$${product.price.toLocaleString()}</span>
      `;
      dishesList.appendChild(productDiv);
    });
    
    dishesDiv.appendChild(dishesList);
    container.appendChild(dishesDiv);
    
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'bg-white p-6 rounded-lg shadow';
    categoryDiv.innerHTML = `
      <h2 class="text-xl font-bold text-gray-800 mb-4">Categoría</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-3">
          <div class="font-medium">Pizzas</div>
          <div class="font-medium">Hamburguesas</div>
          <div class="font-medium">Ensaladas</div>
          <div class="font-medium">Bebidas</div>
        </div>
        <div class="space-y-3">
          <div><span class="availability-badge bg-green-100 text-green-800">Activo</span></div>
          <div><span class="availability-badge bg-red-100 text-red-800">No disponible</span></div>
          <div><span class="availability-badge bg-green-100 text-green-800">Activo</span></div>
          <div><span class="availability-badge bg-red-100 text-red-800">No disponible</span></div>
        </div>
      </div>
    `;
    container.appendChild(categoryDiv);
  }
  
  // Paginación
  function setupPagination() {
    const rowsSelector = document.getElementById('rowsPerPage');
    rowsSelector.addEventListener('change', function() {
      rowsPerPage = parseInt(this.value);
      currentPage = 1;
      renderProducts();
      updatePaginationButtons();
    });
    
    updatePaginationButtons();
  }
  
  function updatePaginationButtons() {
    const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';
    
    // Botón Anterior
    if (currentPage > 1) {
      const prevButton = document.createElement('button');
      prevButton.className = 'px-3 py-1 rounded-md hover:bg-gray-200';
      prevButton.innerHTML = '&laquo;';
      prevButton.addEventListener('click', () => {
        currentPage--;
        renderProducts();
        updatePaginationButtons();
      });
      paginationDiv.appendChild(prevButton);
    }
    
    // Botones de página
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.className = `px-3 py-1 rounded-md ${currentPage === i ? 'bg-gray-200 text-gray-700' : 'hover:bg-gray-200'}`;
      button.textContent = i;
      button.addEventListener('click', () => {
        currentPage = i;
        renderProducts();
        updatePaginationButtons();
      });
      paginationDiv.appendChild(button);
    }
    
    // Botón Siguiente
    if (currentPage < totalPages) {
      const nextButton = document.createElement('button');
      nextButton.className = 'px-3 py-1 rounded-md hover:bg-gray-200';
      nextButton.innerHTML = '&raquo;';
      nextButton.addEventListener('click', () => {
        currentPage++;
        renderProducts();
        updatePaginationButtons();
      });
      paginationDiv.appendChild(nextButton);
    }
  }