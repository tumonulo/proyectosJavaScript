import fs from 'node:fs'

export function config ({ path = '.env' } = {}) {
    try {
    const file = fs.readFileSync(path, 'utf-8')
    const lines = file.split('\n')

    lines.forEach(line => {
        const [key, ...rest] = line.split('=')
        const joinedRest = rest.join('=')

        const hasQuote = joinedRest.startsWith('"') && joinedRest.endsWith('"')
        
        const value = hasQuote ? joinedRest.slice(1, -1) : joinedRest

        process.env[key.trim()] = value.trim()
    })
    } catch(error) {
        console.error(error)
    }
}

// Uso de ejemplo de la función config

// import { config } from './01_dotenv.js'

// config()

// console.log(process.env.PORT)