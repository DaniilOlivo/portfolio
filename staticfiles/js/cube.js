function initRotateCube(selCube, selFirstSide, selSecondSide, classTurn) {
    let cube = document.querySelector(selCube)
    let firstSide = document.querySelector(selFirstSide)
    let secondSide = document.querySelector(selSecondSide)

    let slideFunc = () => cube.classList.toggle(classTurn)

    firstSide.addEventListener("click", slideFunc)
    secondSide.addEventListener("click", slideFunc)
}

initRotateCube(".cube_left", ".cube_left .plate_front", ".cube_left .plate_aside-left", "cube_tunred-right")
initRotateCube(".cube_right", ".cube_right .plate_front", ".cube_right .plate_aside-right", "cube_tunred-left")

initRotateCube(".cube_card_first", ".cube_card_first .cube__face_front", ".cube_card_first .cube__face_aside-left", "cube_card_turn-right")
initRotateCube(".cube_card_second", ".cube_card_second .cube__face_front", ".cube_card_second .cube__face_aside-left", "cube_card_turn-right")
