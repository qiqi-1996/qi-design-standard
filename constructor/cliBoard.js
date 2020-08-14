const BOARD_CORNER_TOP_LEFT = "┏";
const BOARD_CORNER_TOP_RIGHT = "┓";
const BOARD_CORNER_BOTTOM_LEFT = "┗";
const BOARD_CORNER_BOTTOM_RIGHT = "┛";
const BOARD_EDGE_HORIZONTAL = "━";
const BOARD_EDGE_VERTICAL = "┃";

function repeat(char, times = 0) {
    if (times <= 0) {
        return "";
    }
    return Array(times + 1).join(char);
}

function transformLine(content, width, padding) {
    return BOARD_EDGE_VERTICAL + repeat(" ", padding) + content + repeat(" ", padding + (width - content.length - 2 - 2*padding)) + BOARD_EDGE_VERTICAL;
}

export default function (message, padding = 2) {
    var width = 0, height = 0;
    message = message.split("\n");
    message.forEach(line => {
        width = Math.max(line.length + 2 * padding + 2, width);
    })
    height = message.length + padding;

    message.forEach((line, index, arr) => {
        if (index == 0 || index == arr.length - 1) {
            if (index == 0) {
                console.log(BOARD_CORNER_TOP_LEFT + repeat(BOARD_EDGE_HORIZONTAL, width - 2) + BOARD_CORNER_TOP_RIGHT);

                for (let i = 0; i < Math.floor(padding/2); i++){
                    console.log(BOARD_EDGE_VERTICAL + repeat(" ", width - 2) + BOARD_EDGE_VERTICAL);
                }
            }

            console.log(transformLine(line, width, padding));
            
            if (index == arr.length - 1) {
                for (let i = 0; i < Math.floor(padding/2); i++){
                    console.log(BOARD_EDGE_VERTICAL + repeat(" ", width - 2) + BOARD_EDGE_VERTICAL);
                }
                
                console.log(BOARD_CORNER_BOTTOM_LEFT + repeat(BOARD_EDGE_HORIZONTAL, width - 2) + BOARD_CORNER_BOTTOM_RIGHT);
            }
        } else {
            console.log(transformLine(line, width, padding));
        }
    })
}