/**
 * 创建虚拟节点对象
 * @param sel
 * @param data
 * @param children
 * @param text
 * @param elm
 * @returns {{data, children, elm, sel, text, key: *}}
 */
export function vnode(sel, data, children, text, elm){
  let key = typeof data == 'undefined' ? undefined : data.key;
  return {sel, data, children, text, elm, key};
}
