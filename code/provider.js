async function scheduleHtmlProvider(dom = document) {
    //定时器和ifarme对象
    let Timer, iframeElement
    return new Promise((resolve, reject) => {
        iframeElement = dom.querySelector("#WindowFrame2")
        if (iframeElement) {
            resolve()
        } else {
            Timer = setTimeout(() => {
                reject()
            }, 1000)
        }
    })
        .then(() => {
            return iframeElement.contentWindow.document.querySelector("#table3>tbody").outerHTML
        })
        .catch(() => {
            clearTimeout(Timer)
            return scheduleHtmlProvider()
        })
}
