import { observable, autorun, batch, action } from "@formily/reactive";

const v1 = observable.deep({ name: "张三" });

action.bound(() => {
  console.log("aaa", v1.name);
  autorun(() => {
    console.log(v1.name);
  });
});

// batch会收集依赖，autorun里面的函数会执行
batch(() => {
  console.log("aaa", v1.name);
  autorun(() => {
    console.log(v1.name);
  });
});
