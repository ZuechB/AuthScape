export const storeWithExpiry = () => {

    return {
        set: (key, value, ttl) => {

            const now = new Date()
            const item = {
                value: value,
                expiry: now.getTime() + ttl,
            }
            localStorage.setItem(key, JSON.stringify(item))
        },
        get: (key) => {

            const itemStr = localStorage.getItem(key)
            if (!itemStr) {
                return null
            }
            const item = JSON.parse(itemStr)
            const now = new Date()
            if (now.getTime() > item.expiry) {
                localStorage.removeItem(key)
                return null
            }
            return item.value
        }
    }
}