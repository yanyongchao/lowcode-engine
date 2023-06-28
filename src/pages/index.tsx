import React from "react";
import yayJpg from "../assets/yay.jpg";
import { Form, onFormInit, onFormMount } from "@/packages/core";
import { observable, autorun, batch, action, Tracker } from "@formily/reactive";
import { observer } from "@formily/react";

const form = new Form<{ name: string }>({
  effects: () => {
    // onFormInit((form) => {
    //   console.log("xxx---x", form);
    // });
    // onFormMount((form) => {
    //   console.log("xxx---x", form);
    // });
  },
});

const obs = observable({
  aa: 11,
});

const view = () => {
  console.log(obs.aa);
};

const tracker = new Tracker(() => {
  tracker.track(view);
});

tracker.track(view);

obs.aa = 22;

// tracker.dispose();

obs.aa = 33;

export default observer(function HomePage() {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>

      <button>按钮</button>
    </div>
  );
});
