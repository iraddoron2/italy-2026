export interface Illustration {
    id: string
    name: string
    src: string
}

export const illustrations: Illustration[] = [
    { id: 'pizza-slice', name: 'Pizza slice', src: '/illustrations/pizza-slice.png' },
    {
        id: 'margherita-pizza',
        name: 'Margherita pizza',
        src: '/illustrations/margherita-pizza.png',
    },
    {
        id: 'parmesan-and-pasta',
        name: 'Parmesan & pasta',
        src: '/illustrations/parmesan-and-pasta.png',
    },
    {
        id: 'spaghetti-bowl',
        name: 'Spaghetti bowl',
        src: '/illustrations/spaghetti-bowl.png',
    },
    { id: 'red-wine', name: 'Red wine', src: '/illustrations/red-wine.png' },
    { id: 'olive-oil', name: 'Olive oil', src: '/illustrations/olive-oil.png' },
    { id: 'lemon', name: 'Lemon', src: '/illustrations/lemon.png' },
    { id: 'gelato-cone', name: 'Gelato cone', src: '/illustrations/gelato-cone.png' },
    {
        id: 'espresso-moka',
        name: 'Espresso & moka',
        src: '/illustrations/espresso-moka.png',
    },
    {
        id: 'tomatoes-and-basil',
        name: 'Tomatoes & basil',
        src: '/illustrations/tomatoes-and-basil.png',
    },
    { id: 'colosseum', name: 'Colosseum', src: '/illustrations/colosseum.png' },
    {
        id: 'leaning-tower-of-pisa',
        name: 'Leaning Tower of Pisa',
        src: '/illustrations/leaning-tower-of-pisa.png',
    },
    {
        id: 'venice-gondola',
        name: 'Venice gondola',
        src: '/illustrations/venice-gondola.png',
    },
    {
        id: 'florence-duomo',
        name: 'Florence Duomo',
        src: '/illustrations/florence-duomo.png',
    },
    {
        id: 'corinthian-capital',
        name: 'Corinthian capital',
        src: '/illustrations/corinthian-capital.png',
    },
    { id: 'david-bust', name: 'David bust', src: '/illustrations/david-bust.png' },
    {
        id: 'amalfi-coast',
        name: 'Amalfi Coast',
        src: '/illustrations/amalfi-coast.png',
    },
    {
        id: 'umbrella-pines',
        name: 'Umbrella pines',
        src: '/illustrations/umbrella-pines.png',
    },
    {
        id: 'vespa-scooter',
        name: 'Vespa scooter',
        src: '/illustrations/vespa-scooter.png',
    },
    { id: 'italy-flag', name: 'Italy flag', src: '/illustrations/italy-flag.png' },
]

export function getIllustration(id: string): Illustration | undefined {
    return illustrations.find((item) => item.id === id)
}
