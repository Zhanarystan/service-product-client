
export function formatDate(date: Date | null | undefined): string {
    const dateArray = ("" + date).split('T')[0].split('-') 
    return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`
}

export function formatDate1(date: Date | null | undefined): string {
    return ("" + date).split('T')[0] 
}