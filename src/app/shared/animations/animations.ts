import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

export const slideInAnimation = [
    trigger("flyInOut", [
        state("in", style({ transform: "translateX(0)" })),
        transition("void => *", [
            animate(
                500,
                keyframes([
                    style({ opacity: 0, transform: "translateX(-100%)", offset: 0 }),
                    style({ opacity: 1, transform: "translateX(15px)", offset: 0.5 }),
                    style({ opacity: 1, transform: "translateX(0)", offset: 1.0 })
                ])
            )
        ]),
        transition("* => void", [
            animate(
                500,
                keyframes([
                    style({ opacity: 1, transform: "translateX(0)", offset: 0 }),
                    style({ opacity: 1, transform: "translateX(-15px)", offset: 0.5 }),
                    style({ opacity: 0, transform: "translateX(100%)", offset: 1.0 })
                ])
            )
        ])
    ])
]