import { writable } from "svelte/store";

const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
export const user = writable(userFromLocalStorage || null);
