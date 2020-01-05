input.onButtonPressed(Button.A, function () {
    kittybot.do_action(kittybot.actions(kittybot.action_name.walk_boldly), 2, 100)
})
input.onButtonPressed(Button.B, function () {
    kittybot.do_action(kittybot.actions(kittybot.action_name.walk_backward_boldly), 2, 100)
})
kittybot.set_offset(
    75,
    105,
    95,
    85
)
kittybot.stand_still()
basic.forever(function () {

})