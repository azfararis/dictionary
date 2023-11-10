function buttonClicked() {
    var word = document.getElementById("searchData").value;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json())
        .then((data) => {
            displayDictionaryData(data);
        })
        .catch((error) => {
            console.error("Error fetching dictionary data: ", error);
        });
}

function displayDictionaryData(data) {
    var dictionaryMeaningsContainer = document.getElementById("dictionaryMeaning");
    var thesaurusSynonymsContainer = document.getElementById("thesaurusSynonyms");

    
    dictionaryMeaningsContainer.innerHTML = "";
    thesaurusSynonymsContainer.innerHTML = "";

    var displayedAudioURLs = []; // Keep track of displayed audio URLs

    // Iterate over each entry in the data
    data.forEach(entry => {
        var word = entry.word;
        var phonetic = entry.phonetic;

        var wordElement = document.createElement("h4");
        wordElement.innerHTML = `${word} <span class="phonetic">${phonetic}</span>`;
        dictionaryMeaningsContainer.appendChild(wordElement);

        // Iterate over each meaning for the entry
        entry.meanings.forEach(meaning => {
            var partOfSpeech = meaning.partOfSpeech;
            var definitions = meaning.definitions.map(def => def.definition).join(", ");
            var meaningElement = document.createElement("p");
            meaningElement.innerHTML = `<strong>${partOfSpeech}:</strong> ${definitions}`;
            dictionaryMeaningsContainer.appendChild(meaningElement);

            // Display example if available
            if (meaning.definitions[0].example) {
                var exampleElement = document.createElement("p");
                exampleElement.innerHTML = `<strong>Example:</strong> ${meaning.definitions[0].example}`;
                dictionaryMeaningsContainer.appendChild(exampleElement);
            }
        });

        // Display audio if available
        entry.phonetics.forEach(phonetic => {
            if (phonetic.audio && !displayedAudioURLs.includes(phonetic.audio)) {
                var audioElement = document.createElement("audio");
                audioElement.controls = true;
                audioElement.src = phonetic.audio;
                dictionaryMeaningsContainer.appendChild(audioElement);
                displayedAudioURLs.push(phonetic.audio); // Add URL to the list of displayed audio
            }
        });

        // Display synonyms for the entry
        var synonyms = entry.meanings.reduce((acc, meaning) => {
            acc.push(...meaning.synonyms);
            return acc;
        }, []);

        if (synonyms.length > 0) {
            thesaurusSynonymsContainer.innerHTML += `<p>Synonyms for ${word}: ${synonyms.join(", ")}</p>`;
        } else {
            thesaurusSynonymsContainer.innerHTML += `<p>No synonyms found for ${word}.</p>`;
        }
    });
}
// Display URLs if available
entry.meanings.forEach(meaning => {
    var url = meaning.definitions[0].url;
    if (url) {
        var urlElement = document.createElement("p");
        urlElement.innerHTML = `<strong>URL:</strong> <a href="${url}" target="_blank">${url}</a>`;
        dictionaryMeaningsContainer.appendChild(urlElement);
    }
});
