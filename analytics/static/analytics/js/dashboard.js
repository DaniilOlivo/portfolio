async function getStats(period) {
    const token = document.querySelector("input[name='csrfmiddlewaretoken']").value

    const res = await fetch("/analytics/stats/", {
        method: "POST",
        headers: {
            'X-CSRFToken': token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({period})
    })

    if (res.ok) {
        const data = await res.json()
        document.querySelector(".stat-block__count").textContent = data.count
        document.querySelector(".stat-block__average").textContent = data.average
    }
}

function initForm() {
    // По умолчанию
    getStats("all-time")

    const form = document.querySelector(".form-dashboard")
    const input = document.querySelector("#period-input")
    form.addEventListener("change", () => getStats(input.value))
}

initForm()
