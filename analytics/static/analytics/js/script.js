function initAnalytics() {
    let lastTime = 0

    document.addEventListener("visibilitychange", async () => {
        if (document.hidden) {
            const currentTime = performance.now()
            const content = {
                milliseconds: currentTime - lastTime
            }
            lastTime = currentTime

            const token = document.querySelector("input[name='csrfmiddlewaretoken']").value

            const res = await fetch("/analytics/time/", {
                method: "POST",
                headers: {
                    'X-CSRFToken': token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(content)
            })
        }
    })
}

initAnalytics()
