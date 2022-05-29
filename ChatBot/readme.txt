la partie html comportant les classes/id suivantes:
.title: le titre du document en haut de la page.
.help-btn:  cette classe est utilisée principalement dans le côté mobile et elle indice le bouton d'aide en haut à droite de la page mobile.
.content: comporte deux grandes classes d'une pour la partie du chat (.chat_zone) et l'autre pour la partie d'aide (.help) .
	.chat_zone: comporte aussi deux grandes classes l'une pour la barre de chat (.search zone) qui comporte input et l'autre (.scroll-message) pour la partie ou le message s'affiche
	.help: comporte un peux de text.
la partie css (style):
cette partie comporte tout les style de la page.
dans cette partie rien n'est de position fixe ou absolute pour que la page reste réactive (sauf pour le bouton en version mobile car il est déjà fixe de base en haut à droit de la page)
transition dans la version mobile est de gauche à droite et de type ease in out(s'accélère quand avant la fin de la transition). 
La partie js comporte les fonctions suivantes :
onClickHelpBtn :
Cette fonction est réservée au côté mobile du chabot (>768 px) est c'est la fonction qui déclenche .help.show dans le média Query existant en Css.
submitMessage:
Cette fonction se compose de trois parties, la partie qui permet de copier tout ce qui est écrit dans l’input et le coller dans la partie chat-zone,
puis la partie concernant l’utilisateur qui permet de le coller côté utilisateur, et puis la partie bot Answer,
et à la fin la fonction efface ce qui était écrit dans l’input. Cette fonction marche en grande partie avec la fonction Afficher Message.
AfficherMessage:
Cette fonction a en argument estmessageutilisateur qui prend la valeur soit de True où False le True indique que ça doit être affiché dans partie utilisateur c-à-d les classes
.message.user qui est la partie user de chat-zone et False le parti .message.bot.
executeCommand:
Permets d’exécuter une fonction si elle est bien exécuter la fonction return True, False snn.
fillHelp:
cette fonction permet l’affichage des commandes possible a exécuter dans la partie .help avec helpmessage existant dans la bibliothèque.

et puit les fonction (changeBackgroundColor, changeMessageSize, changeMessageColor, changeMessageBackgroundColor, clear, reset) fonctionne a l’aide du parser.
Tout ces fonction on été mis dans le dictionnaire.
commandsDictionnaire : cce dictionnaire contient les fonctions, les bot Answer : c’est les réponses qui seront affichées par le Bot et les HelpMessage ce sont les messages d’aide

