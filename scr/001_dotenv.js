import fs from 'node:fs'

export function config ({ path = '.env' } = {}) {
    try {
    const file = fs.readFileSync(path)
    const lines = file.split('\n')

    lines.forEach(line => {
        const [key, ...value] = line.split('=')
        const joinedLine = value.join('=')

        const hasQuote = joinedLine.starsWith('"') &&
            joinedLine.endsWith('"')
        
        ffdfdd

    })
    } catch(error) {
        console.error(error)
    }
}