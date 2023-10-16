const ctxArmazenamento = document.getElementById("myChartArmazenamento");

new Chart(ctxArmazenamento, {
    type: 'pie',
    data: {
        labels: ['Não afetadas', 'Afetadas'],
        datasets: [{
            label: 'Máquinas',
            data: [240, 25],
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

const ctxRAM = document.getElementById("myChartRAM");

new Chart(ctxRAM, {
    type: 'bar',
    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
        datasets: [{
            label: 'Máquinas',
            data: [40, 50, 80, 60, 30],
            backgroundColor: 'rgb(87, 118, 154)',
            borderColor: '#ffffff',
            borderWidth: 0,
            borderRadius: 80,
            barThickness: 30
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
            data: [40, 50, 80, 60, 30],
            backgroundColor: 'rgb(23, 57, 92)',
            borderColor: '#ffffff',
            borderWidth: 0,
            borderRadius: 80,
            barThickness: 30
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