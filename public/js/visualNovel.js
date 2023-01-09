const bgPath = "./img/";
const charPath = './img/';

class Character
{
	constructor(name, poses)
	{
		this.name = name;
		this.poses = poses;
	}
}


class Elispe
{
	constructor(background, text, nextDialog)
	{
		this.background = background;
		this.text = text;
		this.nextDialog = nextDialog;
	}


	drawDialog(vn)
	{
        let body = document.querySelector(".bg");
        let div = document.querySelector(".bg-ellipse")
        let p = document.querySelector(".text-ellipse");
        p.innerHTML = this.text;
        div.style.display = "block";
        div.style.backgroundImage = `url(${this.background})`;
    }
}

class Fin
{
	constructor(nextDialog)
	{
		this.text = "FIN";
		this.nextDialog = nextDialog;
	}


	drawDialog(vn)
	{
        let body = document.querySelector(".bg");
        let div = document.querySelector(".bg-ellipse")
        let p = document.querySelector(".text-ellipse");
        p.innerHTML = this.text;
        div.style.display = "block";
        div.style.backgroundColor = "rgb(0,0,0)";
		
    }
}

class Dialog
{
	constructor(character, pose, background, dialog, nextDialog, choices = null)
	{
		this.character = character;
		this.pose = pose;
		this.background = background;
		this.choices = choices;
		this.dialog = dialog;
		this.nextDialog = nextDialog;
	}

	drawDialog(vn)
	{
		// Affichage du nom
		document.querySelector("#nom-perso").innerHTML = this.character.name;
		// Affichage du dialog
		document.querySelector("#text").innerHTML = this.dialog;
		// Affichage de l'image du personnage
		if(this.character.poses != null){
			document.querySelector("#img-perso").style.display= "block";
			document.querySelector("#img-perso").src = this.character.poses[this.pose];
		}else{
			document.querySelector("#img-perso").style.display= "none";
		}
		
		// Affichage du background
		document.querySelector("#bg").style.backgroundImage = `url(${this.background})`;
		// Affichage des choix


		let continueButton = document.querySelector("#continueButton");
		let divChoice = document.querySelector("#choix");
        
        //document.querySelector(".bg-ellipse").style.animation = "fadeOut 1s"
		if(this.choices != null)
		{
			divChoice.style.display = "block";
			continueButton.style.display = "none";


			this.choices.forEach((choice, i=0) => {
				divChoice.appendChild(this.createChoice(choice, vn, i));
			});
		}
		else
		{
			divChoice.style.display = "none";
			continueButton.style.display = "block";
		}
	}

	createChoice(choice, vn, i){
		let div = document.createElement("div");
		div.classList.add("choix-item");

		div.addEventListener("click", () => {
			vn.onChoixPress(i);
		})

		let p = document.createElement("p");
		p.classList.add("choix-text");
		p.innerHTML = choice;
		div.appendChild(p);
		return div;
	}
}



class VN
{


	constructor(baseDialog, nameUser, disease)
	{
		this.currentDialog = baseDialog;
		this.nameUser = nameUser;
		this.disease = disease;
		this.first = baseDialog;
		this.isEnterDown = false;
		var vn = this;
		document.addEventListener("keydown", (e) => {this.keyDownHandler(e, vn)}, false);
		document.addEventListener("keyup", (e) => {this.keyUpHandler(e, vn)}, false);
	}


	
	keyPressedHandler(e)
	{
		if(e.key == "Enter")
		{
			if(this.currentDialog.choices == null)
				this.onContinuePress(); 

		}
		
	}

	
	keyDownHandler(e, vn)
	{
		if(e.key == "Enter" && !this.isEnterDown)
		{
			vn.keyPressedHandler(e);
			vn.isEnterDown = true;
		}

	}

	keyUpHandler(e, vn)
	{
		if(e.key == "Enter")
			vn.isEnterDown = false;

	}

	onContinuePress()
	{
		if(this.currentDialog instanceof Elispe || this.currentDialog instanceof Fin)
		{
			if(this.currentDialog.nextDialog != null)
			{
				if(!(this.currentDialog.nextDialog instanceof Elispe) && !(this.currentDialog.nextDialog instanceof Fin))
				{
					document.querySelector(".bg-ellipse").style.animation = "fadeOut 1s";
					if(this.currentDialog.nextDialog instanceof Dialog)
					{
						setTimeout(()=>
						{
							document.querySelector(".bg-ellipse").style.display = "none";
						},1000);
					}
				}
				this.currentDialog = this.currentDialog.nextDialog;
				this.draw();
			}
			else
			{
				window.location.reload();
			}
        }else{
			this.currentDialog = this.currentDialog.nextDialog;
			this.draw();
		}
	
		
	}

	onChoixPress(i)
	{
		if(!this.currentDialog.nextDialog[i] == 0)
		{
			let choix = document.querySelector("#choix");
			// Suppression des choix
			let child = choix.lastElementChild; 
			while (child) {
				choix.removeChild(child);
				child = choix.lastElementChild;
			}
			this.currentDialog = this.currentDialog.nextDialog[i];
			
			this.draw();
		}
	}

	draw(){
		this.currentDialog.drawDialog(this);
	}
}
let maison = null;

let c = new Character("Sally", [charPath+"sally.png"]);
let c1 = new Character("Guido", [charPath+"Guido.png"]);
let enora = new Character("Enora", [charPath+"enora_1.png",charPath+"enora_2.png",charPath+"enora_3.png"]);
let medecin = new Character("Docteur Lashate",[charPath+"medecin.png"]);
let men = new Character("Vous",null)

let fin = new Fin(maison);
let seul = new Elispe(bgPath+"cartoon_chambre.jpg", "Vous rentrez chez vous seul comme d'habitude, sans compagnon ni ist", fin);
 
let prendreUneDouche = new Dialog(men,0,bgPath+'cartoon_chambre.jpg', "Arrivé chez vous, vous décidez de : ", [0, seul],["Prendre une douche", "Rester stuck plat"]); 
let attouchement = new Elispe(bgPath+"cartoon_prison.jpg", "Vous finissez dans les geoles du gouvernement pour attouchement sur mineur de moins de  13 ans, vous ferez peut-être mieux la prochaine fois", fin);

let boulot = new Dialog(men,0,bgPath+'cartoon_nightclub_in.jpg', "On dit que le temps c'est de l'argent mais le temps passé avec toi c'est de l'or :)",seul);

let doigt = new Dialog(men,0,bgPath+'cartoon_nightclub_in.jpg',"Tire le doigt",[seul, attouchement],["Emettre une flatulence", "Lui mettre une main aux fesses"])
//fin vih 
let medecin_vihMedocs = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Très bien. Je suivrai avec vous l'évolution de votre maladie. \nJe vous encourage à visiter le site de sida-info-service.org pour des informations complémentaires.",new Elispe(bgPath+"cartoon_medecin_cabinet.png","Vous prenez votre traitement et vivez une vie heureuse malgré la maladie.",fin));
let medecin_vihOsefs = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Je ne suis pas venu en feuille de chou, pour me faire bouffer par des lapins !",new Elispe(bgPath+"cartoon_medecin_cabinet.png","Vous finissez hospitalisé, et faites partie des 650.000 décés du SIDA annuels...",fin));
let medecin_vih5s = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Dans tous les cas, le VIH est normal. Vous pourrez vivre comme avant avec ces traitements modernes.",[medecin_vihMedocs,medecin_vihOsefs],["S'informer et prendre un traitement.","Ne pas prendre de traitement"]);
let medecin_vih4s = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Heureusement, aujourd'hui il existe des traitements qui permettent d'hiniber quasiment totalement le VIH.\nAvec suffisament de temps, et la prise assidue du traitement, vous pouvez ne plus être contagieu. ",medecin_vih5s,null);
let medecin_vih3s = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","C'est une maladie qui se transmet sexuellement mais aussi par voie sanguine lors de la prise de drogues,\nen intraveineuse ou avec des pailles d'ailleurs. Vous avez certainement eu un comportement à risque...",medecin_vih4s,null);
let medecin_vih2s = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","J'ai malheureusement une mauvaise nouvelle. Vos analyses indiquent que vous êtes atteint du syndrome de l'immunodéficience acquise, ou SIDA.",[medecin_vih3s,medecin_vih3s],["Oh non... C'est pas cool ça...","J'ai le droit aux places de parking gratuites pour les handicapés ?"]);
let medecin_vih1s = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Bonjour, je suis le Docteur Lashate.",medecin_vih2s,null);

let boire = new Dialog(enora,1,bgPath+'cartoon_nightclub_in.jpg',"Elle s'approche..........................",[doigt, prendreUneDouche, boulot],["Lui demander de tirer mon doigt", "Devenir GrandMaster sur League of Legend", "Tenter une approche ambitieuse"]);
let meufApproche = new Dialog(men,0,bgPath+'cartoon_nightclub_in.jpg',"Comment elle est tarpin bonne la meuf", boire);
let rentre = new Elispe(bgPath+"cartoon_chambre.jpg", "Un ptit fifa solo chez moi", null);
let lit = new Dialog(men,0,bgPath+"cartoon_chambre.jpg","J'espere que je suis équipé",[fin,medecin_vih1s], ["J'ai mon caoutchou", "Mince on va faire sans"]);
let ramene = new Elispe(bgPath+"cartoon_chambre.jpg","Vous allez chez elle",lit);
let macarena = new Elispe(bgPath+"cartoon_nightclub_in.jpg", "Vous séduisez une jeune demoiselle",ramene);
let dance = new Dialog(men,0,bgPath+'cartoon_dancefloor.jpg', "Oh ça club ici !!", [macarena,rentre], ["Danser la macarena tout seul", "Rentrer tout seul"]);
let boite = new Dialog(men,0,bgPath+'cartoon_nightclub_in.jpg', "J'irais bien me mettre une race mais le dance floor est caffi de monde",[dance,meufApproche],["Danser","Boire"]);


//let truc = new Dialog(personnage,indexperso,bgPath+"bg.jpg","dialogue",[dial_voie1,dial_voie2],["choix1","choix2"]);
//fins du médecin
//fin tout va bien
let medecin_toutvabien_capote6 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Très bien, j'ai d'autres rendez-vous. Je vous raccompagne.\n Bonne journée !",new Elispe(bgPath+"cartoon_medecin_cabinet.png","Vous respectez les conseils pour lutter contre les MST, et sensibilisez votre entourage aux risque liés aux activités sexuelles.",fin));
let medecin_toutvabien_capote5 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Vous savez, il existe de nombreux moyens de contraception, et beaucoup de personnes oublient de se protéger.\nIl y a chaque jour plus d'un million de nouveaux cas de maladies sexuellement transmissibles...",medecin_toutvabien_capote6,null);
let medecin_toutvabien_capote4 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","C'est vrai qu'il faut toujours limiter son nombre de partenaires, et surtout penser au préservatif ! AHAH",medecin_toutvabien_capote5,null);
let medecin_toutvabien_capote3 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Vous semblez respecter les règles de sécurité sexuelles.", [medecin_toutvabien_capote4,medecin_toutvabien_capote4],["Hum...Oui, je n'ai pas beaucoup de partenaires...","J'ai toujours des caoutchoucs de secours dans la chaussette !"]);
let medecin_toutvabien_capote2 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","J'ai de bonnes nouvelles. Vos analyses de sang sont bonnes.",medecin_toutvabien_capote3, null);
let medecin_toutvabien_capote1 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Bonjour, Docteur Lashate. Comment allez-vous ?",medecin_toutvabien_capote2,null);

//fin vih
let medecin_vihMedoc = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Très bien. Je suivrai avec vous l'évolution de votre maladie. \nJe vous encourage à visiter le site de sida-info-service.org pour des informations complémentaires.",new Elispe(bgPath+"cartoon_medecin_cabinet.png","Vous prenez votre traitement et vivez une vie heureuse malgré la maladie.",fin));
let medecin_vihOsef = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Je ne suis pas venu en feuille de chou, pour me faire bouffer par des lapins !",new Elispe(bgPath+"cartoon_medecin_cabinet.png","Vous finissez hospitalisé, et faites partie des 650.000 décés du SIDA annuels...",fin));
let medecin_vih5 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Dans tous les cas, le VIH est normal. Vous pourrez vivre comme avant avec ces traitements modernes.",[medecin_vihMedoc,medecin_vihOsef],["S'informer et prendre un traitement.","Ne pas prendre de traitement"]);
let medecin_vih4 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Heureusement, aujourd'hui il existe des traitements qui permettent d'hiniber quasiment totalement le VIH.\nAvec suffisament de temps, et la prise assidue du traitement, vous pouvez ne plus être contagieu. ",medecin_vih5,null);
let medecin_vih3 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","C'est une maladie qui se transmet sexuellement mais aussi par voie sanguine lors de la prise de drogues,\nen intraveineuse ou avec des pailles d'ailleurs. Vous avez sûrement eu un comportement à risque...",medecin_vih4,null);
let medecin_vih2 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","J'ai malheureusement une mauvaise nouvelle. Vos analyses indiquent que vous êtes atteint du syndrome de l'immunodéficience acquise, ou SIDA.",[medecin_vih3,medecin_vih3],["Oh non... C'est pas cool ça...","J'ai le droit aux places de parking gratuites pour les handicapés ?"]);
let medecin_vih1 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Bonjour, je suis le Docteur Lashate.",medecin_vih2,null);

// Fin herpes
let medecin_herpes6 = new Dialog(medecin, 0, bgPath+"cartoon_medecin_cabinet.png", "Éviter tout contact avec d'autres personnes lorsque vous avez un bouton de fièvre.\nJe vous conseille de ne pas avoir de relations sexuelle durant cette période, même avec un préservatif.");
let medecin_herpes5 = new Dialog(medecin, 0, bgPath+"cartoon_medecin_cabinet.png", "Dans votre cas, ce virus ne posera pas de problème. Mais faites attention à ce que vous touchez.");
let medecin_herpes4 = new Dialog(medecin, 0, bgPath+"cartoon_medecin_cabinet.png", "Vous ne pourrez malheureusement pas guérir de ce virus,\nmais il existe tout de même des traitements capable de réduire la douleur et de réduire les chances de contagion.");
let medecin_herpes3 = new Dialog(medecin, 0, bgPath+"cartoon_medecin_cabinet.png", "L'herpès de type 1 est principalement buccale tandis que le type 2 est sur les organes génitaux.\nAttention, il est tout à fait possible de transmettre une herpès de type 1 sur ses organes génitaux et inversement.");
let medecin_herpes2 = new Dialog(medecin, 0, bgPath+"cartoon_medecin_cabinet.png", "D'après les résultats, vous avez de l'herpès et plus précisement de l'herpès de type 1.");
let medecin_herpes1 = new Dialog(medecin, 0, bgPath+"cartoon_medecin_cabinet.png", "Bonjour, je suis le Docteur Lashate.", medecin_herpes2, null);

//fin NNN medecin
let medecin_DDD4 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Bon sang de bonsoir, cessez immédiatement. Et... mettez de la glace...",new Elispe(bgPath+"cartoon_medecin_cabinet.png","Après application de la glace, vous remarquez que vos organes génitaux \nse sont transformés en bouillabaisse... Pas de chance...",fin));
let medecin_DDD3 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","MAIS VOS PARTIES GENITALES SAIGNENT !!!",medecin_DDD4,null);
let medecin_DDD2 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","SAPRISTI ! Mais il s'agit du défi où vous devez vous masturber autant de fois que le jour !",medecin_DDD3,null);
let medecin_DDD1 = new Dialog(men,0,bgPath+"cartoon_medecin_cabinet.png","Par contre, à cause du DDD (Destroy Dick December), je ne sens plus mon entre jambre...",medecin_DDD2,null);
let medecin_NNN7 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","AHAH pourquoi pas, mais la masturbation n'a rien de problématique. Il faut juste ne pas en abuser !",new Elispe(bgPath+"cartoon_medecin_cabinet.png","Vous sortez du médecin satisfait et déterminé à vous masturber sur la catégorie BBW feets sur votre site pornographique favori.",fin));
let medecin_NNN6 = new Dialog(men,0,bgPath+"cartoon_medecin_cabinet.png","Je suis bien informé. J'effectue le No Nut Novembre, un mois de chasteté !",medecin_NNN7,null);
let medecin_NNN5 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Vous savez, il existe de nombreux moyens de contraception, et beaucoup de personnes oublient de se protéger.\nIl y a chaque jour plus d'un million de nouveaux cas de maladies sexuellement transmissibles...",[medecin_NNN6,medecin_DDD1],["Novembre","Decembre"]);
let medecin_NNN4 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","C'est vrai qu'il faut toujours limiter son nombre de partenaires, et surtout penser au préservatif ! AHAH",medecin_NNN5,null);
let medecin_NNN3 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Vous semblez respecter les règles de sécurité sexuelles.",medecin_NNN4,null);
let medecin_NNN2 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Vos analyses sanguines n'indiquent aucune maladie.",medecin_NNN3,null);
let medecin_NNN1 = new Dialog(medecin,0,bgPath+"cartoon_medecin_cabinet.png","Bonjour, je suis le Docteur Lashate.",medecin_NNN2,null);

let directionMedecinFap = new Elispe(bgPath+"cartoon_chambre.jpg", "Ah mais j'ai un rendez vous chez le medecin", medecin_NNN1);

let maison2 = new Dialog(men,0,bgPath+"cartoon_chambre.jpg","Je sais pas quoi faire, me faire plasir ou bon dormir hein...", [medecin_vih1,directionMedecinFap], ["Ah mais j'ai rendez vous chez le médecin, depuis que j'ai eu des rapports non protégé","Non ! C'est le no nut november, c'est pas bon souvent"]);
maison = new Dialog(men,0,bgPath+"cartoon_chambre.jpg","Poufff je m'ennuie je sais pas ce que je veux faire l'hésite à aller en boite ou bon j'reste à la maison", [boite, maison2],["Aller en boite", "Rester à la maison"]);

let v = new VN(maison, 1, 1);
v.draw();