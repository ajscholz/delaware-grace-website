// helper to format series dates -- s = startMo, e = endMo, y = year
export default (s, e, y) => `${s === e ? s : `${s} - ${e}`} ${y}`
