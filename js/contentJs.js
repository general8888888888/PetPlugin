
//创建页面函数
function createPage () {
    chrome.storage.sync.get(['showType','colorType'], (result) => {
        const colorValue=result.colorType;
        if(result.showType){
            const page = $('<div id="cj_move_page"></div>')
            document.documentElement.style.setProperty('--color-type', colorValue)
            const h3 = $('<div id="cj_move_h3"><div style="width: 85%;height: 100%;"><span style="font-size: 20px;font-weight: bold">Pet Plugin</span></div>' +
                '</div>')
            page.append(h3)
            const app = document.createElement("iframe");
            app.src = chrome.runtime.getURL("main.html");
            app.id="cj_move_item";
            $('body').append(page)
            $('#cj_move_page').append(app);
            drag(cj_move_h3)
        }
    });
}
createPage()

//拖拽
function drag(ele) {
    let oldX, oldY, newX, newY
    cj_move_page.style.right = localStorage.getItem('pluginX')?localStorage.getItem('pluginX'):0;
    cj_move_page.style.bottom = localStorage.getItem('pluginY')?localStorage.getItem('pluginY'):0;
    ele.onmousedown = function (e) {
        oldX = e.clientX
        oldY = e.clientY
        document.onmousemove = function (e) {
            newX = e.clientX
            newY = e.clientY
            cj_move_page.style.right = parseInt(cj_move_page.style.right) - newX + oldX + 'px'
            cj_move_page.style.bottom = parseInt(cj_move_page.style.bottom) - newY + oldY + 'px'
            oldX = newX
            oldY = newY
            localStorage.setItem('pluginX',cj_move_page.style.right);
            localStorage.setItem('pluginY',cj_move_page.style.bottom);
        }
        document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
        }
    }
}
