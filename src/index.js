import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
   // h,
} from "snabbdom";
 import {h} from './h';
 import {patch} from './patch';

/*const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);*/
console.log('classModule',classModule);
console.log('propsModule',propsModule);
let app = document.getElementById('app');
/*let vnode1 = h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B')
]);*/

/*// 1、测试更新文本
let vnode1 = h('ul', {}, 'sdfsdf');
// 2、测试只更新子节点
let vnode1 = h('ul', {}, '一个ul元素');*/

/*// 1、测试  比对：新前与旧前
let vnode1 =  h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
]);*/

/*// 1、测试 比对：新后与旧后
let vnode1 =  h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
]);*/

/*// 1、测试 比对：新后与旧前
let vnode1 =  h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
]);*/

/*// 1、测试 比对：新后与旧前
let vnode1 =  h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
]);*/

/*// 1、测试 都没有匹配上，新节点中有剩余节点
let vnode1 =  h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D')
]);*/

/*// 1、测试 都没有匹配上，旧节点中有剩余节点
let vnode1 =  h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D')
]);*/

// 1、测试 复杂情况
let vnode1 =  h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'E'}, 'E'),
  h('li', {key: 'F'}, 'F'),
  h('li', {key: 'G'}, 'G'),
]);

patch(app, vnode1);

document.getElementById('updateNode').onclick = function (){
  /*let vnode2 = h('div', {}, h('ul', {}, [
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B')
  ]));*/
  /*let vnode2 = h('ul', {}, [
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B')
  ]);*/

  /*// 1、测试更新文本
  let vnode2 = h('ul', {}, '哈哈');
  // 2、测试只更新子节点
  let vnode2 = h('ul', {}, [
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B')
  ]);*/
 /* // 1、测试  比对：新前与旧前
  let vnode2 = h('ul', {}, [
    h('li', {key: 'A'}, 'A被修改了，新前与旧前比对'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'C'}, 'C哈哈'),
  ]);*/


  /*// 1、测试  比对：新后与旧后
  let vnode2 = h('ul', {}, [
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'D'}, 'D是的发送到'),
  ]);*/

  /*// 1、测试  比对：新后与旧前
  let vnode2 = h('ul', {}, [
    h('li', {key: 'D'}, 'D'),
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'A'}, 'A'),
  ]);*/

  /*// 1、测试  比对：新前与旧后
  let vnode2 = h('ul', {}, [
    h('li', {key: 'D'}, 'D'),
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'B'}, 'E')
  ]);*/

  /*// 1、测试  都没有匹配上，新节点中有剩余节点
  let vnode2 = h('ul', {}, [
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B被改变了'),
    h('li', {key: 'F'}, 'F'),
    h('li', {key: 'D'}, 'D'),
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'E'}, 'E'),
    h('li', {key: 'G'}, 'G'),
  ]);*/

  /*// 1、测试  都没有匹配上，旧节点中有剩余节点
  let vnode2 = h('ul', {}, [
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B被改变了'),
    h('li', {key: 'D'}, 'D'),
  ]);*/

  // 1、测试 复杂情况
  let vnode2 =  h('ul', {}, [
    h('li', {key: 'J'}, 'J'),
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'D'}, 'D'),
    h('li', {key: 'E'}, 'E'),
    h('li', {key: 'H'}, 'H'),
    h('li', {key: 'F'}, [
      h('p', {}, '我是段落1'),
      h('p', {}, '我是段落2'),
    ]),
    h('li', {key: 'G'}, 'G'),
    h('li', {key: 'I'}, 'I'),

  ]);

  // 精细化比较
  patch(vnode1, vnode2);
  console.log(vnode2);
}
