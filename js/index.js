function jsIsLoaded(params) {
    var jsloaded = document.querySelector("#jsLoaded")

    jsloaded.style.backgroundColor = "green";

    jsloaded.innerText = "le js est chargé";

}


jsIsLoaded();

function isFormFullFill() {
    for (var input of document.forms['mon-form']) {
        if (input.localName !== 'button' && input.value === '') {
            input.style.backgroundColor = "tomato";
            return false;
        } else {
            if (!input.classList.contains('btn')) input.style.backgroundColor = "white";
        }
    }
    return true;

}

function getFormulaire() {
    var formulaire = document.forms['mon-form'];
    // console.log('titre :', formulaire['form-titre'].value);
    // console.log('auteur :', formulaire['form-auteur'].value);
    // console.log('mail :', formulaire['form-email'].value);
    // console.log('hour :', formulaire['form-hour'].value);
    // console.log('date :', formulaire['form-date'].value);
    // console.log('adresse :', formulaire['form-adresse'].value);
    // console.log('description :', formulaire['form-description'].value);

    var unPostIt = {
        titre: formulaire['form-titre'].value,
        auteurId: formulaire['form-auteur'].value,
        date: formulaire['form-date'].value,
        heure: formulaire['form-hour'].value,
        adresse: formulaire['form-adresse'].value,
        description: formulaire['form-description'].value,
        mail: formulaire['form-email'].value
    }

    console.log(unPostIt);
    return unPostIt;
}
/**
 * Clone d'un postit modele et remplissage des valeurs puis ajout à la liste
 * @param {Postit} postitValues objet comprennant les valeurs d'un postit a afficher
 */
function makePostIt(postitDoc, postitValues) {
    //recuperation du postit model pour la creation des autres postit a remplir
    //clone permet d'obtenir un double non lié a l'element d'origine
    // var postitNode = document.querySelector('.post-it').cloneNode(true);
    var postitNode = document.createElement('div');
    postitNode.innerHTML = postitDoc.firstChild.outerHTML;
    //composition d'un post it rempli avec les valeurs recus en argument d'entree de fonction
    postitNode.querySelector('.post-it-titre').innerText = postitValues.titre;
    postitNode.querySelector('.post-it-adresse').innerText = postitValues.adresse;
    postitNode.querySelector('.post-it-mail').innerText = postitValues.mail;
    postitNode.querySelector('.post-it-date').innerText = 'Le ' + postitValues.date + ' a ' + postitValues.heure;
    postitNode.querySelector('.post-it-description').innerText = postitValues.description;

    //ajout à la fin de la liste du postit cloné et rempli 
    document.querySelector('#post-it-liste').append(postitNode.firstChild);
}
/**
 * fonction de soumission du formulaire de saisie
 * @param {FormEvent} evt evenement du formulaire
 */


function onformsubmit(evt) {
    // arrêt par défaut de l'exe de la soumission (rechargement de la page)
    evt.preventDefault();
    //si le form n'est pas rempli je sors de cette fonction
    if (!isFormFullFill()) return;
    //récupération des valeurs dans le formulaire
    var postitValues = getFormulaire();
    //cré du postit rempli

    getTemplateView('postit.xhtml',
        function (responseDocument) {
            makePostIt(responseDocument, postitValues);
        }
    );
    evt.target.reset();

}

document.forms['mon-form'].addEventListener('submit', onformsubmit);

function getTemplateView(templateFileName, callback) {
    //etape 1 obtenetion d'un objet xhr
    var xhr = new XMLHttpRequest();
    //etape 2 prepa de la requete
    xhr.open('GET', 'vues/' + templateFileName);
    //etape 3 definiton du contenu a executer a chaque changement d'été d'exe
    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status !== 200) {
            console.log('ERROR XHR' + xhr.responseURL + '-->' + xhr.status + ':' + xhr.statusText);
            return;
            var postitDocParser = new DOMParser();
            var postitDoc = postitDocParser.parseFromString(xhr.responseText);
        }
        //console.log(evt.target);
        callback(xhr.responseXML);
    };
    //etape 4
    xhr.send();
}



