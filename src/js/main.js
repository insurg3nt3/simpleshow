import {router} from "/router/index.routes";

router(window.location.hash);

window.addEventListener('hashchange', () => {
	router(window.location.hash);
})

document.addEventListener("keydown", function(event) {

	if ((event.code === 'Enter') && (window.location.hash === '')) {
		router('#/animation');
	}

	if ((event.code === 'Escape') && (window.location.hash === '#/interactive')) {
		router('#/animation');
	}
});


