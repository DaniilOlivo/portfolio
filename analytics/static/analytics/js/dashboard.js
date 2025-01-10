let chart

function drawChart(chartObject, init) {
    if (!init) chart.destroy()
    const ctx = document.getElementById('chart')
    chart = new Chart(ctx, {
        type: 'line',
        options: {
            animation: false,
            plugins: {
              legend: {
                display: false
              }
            }
          },
        data: {
            labels: chartObject.labels,
            datasets: [{
                data: chartObject.data,
                borderColor: '#F5CB5C',
                tension: 0.1
            }]
        }
    })
}

async function getStats(period, init=false) {
    const res = await fetch(`/analytics/stats/${period}/`)

    if (res.ok) {
        const data = await res.json()
        document.querySelector(".stat-block__count").textContent = data.count
        document.querySelector(".stat-block__average").textContent = data.average

        drawChart(data.chart, init)
    }
}

function initForm() {
    // По умолчанию
    getStats("all-time", true)

    const form = document.querySelector(".form-dashboard")
    const input = document.querySelector("#period-input")
    form.addEventListener("change", () => getStats(input.value))
}

initForm()
