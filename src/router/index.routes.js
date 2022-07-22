import {pages} from "../controllers/index";

let content = document.querySelector('#app')

const router = (route) => {

	content.innerHTML = '';

	switch (route) {
		case '#/animation':
			parent.location.hash = "#/animation";
			return content.appendChild(pages.interactiveAnimation());
		case '#/interactive':
			parent.location.hash = "#/interactive";
			return content.appendChild(pages.interactive());
		default:
			return content.appendChild(pages.start());
	}
}

export {router};
