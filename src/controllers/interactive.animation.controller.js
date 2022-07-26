import {router} from "../router/index.routes.js";
import views from "../views/interactive.animation.html?raw";

export default () => {
	const divElement = document.createElement('div');
	divElement.innerHTML = views;

	//We need to go to other view due to some weird issue with drag and drop after css animations
	let lastAnimation = divElement.querySelector("#instruction_box");

	lastAnimation.addEventListener('animationend',()=> {
		router('#/interactive');
	});

	return divElement;
};


