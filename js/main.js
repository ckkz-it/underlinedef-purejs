function ready() {

	let words = ["aquatic", "krill", "temperate"],
			definitions = ["The term water bird, waterbird or aquatic bird is used to refer to birds that live on or around water.", "Krill are small crustaceans of the order Euphausiacea, and are found in all the world's oceans.", "In geography, the temperate or tepid climates of Earth occur in the middle latitudes, which span between the tropics and the polar regions of Earth."];


	underlineDef(".wrapper", {
		words: words,
		definitions: definitions,
		search: 'google',
		// underlineClass: 'customUnderline'
	});

}

document.addEventListener('DOMContentLoaded', ready);
