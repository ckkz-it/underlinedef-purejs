"use strict";

function underlineDef(element, options) {

	NodeList.prototype.forEach = Array.prototype.forEach;

	if (!options) {
		console.log("Define Words and Definitions Arrays!");
		options = {};
	}

	let el             = document.querySelectorAll(element),
			words          = options.words || '.*',
			//Check if "words" are defined
			definitions    = (options.definitions && words !== '.*') ?
												options.definitions : "Define Words Array",
			cl             = options.underlineClass || 'underline-definitions',
			tag            = options.tagName || 'span',
			attr           = options.attr || 'title',
			search         = options.search || false,
			preventDefault = options.preventDefault || true;


	return el.forEach(function(item) {

		let elHTML = item.innerHTML;

		// Define style if underlineClass ins't set
		if (cl === 'underline-definitions') {
			let head = document.querySelector('head'),
					style = document.createElement('style');

			let css = '.underline-definitions {'+
									'border-bottom: 1px dashed #333; '+
									'position: relative; '+
									'color: #049ccf;'+
									'cursor: help;'+
								'} '+

								'.underline-definitions:hover {'+
									'border-bottom: 1px solid #333;'+
									'color: inherit;'+
								'}';

			css = document.createTextNode(css);
			style.appendChild(css);
			head.appendChild(style);
		}


		//Split text into array and wrap selected words in tags
		let elTextArr = elHTML.split(' ');

		for (let i = 0; i < elTextArr.length; i++) {
			//Check if there's only one word in "words"
			if (typeof words != 'string') {

				for (let j = 0; j < words.length; j++) {
					//Check if "words" are defined AND definitions aren't
					if (typeof definitions != 'string') {
						//Check if the "word" contain [?!,.] (===2, look _compareStrings)
						if (_compareStrings(words[j], elTextArr[i]) === 2) {
							elTextArr[i] = `<${tag} class="${cl}" ${attr}="`+
														`${definitions[j]}">${elTextArr[i]}</${tag}>`;
							continue;
						} else if (_compareStrings(words[j], elTextArr[i]) === 1) {
											elTextArr[i] = `<${tag} class="${cl}" ${attr}="`+
														`${definitions[j]}">${elTextArr[i].replace(/[!?.,<>]/g, '')}</${tag}>`+
														`${elTextArr[i].replace(/\w/g, '')}`;
											continue;
										}

					} else {

						definitions = "Define Definitions Array";
						if (_compareStrings(words[j], elTextArr[i]) === 2) {
							elTextArr[i] = `<${tag} class="${cl}" ${attr}="`+
														`${definitions}">${elTextArr[i]}</${tag}>`;
							continue;
						} else if (_compareStrings(words[j], elTextArr[i]) === 1) {
											elTextArr[i] = `<${tag} class="${cl}" ${attr}="`+
														`${definitions}">${elTextArr[i].replace(/[!?.,<>]*/g, '')}</${tag}>`+
														`${elTextArr[i].replace(/\w/g, '')}`;
											continue;
										}

								}

				}//For j end;

			} else {
				//Case for only one word and one definition
				if (_compareStrings(words, elTextArr[i]) === 2) {
					elTextArr[i] = `<${tag} class="${cl}" ${attr}="`+
												`${definitions}">${elTextArr[i]}</${tag}>`;
				} else if (_compareStrings(words, elTextArr[i]) === 1) {
											elTextArr[i] = `<${tag} class="${cl}" ${attr}="`+
														`${definitions}">${elTextArr[i].replace(/[!?.,<>]*/g, '')}</${tag}>`+
														`${elTextArr[i].replace(/\w/g, '')}`;
										}

				}

		}//For i end;

		// Join elements into string and append to our element
		elHTML = elTextArr.join(' ');
		item.innerHTML = elHTML;

		// Attach onclick search event if defined
		if (search) {

			let elementsJoined = document.querySelectorAll('.'+cl);
			for (let i = 0; i < elementsJoined.length; i++) {
				elementsJoined[i].addEventListener('click', _search);
			}

		}

		/*-----------------
		Private functions
		------------------*/
		function _compareStrings(string1, string2) {

			let a = new RegExp('^>*'+string1+'[!?.,<(\'s)s]*$', 'i'),
					b = string1===string2;

			a = a.test(string2);
			return a+b;

		}

		function _search(e) {

			if (preventDefault) e.preventDefault();
			//Search clicked word w/o symbols (e.g. !?.,<>)
			let queryText = this.innerText.replace(/[!?.,<>]*/g, '').toLowerCase(),
					href;
			//Add here your search engines
			switch (search) {
				case 'google':
					href = 'https://www.google.ru/search?newwindow=1&q='; break;
				case 'wikipedia':
					href = 'https://wikipedia.org/w/index.php?search='; break;
				case 'yandex':
					href = 'https://yandex.ru/search/?text='; break;
				default:
					href = 'https://www.google.ru/search?newwindow=1&q=';
			}

			href += queryText;
			window.open(href, '_blank');
		}

	});

}