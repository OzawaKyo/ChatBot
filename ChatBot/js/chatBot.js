
/**
 * Le dictionnaire des commandes possibles
 */
 var commandsDictionnaire = {
    "background": {
        "function": changeBackgroundColor,
        "botAnswer": "I changed the background color of the page !",
        "helpMessage": "Change the background color of the page."
    },
    "messageSize": {
        "function": changeMessageSize,
        "botAnswer": "I changed size of the messages !",
        "helpMessage": "Change the size of the messages."
    },
    "messageColor": {
        "function": changeMessageColor,
        "botAnswer": "I changed the color of the messages !",
        "helpMessage": "Change the color of the messages."
    },
    "messageBackground": {
        "function": changeMessageBackgroundColor,
        "botAnswer": "I changed the background color of the messages !",
        "helpMessage": "Change the background color of the messages."
    },
    "clear": {
        "function": clear,
        "botAnswer": "",
        "helpMessage": "Clear the chat (remove all messages)."
    },
    "reset": {
        "function": reset,
        "botAnswer": "I reset to the default style !",
        "helpMessage": "Reset to the default style"
    }
};

var stylesDejaAppliques = {};

var messageAucuneCommande = "Sorry, the command does not exist."

/**
 * Exécutée une fois le body chargé.
 */
function onBodyLoad() {
    fillHelp();
}

/**
 *  Permets d'afficher la liste des commandes disponible.
 */
function fillHelp() {
    var helpDiv = document.getElementsByClassName("help")[0];
    for (var key in commandsDictionnaire) {
        var command = commandsDictionnaire[key];

        // Ajout d'un saut de ligne 
        var br = document.createElement("br");
        helpDiv.appendChild(br);

        // Ajout de la commande
        var divCommand = document.createElement("div");
        var divStrong = document.createElement("strong");
        divStrong.innerText = "/" + key;
        divCommand.appendChild(divStrong);
        helpDiv.appendChild(divCommand);

        // Ajout du message d'aide
        var divHelpMessage = document.createElement("div");
        divHelpMessage.innerText = command.helpMessage;
        helpDiv.appendChild(divHelpMessage);
    }
}

/**
 * Permets d'Ouvrir/fermer la zone d'aide
 */
function onClickHelpBtn() {
    var helpDiv = document.getElementsByClassName("help")[0];
    if (helpDiv.classList.contains("show")) {
        helpDiv.classList.remove("show");
    } else {
        helpDiv.classList.add("show");
    }
}

/**
 * Permets d'envoyer le message.
 */
function submitMessage() {
    // Récupération des éléments
    var chatInput = document.getElementById("chat-input");
    if (chatInput.value.trim() != '') {
        var command = parseCommand(chatInput.value);
        if (command[0] != null) {
            var uneCommandeAEteExecute = executeCommand(command[0], command[1]);
            // Affichage du message de l'utilisateur
            AfficherMessage(true, chatInput.value);
            if (uneCommandeAEteExecute) {
                if (commandsDictionnaire[command[0]].botAnswer) {
                    // Affichage du message du bot
                    AfficherMessage(false, commandsDictionnaire[command[0]].botAnswer);
                }
            } else {
                // Affichage du message du bot
                AfficherMessage(false, messageAucuneCommande);
            }
        } else {
            // Affichage du message de l'utilisateur
            AfficherMessage(true, chatInput.value);
        }

        // Nettoyage de la zone de saisie
        chatInput.value = "";
    }

}

/**
 * Permets d'afficher un message.
 */
function AfficherMessage(estMessageUtilisateur, messageText) {
    var scrollMessage = document.getElementsByClassName("scroll-message")[0];
    var newMessage = document.createElement("div");
    var newText = document.createElement("div");
    if (estMessageUtilisateur) {
        newMessage.className = "message user";
        for (keyStyle in stylesDejaAppliques) {
            newText.style[keyStyle] = stylesDejaAppliques[keyStyle];
        }
    } else {
        newMessage.className = "message bot";
    }
    newText.className = "text";
    newText.innerText = messageText;
    newMessage.appendChild(newText);
    scrollMessage.appendChild(newMessage);
}

/**
 * Permets d'envoyer le message avec le bouton "Entrer" du clavier.
 */
document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("send-message-btn").click();
    }
});

/**
 * Permets de changer la couleur de fond du document
 */
function changeBackgroundColor(args) {
    document.querySelector("body").style.background = args[0];
}

/**
 * Permets de changer la couleur de fond des messages
 */
function changeMessageBackgroundColor(args) {
    var messagesUser = document.getElementsByClassName("message user");
    for (let i = 0; i < messagesUser.length; i++) {
        messagesUser[i].getElementsByClassName("text")[0].style.background = args[0];
    }
    stylesDejaAppliques.background = args[0];
}

/**
 * Permets de changer la couleur de texte des messages
 */
function changeMessageColor(args) {
    var messagesUser = document.getElementsByClassName("message user");
    for (let i = 0; i < messagesUser.length; i++) {
        messagesUser[i].getElementsByClassName("text")[0].style.color = args[0];
    }
    stylesDejaAppliques.color = args[0];
}

/**
 * Permets des nettoyés tout le chat 
 */
function clear() {
    document.getElementsByClassName("scroll-message")[0].innerHTML = "";
}

/**
 * permet de retourner au slyles apliquees par defeaut
 */
function reset() {
    document.querySelector("body").style = "";
    var messagesUser = document.getElementsByClassName("message user");
    for (let i = 0; i < messagesUser.length; i++) {
        messagesUser[i].getElementsByClassName("text")[0].style = "";
    }
    stylesDejaAppliques = {};
}

/**
 * Permets de changer la taile des messages
 */
function changeMessageSize(args) {
    var messagesUser = document.getElementsByClassName("message user");
    for (let i = 0; i < messagesUser.length; i++) {
        messagesUser[i].getElementsByClassName("text")[0].style.fontSize = args[0];
    }
    stylesDejaAppliques.fontSize = args[0];
}

/**
 * Permets d'exécuter la commande demandée. 
 * La fonction retourne true si une commande a été éxécuté, false sinon.
 */
function executeCommand(commandName, args) {
    var uneCommandeAEteExecute = false;
    var command = commandsDictionnaire[commandName];
    if (command != undefined) {
        command.function(args);
        uneCommandeAEteExecute = true;
    }
    return uneCommandeAEteExecute;
}

/**
 * Un parser pour récupérer les commands et leurs arguments
 */
function parseCommand(str) {
    /*
    check if 1st char is a / and second char is not a space
    (i.e. there is a command)
    if not log to console and return [null, null]
    (also remove the / once the check is done)
    */
    if (str[0] != "/" || str[1] == " ") {
        console.log("not a command : " + str);
        return [null, null];
    } else {
        str = str.substring(1);
    }
    // parse the str (separation is the space char)
    let parsed = str.split(" ");
    let cmdName = parsed.shift();
    let args = parsed; // .shift removed the first entry in the array
    return [cmdName, args];
}