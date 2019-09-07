import { Converter } from './converter';
import inquirer, { QuestionCollection } from "inquirer"

var questions: QuestionCollection = [{
    type: 'input',
    name: 'song',
    message: "Song to convert:",
},
{
    type: 'input',
    name: 'scale',
    message: "Scale:",
    default: 5,
    validate: (input) => parseInt(input) > 0 && parseInt(input) < 9,
    transformer: (input) => {
        const scale = parseInt(input)
        if (isNaN(scale)) {
            return "Major: 5"
        }
        let str = ""
        switch (scale) {
            case 1:
                str = "Pentatonic Minor"
                break;
            case 2:
                str = "Pentatonic Major"
                break;
            case 3:
                str = "Chromatic"
                break;
            case 4:
                str = "Hexatonic"
                break;
            case 5:
                str = "Major"
                break;
            case 6:
                str = "Minor"
                break;
            case 7:
                str = "Hirajoshi"
                break;
            case 8:
                str = "Phrygian"
                break;
            default:
                str = "Not a valid Scale"
                break;
        }
        return str + ": " + scale
    }
},
{
    type: 'input',
    name: 'speed',
    message: "Speed:",
    default: 3,
    validate: (input) => parseInt(input) > 0 && parseInt(input) < 50
}]

inquirer.prompt(questions).then(answers => {
    console.log(new Converter(answers['song'] + "", parseInt(answers['scale'] + ""), parseInt(answers['speed'] + "")).sharable)
})