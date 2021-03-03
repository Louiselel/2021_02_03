function jsIsLoaded(params) {
    var jsloaded = document.querySelector("#jsLoaded")

    jsloaded.style.backgroundColor = "green";

    jsloaded.innerText = "le js esr chargé";

}


jsIsLoaded();

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
function makePostIt(postitValues) {
    var postitNode = document.querySelector('.post-it').cloneNode(true);
    postitNode.querySelector('.post-it-titre').innerText = postitValues.titre;
    postitNode.querySelector('.post-it-adresse').innerText = postitValues.adresse;
    postitNode.querySelector('.post-it-mail').innerText = postitValues.mail;
    postitNode.querySelector('.post-it-date').innerText = 'Le ' + postitValues.date + 'a' + postitValues.heure;
    postitNode.querySelector('.post-it-description').innerText = postitValues.description;



    document.querySelector('#post-it-liste').append(postitNode);

}


function onformsubmit(evt) {
    evt.preventDefault();
    getFormulaire();
    console.log(evt);
    var postitValues = getFormulaire();
    makePostIt(postitValues);
    evt.target.reset();


}
document.forms['mon-form'].addEventListener('submit', onformsubmit);



