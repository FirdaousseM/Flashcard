import { writable } from "svelte/store";

const storedTheme = localStorage.getItem("score");
export const score = writable(storedTheme);
score.subscribe(value => {
    localStorage.setItem("theme", value === 'dark' ? 'dark' : 'light');
});