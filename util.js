function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var xc = event.clientX - rect.left;
    var yc = event.clientY - rect.top;
    return {x:xc,y:yc};
}
