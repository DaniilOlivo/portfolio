function initRotateCube(cube, firstSide, secondSide, classTurn) {
    const slideFunc = () => cube.classList.toggle(classTurn)
    firstSide.addEventListener("click", slideFunc)
    secondSide.addEventListener("click", slideFunc)
}

function initRotateCubeSelectors(selCube, selFirstSide, selSecondSide, classTurn) {
    let cube = document.querySelector(selCube)
    let firstSide = document.querySelector(selFirstSide)
    let secondSide = document.querySelector(selSecondSide)

    initRotateCube(cube, firstSide, secondSide, classTurn)
}

function initCubes() {
    initRotateCubeSelectors(
        ".cube_left",
        ".cube_left .plate_front",
        ".cube_left .plate_aside-left", 
        "cube_tunred-right"
    )
    initRotateCubeSelectors(
        ".cube_right",
        ".cube_right .plate_front",
        ".cube_right .plate_aside-right",
        "cube_tunred-left"
    )

    const cubesCards = document.querySelectorAll(".cube_card")
    for (const cube of cubesCards) {
        const firstSide = cube.querySelector(".cube__face_front")
        const secondSide = cube.querySelector(".cube__face_aside-left")
        initRotateCube(cube, firstSide, secondSide, "cube_card_turn-right")
    }
}

initCubes()
