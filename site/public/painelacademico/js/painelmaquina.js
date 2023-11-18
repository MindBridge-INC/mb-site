const ctxArmazenamento = document.getElementById("myChartArmazenamento");

new Chart(ctxArmazenamento, {
    type: 'doughnut',
    data: {
        labels: ['Usado', 'Livre'],
        datasets: [{
            label: 'Armazenamento',
            data: [54, 46],
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
                display: true
            }
        }
    }
});

const ctxRAM = document.getElementById("myChartRAM");

new Chart(ctxRAM, {
    type: 'bar',
    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
        datasets: [{
            label: 'Máquinas',
            data: [10, 14, 16, 11,9],
            backgroundColor: '#17395cff',
            borderColor: '#ffffff',
            borderWidth: 0,
            borderRadius: 80,
            barThickness: 35
        }]
    },
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

new Chart(ctxCPU, {
    type: 'bar',
    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
        datasets: [{
            label: 'Máquinas',
            data: [10, 14, 16, 11,9],
            backgroundColor: '#17395cff',
            borderColor: '#ffffff',
            borderWidth: 0,
            borderRadius: 80,
            barThickness: 35
        }]
    },
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