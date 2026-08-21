const montoInput = document.getElementById('monto');
const monedaSelect = document.getElementById('moneda');
const btnBuscar = document.getElementById('btnBuscar');
const resultadoText = document.getElementById('resultado');
const errorText = document.getElementById('error');

let myChart = null; // Variable para almacenar y destruir la instancia del gráfico previa

async function realizarConversion() {
  const monto = parseFloat(montoInput.value);
  const tipoMoneda = monedaSelect.value;

  errorText.innerText = '';

  if (!monto || monto <= 0) {
    errorText.innerText = 'Por favor, ingresa un monto válido en CLP.';
    return;
  }
  if (!tipoMoneda) {
    errorText.innerText = 'Por favor, selecciona una moneda.';
    return;
  }

  try {
    const res = await fetch(`https://mindicador.cl/api/${tipoMoneda}`);
    
    if (!res.ok) {
      throw new Error(`Error en la petición: status ${res.status}`);
    }

    const data = await res.json();
    
    const valorActual = data.serie[0].valor;
    const totalConvertido = (monto / valorActual).toFixed(2);

    resultadoText.innerText = `Resultado: $${totalConvertido}`;

    renderizarGrafico(data.serie.slice(0, 10));

  } catch (error) {
    errorText.innerText = `Ocurrió un error al consultar la API: ${error.message}`;
    resultadoText.innerText = '...';
  }
}

function renderizarGrafico(historial) {
  const ctx = document.getElementById('graficoHistorial').getContext('2d');

  const ultimosDiezDias = historial.reverse();

  const labels = ultimosDiezDias.map(item => item.fecha.substring(0, 10));
  const valores = ultimosDiezDias.map(item => item.valor);

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Historial últimos 10 días',
        data: valores,
        borderColor: '#ff4d6d',
        backgroundColor: 'rgba(255, 77, 109, 0.2)',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}


btnBuscar.addEventListener('click', realizarConversion);