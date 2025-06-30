export const formatPrice = (price: number) => {
    try {
        return price.toLocaleString('cs-CZ')
    } catch (error) {
        return price
    }
}