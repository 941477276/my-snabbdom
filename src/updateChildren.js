import {patchVNodes} from './pathVNodes';
import {createElement} from './createElement';

// 判断两个虚拟节点是否是同一个节点
function sameVNode(oldVNode, newVNode){
  return (oldVNode.sel === newVNode.sel) && (oldVNode.key === newVNode.key);
}
/**
 * 精细比较新旧虚拟节点的子节点
 * @param oldCh 旧虚拟节点的子节点
 * @param newCh 新虚拟节点的子节点
 * 四个概念词汇：
 *  新前：新子节点数组从前往后数的元素
 *  新后：新子节点数组从后往前数的元素
 *  旧前：旧子节点数组从前往后数的元素
 *  旧后：旧子节点数组从后往前数的元素
 * 比较子节点时比较的情况有：
 *  1、新旧子节点相同，此时只需要再详细比较这两个子节点即可
 *  2、新增了子节点
 *  3、删除了子节点
 *  4、移动了子节点
 * 比较算法：先平行比较，再交叉比较
 *    平行比较：新子节点数组的第一项 与 旧子节点数组的第一项 进行比较，新子节点数组的第二项 与 旧子节点数组的第二项 进行比较...依此类推
 *            新子节点数组的最后一项 与 旧子节点数组的最后一项 进行比较，新子节点数组的倒数第二项 与 旧子节点数组的倒数第二项 进行比较...依此类推
 *    交叉比较：新子节点数组的最后一项 与 旧子节点数组的第一项 进行比较，新子节点数组的倒数第一项 与 旧子节点数组的第二项 进行比较...依此类推
 *            新子节点数组的第一项 与 旧子节点数组的最后一项 进行比较，新子节点数组的第二项 与 旧子节点数组的倒数第一项 进行比较...依此类推
 * 为了方便记住上面这4种比较方法，这里给它们命个名字
 *  1、新前与旧前：新子节点数组的第一项 与 旧子节点数组的第一项 进行比较
 *  2、新后与旧后：新子节点数组的最后一项 与 旧子节点数组的最后一项 进行比较
 *  3、新后与旧前：新子节点数组的最后一项 与 旧子节点数组的第一项 进行比较
 *  4、新前与旧后： 新子节点数组的第一项 与 旧子节点数组的最后一项 进行比较
 * 上面这4种比较方式只要命中其中一项，就不再往后查找，即它们是if else if关系
 * 如果上面4种比较都没命中，则再取得旧子节点结束与开始之间的节点，然后循环新子节点，看是否能查找的到，如果查找的到则说明新节点移动位置了，此时我们需要
 * 使用dom api移动元素位置。如果查找不到，则说明是新增的节点。
 *
 * 如果上面5种情况都执行完毕了，还有剩余节点，则分两种情况：
 * 1、新子节点中还有剩余未处理的节点：将这些节点添加到dom中
 * 2、旧子节点中还有剩余未处理的节点：从dom中移除这些节点
 */
export function updateChildren(oldCh, newCh){
  let parentElm = oldCh[0].elm.parentElement; // 父级元素

  let oldStartIdx = 0; // 旧前节点索引
  let oldEndIdx = oldCh.length - 1; // 旧后节点索引
  let oldStartNode = oldCh[oldStartIdx]; // 旧前节点
  let oldEndNode = oldCh[oldEndIdx]; // 旧后节点

  let newStartIdx = 0; // 新前节点索引
  let newEndIdx = newCh.length - 1; // 新后节点索引
  let newStartNode = newCh[newStartIdx]; // 新前节点
  let newEndNode = newCh[newEndIdx]; // 新后节点

  let keyIndexMaps = null;  // 存储虚拟节点的key对应的index

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log('循环了！');
    if(!newStartNode){ // 如果新前节点不存在，则直接跳过
      newStartNode = newCh[++newStartIdx];
    }else if (!newEndNode){
      newEndNode = newCh[--newEndIdx];
    }else if(!oldStartNode){
      oldStartNode = oldCh[++oldStartIdx];
    }else if (!oldEndNode){
      oldEndNode = oldCh[--oldEndIdx];
    }else if(sameVNode(oldStartNode, newStartNode)){ // 新前与旧前节点相同
      console.log('比对模式：1新前与旧前');
      // 详细这两个节点
      patchVNodes(oldStartNode, newStartNode);
      // 新前与旧前索引需要继续往后走
      oldStartNode = oldCh[++oldStartIdx];
      newStartNode = newCh[++newStartIdx];
    }else if(sameVNode(oldEndNode, newEndNode)){ // 新后与旧后节点相同
      console.log('比对模式：2新后与旧后');
      patchVNodes(oldEndNode, newEndNode);
      // 新后与旧后索引需要继续往前走
      oldEndNode = oldCh[--oldEndIdx];
      newEndNode = newCh[--newEndIdx];
    }else if(sameVNode(oldStartNode, newEndNode)){ // 新后与旧前节点相同
      console.log('比对模式：3新后与旧前');
      patchVNodes(oldStartNode, newEndNode);
      /* 当新后与旧前节点相同时，说明元素挪动了位置，此时我们只需要移动dom位置即可，移动到哪去呢？
         答案是移动到旧的子节点列表的最后一个子节点后面即可，请注意始终都是要移动到最旧的子节点列表的最后一个子节点后面
       */
      // 将匹配的元素插入到旧的子节点列表的最后一个元素后面，如果oldEndNode.elm.nextSibling为null，则parentElm.insertBefore相当于parentElm.appendChild
      parentElm.insertBefore(oldStartNode.elm, oldEndNode.elm.nextSibling);
      oldStartNode = oldCh[++oldStartIdx];
      newEndNode = newCh[--newEndIdx];
    }else if(sameVNode(oldEndNode, newStartNode)){ // 新前与旧后节点相同
      console.log('比对模式：4新前与旧后');
      patchVNodes(oldEndNode, newStartNode);
      /* 当新前与旧后相同时，说明元素也挪动了位置，此时我们要做的也是移动dom位置，
          在移动时我们只需要降旧后移动到旧前去即可
       */
      parentElm.insertBefore(oldEndNode.elm, oldStartNode.elm);
      oldEndNode = oldCh[--oldEndIdx];
      newStartNode = newCh[++newStartIdx];
    }else {
      // 存储旧节点中剩余节点的key，及对应的index
      if(!keyIndexMaps){
        keyIndexMaps = {};
        for(let i = oldStartIdx; i <= oldEndIdx; i++) {
          let oldNode = oldCh[i];
          if(typeof oldNode.key !== 'undefined' && oldNode.key != null){
            keyIndexMaps[oldNode.key] = i;
          }
        }
      }

      // 获取新前节点在旧节点列表中的位置
      let newNodeInOldChildrenIndex = keyIndexMaps[newStartNode.key];
      if(newNodeInOldChildrenIndex == undefined){
        console.log('比对模式：其他（新增节点）');
        // 如果新前节点在旧节点列表中找不到，说明该新前节点为新增的节点，此时将该新前节点添加进dom树中即可
        // 插入的位置为旧前节点的前面
        let newDom = createElement(newStartNode);
        parentElm.insertBefore(newDom, oldStartNode.elm);
      }else {
        /*
          如果新前节点在旧节点列表中找到了，并且新节点与旧节点的sel一致，则说明移动了位置。如果两个节点的sel不同，
          那就创建新的节点，并插入到dom树中
         */
        let elmToMove = oldCh[newNodeInOldChildrenIndex];
        if(elmToMove.sel !== newStartNode.sel){
          console.log('比对模式：其他（sel不同，新增节点）');
          parentElm.insertBefore(createElement(newStartNode), oldStartNode.elm);
        }else{
          console.log('比对模式：其他（sel相同，移动节点）');
          patchVNodes(elmToMove, newStartNode);
          parentElm.insertBefore(elmToMove.elm, oldStartNode.elm);
          // 把这项设置为undefined，表示处理完这项了
          oldCh[newNodeInOldChildrenIndex] = undefined;
        }
      }
      newStartNode = newCh[++newStartIdx];
    }
  }

  if(newStartIdx <= newEndIdx){ // 新子节点中还有剩余未处理的节点
    console.log('新节点中还有剩余未处理的节点');
    // 如果新子节点
    let before = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
    for(let i = newStartIdx; i <= newEndIdx; i++){
      parentElm.insertBefore(createElement(newCh[i]), before);
    }
  }else if(oldStartIdx <= oldEndIdx){ // 旧子节点中还有剩余未处理的节点，那么就删除他们
    console.log('旧节点中还有剩余未处理的节点');
    for(let i = oldStartIdx; i <= oldEndIdx; i++){
      // if(oldCh[i] && oldCh[i].elm){
      console.log('oldCh[i]', oldCh[i]);
        parentElm.removeChild(oldCh[i].elm);
      // }
    }
  }
}
