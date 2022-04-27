/*
	Visual by TEMPLATE STOCK
	templatestock.co @templatestock
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {
    "use strict";
  
    document.getElementById('contactform').addEventListener('submit', function(event) {
        const { 
            name, 
            email, 
            subject, 
            comments, 
            company, 
            phone
        } = verificaValores()

        const url = 'https://api-envio-emails.herokuapp.com/sendEmail';

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, subject, comments, company, phone})
        }

        fetch(url, options)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error('error:' + err));
    })

    document.querySelectorAll('.inputForm').forEach(item => {
        item.addEventListener('keyup', enableOrDisableElement)
    })

    function enableOrDisableElement(){
        if (todosValoresPreenchidos(verificaValores())) return document.getElementById("submit").removeAttribute('disabled');
        return document.getElementById("submit").setAttribute('disabled', '')
    }

    function verificaValores() {
        return {
            name: document.querySelector('#name').value.trim(),
            email: document.querySelector('#email').value.trim(),
            subject: 'Contratação de serviço',
            comments: document.querySelector('#comments').value.trim(),
            company: document.querySelector('#company').value.trim(),
            phone: document.querySelector('#phone').value.trim(),
        }
    }

    function todosValoresPreenchidos ({name, email, subject, comments, company, phone}) {
        return name && validarEmail(email) && subject && comments ? true : false && company && phone
    }

    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    function validarEmail(email) {
        if (!email)
            return false;

        if(email.length>254)
            return false;

        let valid = emailRegex.test(email);
        if(!valid)
            return false;

        let parts = email.split("@");
        if(parts[0].length>64)
            return false;

        const provedoresPessoais = ["hotmail", "gmail", "outlook", "yahoo"]
        const provedor = parts[1].split(".")[0];

        if(provedoresPessoais.includes(provedor)) return false;

        let domainParts = parts[1].split(".");
        if(domainParts.some(function(part) { return part.length>63; }))
            return false;

        return true;
    }
})(jQuery);
