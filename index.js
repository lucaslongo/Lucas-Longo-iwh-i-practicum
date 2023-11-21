const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = 'pat-na1-a35e9658-75f2-4a84-ab68-9e7e4a3e89f8';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

app.get('/', async (req, res) =>{
    const cobj = "https://api.hubapi.com/crm/v3/objects/2-20803845/?properties=nome_do_animal_de_estimacao&properties=raca_do_animal_de_animacao&properties=idade_do_animal_de_estimacao";
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    const properties = [
        "nome_do_animal_de_estimacao",
        "raca_do_animal_de_estimacao",
        "idade_do_animal_de_estimacao"
      ]

    try {
        const resp = await axios.get(cobj,{headers})
        console.error(resp);
        const data = resp.data.results;
        res.render('home',{data})
    } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get('/update-cobj', (req, res) =>{
    res.render('updates', {title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

app.post('/update-cobj', async (req, res) =>{
    const cobj = "https://api.hubspot.com/crm/v3/objects/animais_de_estimacao";
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    const newobj = {
        associations: [{"types":[{"associationCategory":"USER_DEFINED","associationTypeId":1}],"to":{"id":"2-20803845"}}],
        properties: {
            "nome_do_animal_de_estimacao": req.body.nome,
            "raca_do_animal_de_animacao": req.body.raca,
            "idade_do_animal_de_estimacao": req.body.idade
        }
    }

    try {
        await axios.post(cobj,newobj,{headers});
        res.redirect('back');
    } catch (error) {
        console.error(error);
    }
});

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));