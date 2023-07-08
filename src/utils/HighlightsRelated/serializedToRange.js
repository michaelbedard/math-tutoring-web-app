export function serializedToRange (startOffset, endOffset) {
    const range = document.createRange();
    const textNodes = getTextNodes(document.body);

    let currentOffset = 0;
    let startNode, endNode;
    let foundStart = false;
    let foundEnd = false;

    for (const node of textNodes) {
        const nodeLength = node.textContent.length;

        if (!foundStart && startOffset <= currentOffset + nodeLength) {
            range.setStart(node, startOffset - currentOffset);
            startNode = node;
            foundStart = true;
        }

        if (!foundEnd && endOffset <= currentOffset + nodeLength) {
            range.setEnd(node, endOffset - currentOffset);
            endNode = node;
            foundEnd = true;
        }

        currentOffset += nodeLength;

        if (foundStart && foundEnd) {
            break;
        }
    }

    // Normalize the range to handle cases where startNode and endNode are the same
    if (range.collapsed && startNode && endNode && startNode === endNode) {
        range.setEnd(startNode, range.startOffset);
    }

    return range;
};

// Helper function to retrieve text nodes within an element
const getTextNodes = (element) => {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    const textNodes = [];

    let node;
    while ((node = walker.nextNode())) {
        textNodes.push(node);
    }

    return textNodes;
};