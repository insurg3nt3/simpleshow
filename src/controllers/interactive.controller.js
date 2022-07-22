import interact from 'interactjs'

import {router} from "../router/index.routes";
import views from "../views/interactive.html?raw";

let mechParts = 6;

export default () => {
	const divElement = document.createElement('div');
	divElement.innerHTML = views;

	const greyOverlay = divElement.querySelector('.grey-overlay');
	const feedbackWin = divElement.querySelector('#feedback_win');
	const restartButton = divElement.querySelector('#restart_button');

	greyOverlay.setAttribute("style","visibility:hidden");
	feedbackWin.setAttribute("style","visibility:hidden")

	restartButton.addEventListener('click',()=> {
		router('#/animation');
	})

	return divElement;
};


// enable draggables to be dropped into this
interact('.dropzone').dropzone({

	// Require a 75% element overlap for a drop to be possible
	overlap: 0.35,

	ondrop: function (event) {
		partIsInCorrectPlace(event)
	}
})

function partIsInCorrectPlace (event){

	// Compare drop-zone and drag element Ids
	let groupId = event.relatedTarget.getAttribute('id')
	let groupIdPlace = event.target.getAttribute('id').slice(0, -9);

	if (groupId !== groupIdPlace) {
		event.relatedTarget.removeAttribute('style')
		event.relatedTarget.removeAttribute('data-x')
		event.relatedTarget.removeAttribute('data-y')
		let clone = event.relatedTarget.cloneNode(true)
		event.currentTarget.parentElement.appendChild(clone)
	} else {
		event.target.style.visibility = 'visible'
		mechParts--
		if (mechParts === 0){
			const greyOverlay = document.querySelector('.grey-overlay');
			const feedbackWin = document.querySelector('#feedback_win');

			greyOverlay.setAttribute("style","visibility:visible");
			feedbackWin.removeAttribute("style");
			feedbackWin.classList.add('feedback_win_animation');
			mechParts = 6;
		}
	}

	/*if (groupId === groupIdPlace) {
		event.target.style.visibility = 'visible'
		mechParts--
		if (mechParts === 0){
			console.log("terminóoo")
		}

	} else {

		let clone = event.relatedTarget.cloneNode(true)
		event.currentTarget.parentElement.appendChild(clone)
	}*/

	event.relatedTarget.remove()
}

function dragMoveListener (event) {
	var target = event.target
	// keep the dragged position in the data-x/data-y attributes
	var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
	var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

	// translate the element
	target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

	// update the posiion attributes
	target.setAttribute('data-x', x)
	target.setAttribute('data-y', y)
}


interact('.drag-drop')
	.draggable({
		inertia: true,
		modifiers: [
			interact.modifiers.restrictRect({
				restriction: 'parent',
				endOnly: true
			})
		],
		autoScroll: true,
		// dragMoveListener from the dragging demo above
		listeners: { move: dragMoveListener}
	})
