type Value = boolean | string | undefined

function withMods(className: string, mods: {[key: string]: Value}): string {
    const modsList: string[] = Object.keys(mods).map(key => {
        const value = mods[key]
        if (typeof value === undefined) {
            return ''
        }

        return typeof value === 'boolean'
            ? value ? `${className}_${key}`: ''
            : `${className}_${key}_${value}`
    })

    return [
        className,
        ...modsList
    ].join(' ')
}

export {
    withMods
}