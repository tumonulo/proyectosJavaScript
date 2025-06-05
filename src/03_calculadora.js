import process from 'node:process'
import { evaluate } from 'mathjs'


process.stdout.write('Calculadora\n')
process.stdout.write('Introduce una operación: ')

// Metodo pirata 🏴‍☠️
// process.stdin.once('data', (input) => {
//     process.stdout.write('\n\n Resultado: ' + eval(input.toString().trim()))
//     process.exit(0)
// })

process.stdin.once('data', (input) => {
    try {
        process.stdout.write('\n\n Resultado: ' + evaluate(input.toString().trim()) + '\n')
    } catch (err) {
        process.stdout.write('\n\n Error en la operación\n')
    }
    process.exit(0)
})