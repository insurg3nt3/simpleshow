import {router} from "../router/index.routes.js";
import views from "../views/start.html?raw";

export default () => {
	const divElement = document.createElement('div');
	divElement.innerHTML = views;

	const btnStart = divElement.querySelector('#start_x5F_button_xA0_Image');

	btnStart.addEventListener('click',()=> {
		router('#/animation');
	})

	return divElement;
};
