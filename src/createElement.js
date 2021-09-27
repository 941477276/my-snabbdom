/**
 * 根据虚拟节点创建真实dom
 * @param vnode
 * @returns {*}
 */
export function createElement(vnode){
  // console.log('createElement', vnode);
  let dom = document.createElement(vnode.sel);
  vnode.elm = dom;
  if(typeof vnode.text == 'string' || typeof vnode.text == 'number'){ // 处理文本
    dom.appendChild(document.createTextNode(vnode.text));
  }
  if(vnode.children && vnode.children.length > 0){ // 处理子节点
    vnode.children.forEach(child => {
      let childDom = createElement(child);
      dom.appendChild(childDom);
    });
  }
  return dom;
}
