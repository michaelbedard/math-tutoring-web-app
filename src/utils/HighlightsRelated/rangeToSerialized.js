
export function rangeToSerialized (range) {
    const clonedRange = range.cloneRange();
    clonedRange.selectNodeContents(document.body);
    clonedRange.setEnd(range.startContainer, range.startOffset);
    const startOffset = clonedRange.toString().length;
    const endOffset = startOffset + range.toString().length;

    console.log(startOffset + "-" + endOffset)

    return [startOffset, endOffset]
};