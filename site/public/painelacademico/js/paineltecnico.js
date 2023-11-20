const ctxArmazenamento = document.getElementById("myChartArmazenamento");

setTimeout(() => {
    new Chart(ctxArmazenamento, {
        type: 'pie',
        data: {
            labels: ['Não afetadas', 'Afetadas'],
            datasets: [{
                label: 'Máquinas',
                data: [`${NmaquinasCadastradas - numMaquinasArmazenamento80}`, numMaquinasArmazenamento80],
                backgroundColor: ['rgb(162, 177, 193)', 'rgb(87, 118, 154)'],
                borderColor: '#ffffff',
                borderWidth: 0,
                // borderRadius: 80,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    // position: 'right'
                }
            }
        }
    });
  }, "1000");

  const ctxRAM = document.getElementById("myChartRAM");
  var labels = [];
  var dados = {
    labels: labels,
    datasets: [{
        label: 'Máquinas',
        data: [],
        backgroundColor: '#17395c',
        borderColor: '#ffffff',
        borderWidth: 0,
        borderRadius: 80,
        barThickness: 45
    }]
  };
  
  var myChartRAM = new Chart(ctxRAM, {
      type: 'bar',
      data: dados,
      options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 20
                },
                grid: {
                    display: false,
                }
            },
            x: {
                grid: {
                    display: false,
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
  });



const ctxCPU = document.getElementById("myChartCPU");
var labels2 = [];
var dados2 = {
    labels: labels2,
    datasets: [{
        label: 'Máquinas',
        data: [],
        backgroundColor: '#17395c',
        borderColor: '#ffffff',
        borderWidth: 0,
        borderRadius: 80,
        barThickness: 45
    }]
};

var myChartCPU = new Chart(ctxCPU, {
    type: 'bar',
    data: dados2,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 20
                },
                grid: {
                    display: false,
                }
            },
            x: {
                grid: {
                    display: false,
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

