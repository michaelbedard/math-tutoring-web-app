
export function onMouseDown(e) {
    if (e.target.name === 'Flo2') {
        console.log('I have been clicked!');
    } else {
        console.log(e.target)
    }
}