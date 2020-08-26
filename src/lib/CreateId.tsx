let id = parseInt(window.localStorage.getItem('MaxId') || '0')
const createId = () => {
    id += 1
    window.localStorage.setItem('MaxId', id.toString())
    return id
}

export default createId