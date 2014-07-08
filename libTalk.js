/*
**
** Librairie de communication réseau LeekWars
** Niveau d'utilisation     : ?
** Nombre de coeurs         : 1
**
**
** 
** 
** Description des protocoles :
**		FOCUS -> LEEK_ID:CELL
**		HEAL  -> LEEK_ID:PROTECTION_BUFFS_ACTIVE:CRITICAL
**		BUFF  -> LEEK_ID:BUFF_ID(:BUFF_ID2:...)
** Valeur de retour :
**		Sauf indication contraire, les fonctions de lib retournent 0
**		en cas de succes et -1 en cas d'erreur (si la fonction retourne 
**		-1, un debugE() en affichera la raison dans les logs)
**
*/

/*
** Constantes de la lib, ne pas modifier.
*/

global		EXIT_OK		= 0;
global		EXIT_ERR	= -1;
global		fullDebug	= 1;		// Affiche ou désactive les débugs de routine.
global		allyTab		= [];
global		enemyTab	= [];

/*
** Routine d'envoi de packets.
*/

function sendPacket(dst, packet) {
    if (getLevel() < 69) {
	debugE("You must be level 69 to send packets, current lvl : " + getLevel());
	return (EXIT_ERR);
    }
    if (fullDebug)
	debug("sendPacket : sending (" + packet + ") to " + dst);
    if (dst != "all") {
	// On envoie un packet a un seul leek
    }
    else
	for (var i = 0; i < count(allyTab); i++)
	    sendTo(allyTab[i], 0, packet)
    retun (EXIT_OK);
}

/*
** Protocole de focus.
** Description du paquet :
**			FOCUS   : Début de paquet indiquant le protocole
**			LEEK_ID : ID du poireau a viser
**			CELL    : Cellule du poireau a focus
*/

function askForFocus(target) {
    var packet     = null;

    if (!isDead(target) && !isAlive(target)) {
	// Petit glitch, ces deux fonctions renvoient false dans le cas d'un poireau invalide (Ex : ID = -1)
	// On les utilise donc pour vérifier que le poireau target existe.
	debugE("[COM] Ask for focus : leek ID " + target + " is invalid.");
	return (EXIT_ERR);
    }
    packet = "FOCUS:" + target + ":" + getCell(target);
    if (fullDebug)
	debug("Packet generated : " + packet);
    return (sendPacket("all", packet));
}

/*
** Protocole de demande de heal.
** Description du paquet :
**			HEAL    				:
**			LEEK_ID 				: ID du poireau a soigner
**			PROTECTION_BUFFS_ACTIVE : Nombre de buffs de défense actifs
**									  sur le poireau LEEK_ID
**			CRITICAL				: Niveau de vie minimal demandé.
**
*/

function askForHeal(target, critical_level) {
}

function askForBuffs(target, buffs) {
}

function askForLiberation(target) {
}
