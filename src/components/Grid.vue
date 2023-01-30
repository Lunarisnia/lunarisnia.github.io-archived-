<template>
    <v-container>
        <v-container v-if="debug">
            <v-btn @click="separateVisualization()">Separate Visualization</v-btn>
            <v-btn @click="resetAllCard()">Reset All Card</v-btn>
            <v-btn @click="closeHalfCard()">Close Half Card</v-btn>
            <v-btn @click="openAllCard()">Open All Card</v-btn>
            <h1 style="color: white">Instruction:</h1>
            <h2 style="color: white">{{ instruction }}</h2>
            <h3 style="color: white">Countdown: {{ counter }}</h3>
        </v-container>
        <v-responsive class="d-flex align-center fill-height">
            <v-row align='center' no-gutters :style="gridHeight" v-for="i in row" :key="i">
                <v-col v-for="j in col" :key="j" class="child-flex">
                    <p v-if="debug" style="color: white">{{ i - 1}}, {{ j - 1}} : {{ grid[i - 1][j - 1].class }}</p>
                    <v-img class="mx-auto" :src='grid[i - 1][j - 1].status ? grid[i - 1][j - 1].item : removedCard'
                        :width="gridWidth" @click="debug ? removeACard(i - 1, j - 1) : null" />
                </v-col>
            </v-row>
        </v-responsive>
        <v-container class="d-flex flex-column fill-height justify-center align-center text-white">
            <h1 style="color: white">{{ instruction }}</h1>
            <h3>PETUNJUK SELANJUTNYA DALAM: {{ counter }}</h3>
        </v-container>
    </v-container>
</template>

<script lang="ts">
interface GameloopData {
    choosenScenario: Array<Scenario>,
    step: number
}
interface Coordinates {
    row: number,
    col: number
}
interface Card {
    class: string,
    status: number,
    item?: string,
}
interface Scenario {
    movementSuggestion: NumberState,
    cardToRemove: Array<Coordinates>,
    currentClass: string,
    nextClass: string
}
enum Phase {
    START,
    COUNTDOWN,
    INSTRUCT,
    TAKEOUT,
    DONE
}
enum NumberState {
    ODD,
    EVEN
}
const defaultCardSetA: string = "https://deckofcardsapi.com/static/img/KS.png";
const defaultCardSetB: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Playing_card_heart_A.svg/819px-Playing_card_heart_A.svg.png";
const cardImageList: Array<string> = [
    "https://deckofcardsapi.com/static/img/AH.png",
    "https://deckofcardsapi.com/static/img/2H.png",
    "https://deckofcardsapi.com/static/img/3H.png",
    "https://deckofcardsapi.com/static/img/4H.png",
    "https://deckofcardsapi.com/static/img/5H.png",
    "https://deckofcardsapi.com/static/img/6H.png",
    "https://deckofcardsapi.com/static/img/7H.png",
    "https://deckofcardsapi.com/static/img/8H.png",
    "https://deckofcardsapi.com/static/img/9H.png",
    "https://deckofcardsapi.com/static/img/0H.png",
    "https://deckofcardsapi.com/static/img/JH.png",
    "https://deckofcardsapi.com/static/img/QH.png",
    "https://deckofcardsapi.com/static/img/KH.png",

    "https://deckofcardsapi.com/static/img/AD.png",
    "https://deckofcardsapi.com/static/img/2D.png",
    "https://deckofcardsapi.com/static/img/3D.png",
    "https://deckofcardsapi.com/static/img/4D.png",
    "https://deckofcardsapi.com/static/img/5D.png",
    "https://deckofcardsapi.com/static/img/6D.png",
    "https://deckofcardsapi.com/static/img/7D.png",
    "https://deckofcardsapi.com/static/img/8D.png",
    "https://deckofcardsapi.com/static/img/9D.png",
    "https://deckofcardsapi.com/static/img/0D.png",
    "https://deckofcardsapi.com/static/img/JD.png",
    "https://deckofcardsapi.com/static/img/QD.png",
    "https://deckofcardsapi.com/static/img/KD.png",

    "https://deckofcardsapi.com/static/img/AS.png",
    "https://deckofcardsapi.com/static/img/2S.png",
    "https://deckofcardsapi.com/static/img/3S.png",
    "https://deckofcardsapi.com/static/img/4S.png",
    "https://deckofcardsapi.com/static/img/5S.png",
    "https://deckofcardsapi.com/static/img/6S.png",
    "https://deckofcardsapi.com/static/img/7S.png",
    "https://deckofcardsapi.com/static/img/8S.png",
    "https://deckofcardsapi.com/static/img/9S.png",
    "https://deckofcardsapi.com/static/img/0S.png",
    "https://deckofcardsapi.com/static/img/JS.png",
    "https://deckofcardsapi.com/static/img/QS.png",
    "https://deckofcardsapi.com/static/img/KS.png",

    "https://deckofcardsapi.com/static/img/AC.png",
    "https://deckofcardsapi.com/static/img/2C.png",
    "https://deckofcardsapi.com/static/img/3C.png",
    "https://deckofcardsapi.com/static/img/4C.png",
    "https://deckofcardsapi.com/static/img/5C.png",
    "https://deckofcardsapi.com/static/img/6C.png",
    "https://deckofcardsapi.com/static/img/7C.png",
    "https://deckofcardsapi.com/static/img/8C.png",
    "https://deckofcardsapi.com/static/img/9C.png",
    "https://deckofcardsapi.com/static/img/0C.png",
    "https://deckofcardsapi.com/static/img/JC.png",
    "https://deckofcardsapi.com/static/img/QC.png",
    "https://deckofcardsapi.com/static/img/KC.png",
];
const shuffleArray = (array: Array<any>) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
export default {
    props: {
        col: Number,
        row: Number,
        debug: Boolean
    },
    setup(props) {
        props.col // type: number | undefined
        props.row // type: number | undefined
    },
    data() {
        return {
            phase: Phase.START,
            phaseCountdown: 15,
            takeoutPhaseCountdown: 5,
            grid: [
                [{ class: "A", item: defaultCardSetA, status: 1 }, { class: "B", item: defaultCardSetB, status: 1 }, { class: "A", item: defaultCardSetA, status: 1 }, { class: "B", item: defaultCardSetB, status: 1 }, { class: "A", item: defaultCardSetA, status: 1 }],
                [{ class: "B", item: defaultCardSetB, status: 1 }, { class: "A", item: defaultCardSetA, status: 1 }, { class: "B", item: defaultCardSetB, status: 1 }, { class: "A", item: defaultCardSetA, status: 1 }, { class: "B", item: defaultCardSetB, status: 1 }],
                [{ class: "A", item: defaultCardSetA, status: 1 }, { class: "B", item: defaultCardSetB, status: 1 }, { class: "A", item: defaultCardSetA, status: 1 }, { class: "B", item: defaultCardSetB, status: 1 }, { class: "A", item: defaultCardSetA, status: 1 }],
                [{ class: "B", item: defaultCardSetB, status: 1 }, { class: "A", item: defaultCardSetA, status: 1 }, { class: "B", item: defaultCardSetB, status: 1 }, { class: "A", item: defaultCardSetA, status: 1 }, { class: "B", item: defaultCardSetB, status: 1 }]
            ] as Array<Array<Card>>,
            scenarios: [
                [
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 2,
                                col: 0,
                            },
                            {
                                row: 3,
                                col: 3,
                            },
                            {
                                row: 0,
                                col: 2,
                            },
                            {
                                row: 0,
                                col: 4,
                            },
                        ],
                        currentClass: "A",
                        nextClass: "B",
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 1,
                                col: 0,
                            },
                            {
                                row: 3,
                                col: 2,
                            },
                            {
                                row: 3,
                                col: 4,
                            },
                            {
                                row: 1,
                                col: 4,
                            },
                            {
                                row: 0,
                                col: 3,
                            },
                            {
                                row: 3,
                                col: 0,
                            },
                        ],
                        currentClass: "B",
                        nextClass: "A",
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 0,
                                col: 0,
                            },
                            {
                                row: 3,
                                col: 1,
                            },
                            {
                                row: 2,
                                col: 4,
                            },
                            {
                                row: 1,
                                col: 3,
                            },
                        ],
                        currentClass: "A",
                        nextClass: "B",
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 0,
                                col: 1,
                            },
                            {
                                row: 1,
                                col: 2,
                            },
                            {
                                row: 2,
                                col: 3,
                            },
                        ],
                        currentClass: "B",
                        nextClass: "A",
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 1,
                                col: 1,
                            },
                            {
                                row: 2,
                                col: 2,
                            },
                        ],
                        currentClass: "A",
                        nextClass: "B",
                    },
                ],
                [
                    {
                        movementSuggestion: NumberState.EVEN,
                        cardToRemove: [
                            {
                                row: 0,
                                col: 1,
                            },
                            {
                                row: 2,
                                col: 1,
                            },
                            {
                                row: 3,
                                col: 0,
                            },
                            {
                                row: 1,
                                col: 4,
                            },
                            {
                                row: 3,
                                col: 4,
                            },
                        ],
                        currentClass: "A",
                        nextClass: "A",
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 0,
                                col: 0,
                            },
                            {
                                row: 2,
                                col: 0,
                            },
                            {
                                row: 3,
                                col: 1,
                            },
                            {
                                row: 3,
                                col: 3,
                            },
                            {
                                row: 2,
                                col: 4,
                            },
                            {
                                row: 0,
                                col: 4,
                            },
                        ],
                        currentClass: "A",
                        nextClass: "B",
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 1,
                                col: 0,
                            },
                            {
                                row: 3,
                                col: 2,
                            },
                            {
                                row: 2,
                                col: 3,
                            },
                            {
                                row: 0,
                                col: 3,
                            },
                        ],
                        currentClass: "B",
                        nextClass: "A",
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 0,
                                col: 2,
                            },
                            {
                                row: 1,
                                col: 1,
                            },
                            {
                                row: 2,
                                col: 2,
                            },
                            {
                                row: 1,
                                col: 3,
                            },
                        ],
                        currentClass: "B",
                        nextClass: "A",
                    },
                ],
                [
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 0,
                                col: 0,
                            },
                            {
                                row: 0,
                                col: 2,
                            },
                            {
                                row: 2,
                                col: 0,
                            },
                            {
                                row: 2,
                                col: 2,
                            },
                        ],
                        currentClass: "A",
                        nextClass: "B",
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 1,
                                col: 0,
                            },
                            {
                                row: 3,
                                col: 0,
                            },
                            {
                                row: 3,
                                col: 4,
                            },
                            {
                                row: 0,
                                col: 1,
                            },
                            {
                                row: 0,
                                col: 3
                            },
                            {
                                row: 3,
                                col: 2
                            }
                        ],
                        currentClass: "B",
                        nextClass: "A",
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 3,
                                col: 1,
                            },
                            {
                                row: 3,
                                col: 3,
                            },
                            {
                                row: 2,
                                col: 4,
                            },
                            {
                                row: 0,
                                col: 4
                            }
                        ],
                        currentClass: "A",
                        nextClass: "B",
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 2,
                                col: 3,
                            },
                            {
                                row: 1,
                                col: 4,
                            }
                        ],
                        currentClass: "B",
                        nextClass: "A",
                    },
                    {
                        movementSuggestion: NumberState.EVEN,
                        cardToRemove: [
                            {
                                row: 2,
                                col: 1,
                            },
                        ],
                        currentClass: "A",
                        nextClass: "A",
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 1,
                                col: 1,
                            },
                            {
                                row: 1,
                                col: 3,
                            },
                        ],
                        currentClass: "A",
                        nextClass: "B",
                    },
                ],
                


                // CLASS B START
                [
                    {
                        movementSuggestion: NumberState.EVEN,
                        cardToRemove: [
                            {
                                row: 0,
                                col: 0
                            },
                            {
                                row: 2,
                                col: 0
                            },
                            {
                                row: 0,
                                col: 2
                            },
                            {
                                row: 2,
                                col: 2
                            },
                            {
                                row: 0,
                                col: 4
                            },
                            {
                                row: 2,
                                col: 4
                            },
                        ],
                        currentClass: "B",
                        nextClass: "B"
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 3,
                                col: 0
                            },
                            {
                                row: 3,
                                col: 2
                            },
                            {
                                row: 3,
                                col: 4
                            },
                            {
                                row: 0,
                                col: 3
                            },
                            {
                                row: 1,
                                col: 4
                            },
                            {
                                row: 0,
                                col: 1
                            },
                        ],
                        currentClass: "B",
                        nextClass: "A"
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 3,
                                col: 1
                            },
                            {
                                row: 3,
                                col: 3
                            }
                        ],
                        currentClass: "A",
                        nextClass: "B"
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 2,
                                col: 3
                            }
                        ],
                        currentClass: "B",
                        nextClass: "A"
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 1,
                                col: 3
                            }
                        ],
                        currentClass: "A",
                        nextClass: "B"
                    },
                    {
                        movementSuggestion: NumberState.ODD,
                        cardToRemove: [
                            {
                                row: 1,
                                col: 2
                            },
                            {
                                row: 2,
                                col: 1
                            },
                            {
                                row: 1,
                                col: 0
                            }
                        ],
                        currentClass: "B",
                        nextClass: "A"
                    },
                ]
            ] as Array<Array<Scenario>>,
            removedCard: "https://cutewallpaper.org/24/playing-card-back-png/colorful-38b1d-poker-3f9cb-card-65195-back-f3490-opengameartorg.png",
            currentClass: "",
            instruction: "PILIH SALAH SATU KARTU YANG TERBUKA DENGAN JARI MU.",
            numberOfStep: 0,
            counter: 0
        };
    },
    computed: {
        gridWidth(): string {
            switch (this.$vuetify.display.name) {
                case 'xs': return "50px"; 
                case 'sm': return "135px";
                case 'md': return "170px";
                case 'lg': return "100px";
                case 'xl': return "100px";
                default: return "275px"
            }
        },
        gridHeight(): string {
            switch (this.$vuetify.display.name) {
                case 'xs': return "height: 100px"; 
                case 'sm': return "height: 225px";
                case 'md': return "height: 275px";
                case 'lg': return "height: 175px";
                case 'xl': return "height: 175px";
                default: return "height: 400px"
            }
        }
    },
    async mounted() {
        await this.startPhase();
    },
    methods: {
        async gameloop(data: GameloopData) {
            switch (this.phase) {
                case Phase.START:
                    await this.startPhase();
                    break;
                case Phase.INSTRUCT:
                    await this.instructPhase(data);
                    break;
                case Phase.COUNTDOWN:
                    await this.countdownPhase(data);
                    break;
                case Phase.TAKEOUT:
                    await this.takeoutPhase(data);
                    break;
                default:
                    await this.endPhase();
                    break;
            }
        },
        async startPhase() {
            this.resetAllCard();
            this.currentClass = this.closeHalfCard();
            await this.countdown(this.phaseCountdown);
            this.openAllCard();
            this.phase = Phase.INSTRUCT;
            const choosenScenario: Array<Scenario> = this.chooseScenario(this.scenarios);
            this.numberOfStep = choosenScenario.length;
            await this.gameloop({ choosenScenario: choosenScenario, step: 0 });
        },
        async instructPhase(data: GameloopData) {
            this.instruction = `Pilih salah satu angka: ${this.randomMovementNumber(data.choosenScenario[data.step].movementSuggestion)}`;
            this.phase = Phase.COUNTDOWN;
            this.gameloop(data);
        },
        async countdownPhase(data: GameloopData) {
            await this.countdown(this.phaseCountdown);
            this.instruction = "GERAK SESUAI DENGAN ANGKA YANG TELAH DIPILIH!";
            await this.countdown(this.phaseCountdown);
            this.phase = Phase.TAKEOUT;
            this.gameloop(data)
        },
        async takeoutPhase(data: GameloopData) {
            for (const coordinate of data.choosenScenario[data.step].cardToRemove) {
                this.removeACard(coordinate.row, coordinate.col);
            }
            data.step += 1;
            if (this.numberOfStep === data.step) {
                this.phase = Phase.DONE;
                this.gameloop(data);
            } else {
                this.instruction = "ANDA PASTI TIDAK ADA DI KARTU-KARTU INI"
                await this.countdown(this.takeoutPhaseCountdown);
                this.phase = Phase.INSTRUCT;
                this.gameloop(data);
            }
        },
        async endPhase() {
            this.instruction = "PIKIRAN ANDA TELAH SAYA KENDALIKAN DAN ANDA TERTANGKAP";
        },
        async countdown(duration: number) {
            duration = Math.round(duration);
            const ms = 1000;

            this.counter = duration;
            for(let i = 0; i < duration; i++) {
                await this.sleep(ms);
                this.counter -= 1;
            }
        },
        sleep(ms: number): Promise<void> {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        randomChoice(nChoice: number): number {
            return Math.floor(Math.random() * nChoice);
        },
        removeACard(row: number, col: number) {
            this.grid[row][col].status = 0;
        },
        separateVisualization() {
            this.grid = this.grid.map((row: Array<Card>) => {
                return row.map((col: Card) => ({ ...col, item: col.class === 'A' ? defaultCardSetA : defaultCardSetB }))
            })
        },
        resetAllCard() {
            const cil: Array<string> = shuffleArray(cardImageList.concat());
            this.grid = this.grid.map((row: Array<Card>) => {
                return row.map((col: Card) => ({ ...col, item: cil.pop() }))
            });
        },
        closeAllCard() {
            this.grid = this.grid.map((row: Array<Card>) => {
                return row.map((col: Card) => ({ ...col, status: 0 }))
            });
        },
        closeHalfCard() {
            /**
             * Return the Class that is open
             */
            const openClass: string = ["A", "A"][this.randomChoice(2)];
            this.grid = this.grid.map((row: Array<Card>) => {
                return row.map((col: Card) => col.class === openClass ? col : ({ ...col, status: 0 }));
            });
            return openClass;
        },
        openAllCard() {
            this.grid = this.grid.map((row: Array<Card>) => {
                return row.map((col: Card) => col.status ? col : ({ ...col, status: 1 }));
            });
        },
        randomMovementNumber(movementSuggestion: NumberState): Array<number> {
            const numbers : Array<number> = Array.from(Array(19), (_, x) => x + 1);
            const evenNumber = shuffleArray(numbers.filter(x => x % 2 === 0)).slice(0, 3);
            const oddNumber = shuffleArray(numbers.filter(x => x % 2 !== 0)).slice(0, 3);
            if (movementSuggestion === NumberState.EVEN) return evenNumber;
            return oddNumber;
        },
        chooseScenario(scenarios: Array<Array<Scenario>>): Array<Scenario> {
            const availableScenarios = scenarios.filter(scenario => scenario[0].currentClass == this.currentClass);
            return availableScenarios[this.randomChoice(availableScenarios.length)];
        }
    }
}
</script>