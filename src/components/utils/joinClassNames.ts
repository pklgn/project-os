function joinClassNames(classNames: string[]): string {
    const reducer = (previousValue: string, currentValue: string) => `${previousValue} ${currentValue}`

    return classNames.reduce(reducer, '')
}

export {
    joinClassNames,
}