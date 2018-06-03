function underlineDef(element, options) {

	NodeList.prototype.forEach = Array.prototype.forEach;

	if (!options) {
		console.log("Define Words and Definitions Arrays!");
		options = {};
	}

	let el = document.querySelectorAll(element),
			cl = options.underlineClass || 'underline-definitions',
			tag = options.tagName || 'span',
			attr = options.attr || 'title',
			words = options.words || '.*',
			//Check if "words" are defined
			definitions = (options.definitions && words !== '.*') ?
										options.definitions : "Define Words Array",
			search = options.search || false;


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
						if (_compareStrings(words[j], elTextArr[i])) {
							// elTextArr[i] = '<'+ tag +' class="'+ cl +'" ' +
							// 								'title="'+ definitions[j] +'">' +
							// 								elTextArr[i] + '</'+ tag +'>';
							//Wrap "words" in "tagName" with "attr"
							elTextArr[i] = `<${tag} class="${cl}" ${attr}="`+
														`${definitions[j]}">${elTextArr[i]}</${tag}>`;

							continue;
						}

					} else {

						definitions = "Define Definitions Array";
						if (_compareStrings(words[j], elTextArr[i])) {
							elTextArr[i] = `<${tag} class="${cl}" ${attr}="`+
														`${definitions}">${elTextArr[i]}</${tag}>`;
							continue;
						}

					}

				}//For j end;

			} else {
				//Case for only one word and one definition
				if (_compareStrings(words, elTextArr[i])) {
					elTextArr[i] = `<${tag} class="${cl}" ${attr}="`+
												`${definitions}">${elTextArr[i]}</${tag}>`;
				}

			}

		}//For i end;

		// Join elements into string and append to our element
		elHTML = elTextArr.join(' ');
		item.innerHTML = elHTML;

		// Attach onclick search event if defined
		if (search) {

			elementsJoined = document.querySelectorAll('.'+cl);
			for (let i = 0; i < elementsJoined.length; i++) {
				elementsJoined[i].addEventListener('click', _search);
			}

		}

		/*-----------------
		Private functions
		------------------*/
		function _compareStrings(string1, string2) {
			let expr = new RegExp('^>*'+string1+'[!?.,<(\'s)]*$', 'i');
			return expr.test(string2);
		}

		function _search(e) {

			e.preventDefault();
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