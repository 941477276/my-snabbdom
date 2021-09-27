import {vnode} from './vnode';

/**
 * 快捷创建vnode对象
 * @param sel dom的选择器
 * @param data
 * @param children 子节点
 * @returns {{data: *, children: *, elm: *, sel: *, text: *, key: *}}
 */
export function h(sel, data, children){
  if(arguments.length != 3){
    throw new Error('这是一个简单版的h函数，函数参数个数必须为3个！');
  }
  if(Array.isArray(children)){
    children.forEach((child, index) => {
      // 处理字符串或数字
      if(typeof child == 'string' || typeof child == 'number'){
        children[index] = vnode(undefined, undefined, undefined, child, undefined);
      }
    });
  }else if(typeof children === 'object' && ('sel' in children)){
    children = [children];
  }
  let text;
  if(typeof children == 'string' || typeof children == 'number'){
    text = children;
    children = undefined;
  }
  return vnode(sel, data, children, text, undefined);
}
