
var myChartArmazenamento;

function criarGraficoArmazenamento() {

    if (myChartArmazenamento) {
        myChartArmazenamento.destroy();
    }

    const ctxArmazenamento = document.getElementById("myChartArmazenamento");

    
    myChartArmazenamento = new Chart(ctxArmazenamento, {
        type: 'pie',
        data: {
            labels: ['Disponível', 'Utilizado'],
            datasets: [{
                label: 'Máquinas',
                data: [armazenamentoLivre, armazenamentoUsado],
                backgroundColor: ['rgb(162, 177, 193)', 'rgb(87, 118, 154)'],
                borderColor: '#ffffff',
                borderWidth: 0,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    });
}



const ctxRAM = document.getElementById("myChartRAM");
var labels = [];
var dados = {
    labels: labels,
        datasets: [{
            label: 'Máquinas',
            data: [],
            backgroundColor: 'transparent',
            borderColor: '#17395cff',
            borderWidth: 3,
            pointBackgroundColor: '#17395c', 
            pointRadius: 3 
        }]
};

var myChartRAM = new Chart(ctxRAM, {
    type: 'line',
    data: dados,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5
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
            backgroundColor: 'transparent',
            borderColor: '#17395cff',
            borderWidth: 3,
            pointBackgroundColor: '#17395c', 
            pointRadius: 3 
        }]
};

var myChartCPU = new Chart(ctxCPU, {
    type: 'line',
    data: dados2,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5
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

