
export const replaceSizePlaceholders = (str: string, imgWidth = 400, imgHeight = 300) => {
    return str
        .replace('{width}', imgWidth.toString())
        .replace('{height}', imgHeight.toString())
}