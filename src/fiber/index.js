//实现render function 转化为 vdom   schedule reconcile commit
//requestIdleCallback就是利用每一帧的空闲时间执行回调
// schedule需要做的事就是将所有vdom转化为fiber
// 所以我们需要记录两个全局变量，一个是当前处理到的fiber节点和fiber根节点
let nextFiberRenconcileWork = null;
let wipRoot = null;

function render(element,container){
    wipRoot = {
        dom: container,
        props: {
            children:[element],
        }
    }
    nextFiberRenconcileWork = wipRoot;
    //下一个处理的fiber节点指向，下次schedule就会调度这个fiber节点，开始reconcile
}
function createDom(fiber){
    //根据类型创建元素
    const dom = fiber.type == 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(fiber.type);

    function isEventListenerAttr(key, value){
        return typeof value == 'function' && key.startsWith('on');
    }

    function isStyleAttr(key, value){
        return key == 'style' && typeof value == 'object';
    }

    function isPlainAttr(key, value){
        return typeof value != 'object' && typeof value != 'function';
    }

    const setAttribute = (dom, key , value) => {
        if(key === 'children'){
            return;
        }

        if(key === 'nodeValue'){
            dom.textContent = value;
        }else if(isEventListenerAttr(key, value)){
            const eventType = key.slice(2).toLowerCase();
            dom.addEventListener(eventType,value);
        }else if(isStyleAttr(key, value)){
            Object.assign(dom.style, value);
        }else if(isPlainAttr(key, value)){
            dom.setAttribute(key, value);
        }
    }

    for(const prop in fiber.props){
        setAttribute(dom, prop, fiber.props.prop)
    }
    return dom;
}

function reconcileChildren(wipFiber, elements){
    let index = 0;
    let preSibling = null;
    while(index < elements.length){
        const element = elements[index];
        let newFiber = {
            type: element.type,
            props: element.props,
            dom: null,
            return: wipFiber,
            effectTag: "PLACEMENT",
        }
        if(index === 0){
            wipFiber.children = newFiber;
        }else{
            preSibling.sibling = newFiber;
        }
        preSibling = newFiber;
        index++;
    }
}

//reconcile做两件事：1.提前创建对应的dom节点，一个是做diff，确定是增，删，改
function reconcile(fiber){
    if(!fiber.dom){
        fiber.dom = createDom(fiber);
    }
    reconcileChildren(fiber,fiber.props.children);
}

function performNextWork(fiber){
    reconcile(fiber);
    if(fiber.child){
        return fiber.child;
    }
    let nextFiber = fiber;
    while(nextFiber){
        if(nextFiber.sibling){
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.return;
    }
}

function commitWork(fiber){
    if(!fiber) return;
    let domParentFiber = fiber.return;
    while(!domParentFiber.dom){
        domParentFiber = domParentFiber.return;
    }
    const domParent = domParentFiber.dom;

    if(fiber.dom != null && fiber.effectTag === 'PLACEMENT'){
        domParent.appendChild(fiber.dom);
    }
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

function commitRoot(){
    commitWork(wipRoot.child);
    wipRoot = null;
}

function workLoop(deadline){
    //将vdom转化为fiber
    let shouldYield = false;
    while(nextFiberRenconcileWork && !shouldYield){
        nextFiberRenconcileWork = performNextWork(
            nextFiberRenconcileWork
        )
        shouldYield = deadline.timeRemaining() < 1;
    }

    if(!nextFiberRenconcileWork){
        commitRoot();
    }

    requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

const promise1 = new Promise((re,rj) => {
    console.log('pro1');
    re('reso1')
})
const promise2 = promise1.then(res => {
    console.log(res);
})
console.log("1",promise1);
console.log("2",promise2);


