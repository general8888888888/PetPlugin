// 在background.js中注册右键菜单
chrome.runtime.onInstalled.addListener(function() {
    // 创建右键菜单
    chrome.contextMenus.create({
        id: "PetPlugin",
        title: "PetPlugin",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        id: "Switch",
        title: "PetPlugin开/关",
        parentId: "PetPlugin",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        id: "Setting",
        title: "更多详情",
        parentId: "PetPlugin",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        id: "ChatPet",
        title: "ChatPet",
        parentId: "PetPlugin",
        contexts: ["all"]
    });
});

// 监听右键菜单点击事件
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "ChatPet") {
        window.open('http://www.chatpet.top')
    }else if(info.menuItemId==="Setting"){
        window.open(chrome.runtime.getURL("options.html"));
    }else if(info.menuItemId==="Switch"){
        chrome.storage.sync.get('showType', (result) => {
            if(result.showType){
                chrome.storage.sync.set({ 'showType': false });
            }else{
                chrome.storage.sync.set({ 'showType': true });
            }
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                var activeTab = tabs[0];
                //在这里可以对当前激活的标签页进行操作
                chrome.tabs.reload(activeTab.id);
            });
        });
    }
});
