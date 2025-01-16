function initComponents() {
    document.querySelectorAll(".btn-arrow").forEach(btn => {
        const reverseFlag = btn.getAttribute("data-reverse") == "true" ? true : false
        if (reverseFlag) btn.classList.add("btn-arrow_reverse")
        else btn.classList.add("btn-arrow_forward")
    })
}

initComponents()
