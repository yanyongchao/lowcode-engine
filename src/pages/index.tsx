import React from "react";
import yayJpg from "../assets/yay.jpg";
import { Form, onFormInit, onFormMount } from "@/packages/core";

const form = new Form({
  effects: () => {
    onFormInit((form) => {
      console.log("xxx---x", form);
    });
    onFormMount((form) => {
      console.log("xxx---x", form);
    });
  },
});

export default function HomePage() {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <button onClick={() => form.notify("onFormMount")}>按钮</button>
    </div>
  );
}
