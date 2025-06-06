import process from 'node:process'

const frases = [
  "La práctica hace al maestro.",
  "El zorro marrón rápido salta sobre el perro perezoso.",
  "¿Cuánto cuesta este café con leche?",
  "Hola, mundo. Bienvenido a JavaScript.",
  "¡Qué día tan maravilloso para programar!",
  "Los teclados mecánicos hacen clics muy satisfactorios.",
  "function saludar(nombre) { return `Hola, ${nombre}`; }",
  "La lluvia en Sevilla es una maravilla.",
  "1234567890 son los números del teclado.",
  "¿Sabías que la tilde también se llama acento ortográfico?",
  "Nunca pares de aprender cosas nuevas.",
  "let velocidad = 120; // en kilómetros por hora",
  "console.log('Escribe esta línea sin errores');",
  "La ñ es una letra muy especial en español.",
  "if (teGustaProgramar) { siguePracticando(); }",
  "Mientras más practiques, más rápido escribirás.",
  "¿Puedes escribir esto sin mirar el teclado?",
  "¡Vamos, tú puedes lograrlo!",
  "Aprender a escribir bien es muy útil.",
  "return 'Gracias por practicar mecanografía';"
]

function getFraseAleatoria() {
  return frases[Math.floor(Math.random() * frases.length)]
}

function calcularPrecision(original, entrada) {
  let correctos = 0
  const len = Math.min(original.length, entrada.length)
  for (let i = 0; i < len; i++) {
    if (original[i] === entrada[i]) correctos++
  }
  return ((correctos / original.length) * 100).toFixed(2)
}

function iniciarPrueba() {
    const frase = frases[Math.floor(Math.random() * frases.length)]
  
    console.log('\nEscribe la siguiente frase lo más rápido posible y presiona ENTER cuando termines:')
    console.log('> ' + frase + '\n')
  
    process.stdin.setRawMode(true)
    process.stdin.setEncoding('utf-8')
  
    let entrada = ''
    let startTime = null
  
    process.stdin.on('data', (key) => {
        
      if (key === '\u0003') {
        console.log('\nSaliendo...')
        process.exit()
      }
  
      if (key === '\r') {
        const endTime = Date.now()
        process.stdin.setRawMode(false)
        process.stdin.pause()
  
        const tiempo = ((endTime - startTime) / 1000).toFixed(2)
        const precision = calcularPrecision(frase, entrada)
  
        console.log('\nResultado:')
        console.log('-----------')
        console.log(`Frase original:   "${frase}"`)
        console.log(`Tu respuesta:     "${entrada}"`)
        console.log(`Tiempo:           ${tiempo} segundos`)
        console.log(`Precisión:        ${precision}%\n`)
        process.exit(0)
      }
  
      if (!startTime) {
        startTime = Date.now()
      }
  
      process.stdout.write(key)
      entrada += key
    })
  }
  
iniciarPrueba()