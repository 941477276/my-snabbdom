import {createElement} from './createElement';
import {updateChildren} from './updateChildren';

// 清空元素的子元素
function emptyChildren(elm){
  if(!elm || !elm.childNodes){
    return;
  }
  while (elm.childNodes.length > 0){
    elm.removeChild(elm.childNodes[0]);
  }
}

/**
 * 精细比较虚拟节点的内部
 * @param oldVNode 旧虚拟节点
 * @param newVNode 新虚拟节点
 */
export function patchVNodes(oldVNode, newVNode){
  let oldCh = oldVNode.children;
  let newCh = newVNode.children;

  if(oldVNode === newVNode){
    return;
  }
  newVNode.elm = oldVNode.elm;
  if(typeof newVNode.text != 'undefined' && newVNode.text != null){ // 新的虚拟节点文本时的情况
    console.log('newVNode.text', newVNode.text, oldVNode.text);
    if(newVNode.text != oldVNode.text){ // 如果新旧虚拟节点的文本不一致，则进行更新。如果一致则不做任何处理
      oldVNode.elm.textContent = newVNode.text;
      console.log('修改文本了');
    }
  }else{
    if(oldCh && oldCh.length > 0){
      console.log('精细比较子节点');
      // 如果旧虚拟节点中有子节点，那么这种情况最复杂，此时就要进行最优雅的diff比较
      updateChildren(oldCh, newCh);
    }else{
      console.log('移除旧dom中的所有元素，并添加新的子元素（如果有的话）！');
      // 走到这里，说明旧节点中没有子节点，也没有文本节点，那么只需要移除旧节点中dom的所有元素，并添加新节点中的子节点即可
      let oldNodeElm = oldVNode.elm;
      emptyChildren(oldNodeElm);
      if(newCh && newCh.length > 0){
        newCh.forEach(child =>{
          let childElm = createElement(child);
          oldNodeElm.appendChild(childElm);
        });
      }
    }
  }
}
