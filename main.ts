/**
 * kittybot blocks
 */
//% weight=100 color=#0fbc11 icon="\uf0a4" 
namespace kittybot {

    let action_data = [
        [    // walk
            //LL, LF, RL, RF
            [0, 40, 0, 15],
            [-30, 40, -30, 15],
            [-30, 0, -30, 0],

            [0, -15, 0, -40],
            [30, -15, 30, -40],
            [30, 0, 30, 0],
        ],
        [    // walk backward
            //LL, LF, RL, RF
            [0, 40, 0, 15],
            [30, 40, 30, 15],
            [30, 0, 30, 0],

            [0, -15, 0, -40],
            [-30, -15, -30, -40],
            [-30, 0, -30, 0],
        ],
        [   // turn left
            //LL, LF, RL, RF
            [0, 40, 0, 20],
            [0, 40, 20, 20],
            [0, 0, 20, 0],

            [0, -20, 0, -40],
            [0, -20, -20, -40],
            [0, 0, -20, 0],
        ],
        [   // turn right
            //LL, LF, RL, RF
            [0, -20, 0, -40],
            [-20, -20, 0, -40],
            [-20, 0, 0, 0],

            [0, 40, 0, 20],
            [20, 40, 0, 20],
            [20, 0, 0, 0],
        ],
        [   // moon walk left
            [0, 0, 0, -30],
            [0, 30, 0, -60],
            [0, 60, 0, -30],
            [0, 30, 0, 0],
            [0, 0, 0, 0]
        ],
        [   // moon walk right
            [0, 30, 0, 0],
            [0, 60, 0, -30],
            [0, 30, 0, -60],
            [0, 0, 0, -30],
            [0, 0, 0, 0]
        ],
        [   // shake left
            //LL, LF, RL, RF
            [-40, 60, -40, 30],
            [-40, 30, -40, 30],

            [-10, 30, -40, 30],
            [-40, 30, -40, 30],
            [-10, 30, -40, 30],
            [-40, 30, -40, 30],

            [-40, 60, -40, 30],
            [0, 0, 0, 0],
        ],
        [   // shake right
            //LL, LF, RL, RF
            [40, -30, 40, -60],
            [40, -30, 40, -30],

            [40, -30, 10, -30],
            [40, -30, 40, -30],
            [40, -30, 10, -30],
            [40, -30, 40, -30],

            [40, -30, 40, -60],
            [0, 0, 0, 0],
        ],
        [   // go up and down
            [0, 50, 0, -50],
            [0, 0, 0, 0],
        ],
        [   // swing
            [0, -40, 0, 40],
            [0, 0, 0, 0],
        ],
        [    // walk boldly
            //LL, LF, RL, RF
            [-15, -15, 15, -40],
            [10, -30, 40, -40],
            [10, 0, 40, 0],

            [-15, 40, 15, 15],
            [-40, 40, -10, 30],
            [-40, 0, -10, 0],
        ],
        [    // walk backward boldly
            //LL, LF, RL, RF
            [-15, -15, 15, -40],
            [-40, -30, -10, -40],
            [-40, 0, -10, 0],

            [-15, 40, 15, 15],
            [10, 40, 40, 30],
            [10, 0, 40, 0],
        ],
        [    // walk shyly
            //LL, LF, RL, RF
            [10, -15, -10, -40],
            [25, -30, -5, -40],
            [25, 0, -5, 0],

            [10, 40, -10, 15],
            [5, 40, -25, 30],
            [5, 0, -25, 0],
        ],
        [    // walk backward shyly
            //LL, LF, RL, RF
            [10, -15, -10, -40],
            [5, -30, -25, -40],
            [5, 0, -25, 0],

            [10, 40, -10, 15],
            [25, 40, -5, 30],
            [25, 0, -5, 0],
        ],

        [   // big swing
            [0, -90, 0, 90],
            [0, 0, 0, 0],
        ],
    ]

    export enum action_name {
        walk = 0,
        walk_backward = 1,
        turn_left = 2,
        turn_right = 3,
        moonwalk_left = 4,
        moonwalk_right = 5,
        shake_left = 6,
        shake_right = 7,
        go_up_and_down = 8,
        swing = 9,
        walk_boldly = 10,
        walk_backward_boldly = 11,
        walk_shyly = 12,
        walk_backward_shyly = 13,
        big_swing = 14
    }

    /**
     * Actions.
     */
    //% blockId=kittybot_actions block="%action"
    //% weight=98
    //% advanced=true
    //% action.fieldEditor="gridpicker" action.fieldOptions.columns=2
    export function actions(action: action_name): number {
        return action
    }

    /**
     * Do an action step times in speed.
     * @param step ; eg: 1
     * @param speed ; eg: 50
     */
    //% blockId=kittybot_do_action block="%action=kittybot_actions|%step|step in %speed|\\% speed"
    //% weight=98 blockGap=50
    //% speed.min=1 
    //% speed.max=100
    export function do_action(action: number, step: number = 1, speed: number = 50): void {
        if (speed > 200)
            speed = 200
        if (step < 1)
            step = 1

        for (let i = 0; i < step; i++) {
            for (let data of action_data[action]) {
                servo_rel_speed(transform(data), speed);
            }
        }
    }

    /**
     * Set offset for 4 servos: you can use block "calibrate" on "startup", to get the value to fill in the blank
     */
    //% blockId=kittybot_set_offset block="set offset| Left Leg %o1| Left Foot %o2| Right Leg %o3| Right Foot %o4"
    //% weight=45
    //% o1.min=0 o1.max=180 o1.defl=90 o1.shadow="protractorPicker"
    //% o2.min=0 o2.max=180 o2.defl=90 o2.shadow="protractorPicker"
    //% o3.min=0 o3.max=180 o3.defl=90 o3.shadow="protractorPicker"
    //% o4.min=0 o4.max=180 o4.defl=90 o4.shadow="protractorPicker"
    export function set_offset(o1: number, o2: number, o3: number, o4: number): void {
        offset = [o1, o2, o3, o4]
    }

    /**
       * Stand still: 4 servos turn to 90 degrees
       */
    //% blockId=kittybot_stand_still block="stand still"
    //% weight=100 blockGap=10
    export function stand_still(): void {
        position = [offset[0], offset[1], offset[2], offset[3]];
        move_abs(position);
    }

    export function move(targets: number[]) {
        let newPos = [0, 0, 0, 0]
        for (let i = 0; i < 4; i++) {
            newPos[i] = offset[i] + targets[i]
        }
        move_abs(newPos)
    }

    let position: number[] = []
    let offset: number[] = []
    offset = [90, 90, 90, 90]
    position = [0, 0, 0, 0]

    function move_abs(target: number[]) {
        for (let j = 0; (j < target.length) && (j < 4); j++) {
            if (target[j] > 0) {
                position[j] = target[j]
                robotbit.Servo(j + 1, position[j])
            }
        }
    }
    function move_rel(target: number[]) {
        for (let k = 0; (k < target.length) && (k < 4); k++) {
            position[k] += target[k]
        }
        move_abs(position)
    }

    function servo_rel_speed(target: number[], speed: number) {
        let delta = [0, 0, 0, 0]
        let delta_max = 0
        let beginning = [position[0], position[1], position[2], position[3]]
        let speedFactor = 1

        // speed reduction
        if (speed >= 200) {
            speed = 199
            speedFactor = (speed % 100) / 10
        }

        for (let l = 0; l < delta.length; l++) {
            delta[l] = offset[l] + target[l] - position[l]
            let temp = Math.abs(delta[l])
            if (temp > delta_max)
                delta_max = temp
        }

        if (delta_max <= 0)
            delta_max = 1

        //for (let m = 0; m <= delta_max; m+=speedFactor) {
        let m = 0
        while (true) {
            for (let idx = 0; idx < 4; idx++) {
                position[idx] = Math.round(beginning[idx] + (delta[idx] * m) / delta_max)
                robotbit.Servo(idx + 1, position[idx])
            }
            // finish condition
            if (m >= delta_max)
                break

            //  delay = (100 - speed) * (MAX_us/100)
            let delay = (100 - speed) * 160
            if (delay > 0)
                control.waitMicros(delay)

            m += speedFactor
            if (m > delta_max)
                m = delta_max
        }
    }

    function servo_rel_speed2(target: number[], speed: number) {
        let delta = [0, 0, 0, 0]
        let delta_max = 0
        let beginning = [position[0], position[1], position[2], position[3]]
        //debug_print_arr("target", target)
        //debug_print_arr("beginning", beginning)

        for (let l = 0; l < delta.length; l++) {
            delta[l] = target[l]
            let temp = Math.abs(delta[l])
            if (temp > delta_max)
                delta_max = temp
        }
        if (delta_max <= 0)
            delta_max = 1

        //debug_print_arr("delta", delta)

        for (let m = 0; m <= delta_max; m++) {
            for (let idx = 0; idx < 4; idx++) {
                position[idx] = Math.round(beginning[idx] + (delta[idx] * m) / delta_max)
                robotbit.Servo(idx + 1, position[idx])
            }
            //debug_print_arr("position " + m.toString(), position)
            control.waitMicros((100 - speed) * 10)
        }
    }

    function debug_print_arr(name: string, target: number[]) {
        let msg = name + "=["
        for (let n = 0; n < target.length; n++) {
            msg += (target[n]).toString();
            if (n < (target.length - 1))
                msg += ","
        }
        msg += "]"
        serial.writeLine(msg)
    }

    function transform(target: number[]): number[] {
        return [target[0], target[1], target[2], target[3]]
    }
}
