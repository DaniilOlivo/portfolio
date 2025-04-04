class ContactsAnimation {
    constructor() {
        this.SELECTORS = {
            CAT: ".cat",
            PAW: ".paw", 
            PHONE: ".phone-ico"
        }

        this.isPhoneFall = false;
        this.isPhoneFellForever = false;
        this.countFall = 0;
        this.cursorHover = false;

        this.initAnimations();
        this.setupEventListeners();
    }

    initAnimations() {
        this.tlInit = gsap.timeline();
        this.tlInit.to(this.SELECTORS.CAT, {
            top: 0,
            duration: 1,
            ease: "sine.in"
        }).to(this.SELECTORS.PAW, {
            delay: 1,
            height: 32,
            onComplete: () => this.tlPaw.play()
        });

        this.tlFallForever = gsap.timeline();
        this.tlFallForever.to(this.SELECTORS.PHONE, {
            delay: 0.5,
            duration: 1,
            y: "60vh",
            ease: "power4.in"
        }).to(this.SELECTORS.PAW, {
            height: 0
        }).to(this.SELECTORS.CAT, {
            top: 30,
            onComplete: () => document.querySelector(this.SELECTORS.PHONE).style.display = "none"
        }).pause();

        this.tlPaw = gsap.timeline();
        this.tlPaw.to(this.SELECTORS.PAW, {
            delay: 1,
            ease: "circ.in",
            height: 50
        }).to(this.SELECTORS.PHONE, {
            rotation: -45,
            duration:1.5,
            ease: "expo.in",
            onComplete: () => {
                this.isPhoneFall = true;
                if (this.countFall >= 5) {
                    this.isPhoneFellForever = true;
                    this.tlFallForever.play();
                }
                this.countFall += 1;
                this.animBackPhone.restart();
                this.animBackPhone.pause();
            }
        }).to(this.SELECTORS.PAW, {
            height: 32,
            ease: "circ.out"
        }, "<");
        this.tlPaw.pause();

        this.animBackPhone = gsap.to(this.SELECTORS.PHONE, {
            paused: true,
            rotation: 0,
            onComplete: () => {
                this.isPhoneFall = false;
                if (!this.cursorHover) this.tlPaw.restart();
            }
        });
    }

    setupEventListeners() {
        const phoneElement = document.querySelector(this.SELECTORS.PHONE);
        phoneElement.addEventListener("mouseenter", () => {
            this.cursorHover = true;
            if (this.isPhoneFall && !this.isPhoneFellForever) this.animBackPhone.play();
        });
        phoneElement.addEventListener("mouseleave", () => {
            this.cursorHover = false;
            if (!this.isPhoneFall) this.tlPaw.restart();
        });
    }
}

function initContacts() {
    new ContactsAnimation();
}

document.addEventListener('DOMContentLoaded', initContacts);
