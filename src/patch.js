import {vnode} from './vnode';
import {createElement} from './createElement';
import {patchVNodes} from './pathVNodes';


/**
 * 将虚拟dom挂载到页面中
 * @param oldVNode
 * @param newVNode
 */
export function patch(oldVNode, newVNode){
  // 处理第一个参数为dom的情况
  if(!oldVNode.sel){
    let sel = oldVNode.tagName.toLowerCase();
    sel += oldVNode.id ? ('#' + oldVNode.id) : '';
    sel += oldVNode.classList.length > 0 ? ('.' + ([...oldVNode.classList]).join('.')) : '';
    oldVNode = vnode(sel, undefined, undefined, undefined, oldVNode);
  }
  if(oldVNode.sel == newVNode.sel && oldVNode.key == newVNode.key){ // 若是同一个节点，则精细化比较
    patchVNodes(oldVNode, newVNode);
  } else { // 若不是同一个节点则暴力删除旧的，然后再插入新的
    if(!oldVNode.elm){
      console.error('oldVNode没有对应的DOM节点！');
      return;
    }
    console.log(11, oldVNode);
    let parent = oldVNode.elm.parentNode;
    let dom = createElement(newVNode);
    // 插入新元素，再移除旧的
    if(parent && dom){
      parent.insertBefore(dom, oldVNode.elm);
      parent.removeChild(oldVNode.elm);
    }
  }
}

