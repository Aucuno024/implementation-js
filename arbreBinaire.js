class ArbreBinaire{
    constructor(racine = null, sag = null, sad = null){
    this.racine = racine;
    this.sous_arbre_gauche = sag;
    this.sous_arbre_droit = sad;
    }

    estVide(){
        return this.racine === null
    }
    sag(){
        return this.sous_arbre_gauche !== null
    }
    sad(){
        return this.sous_arbre_droit !== null
    }
    taille(){
        if(this.estVide()){
            return 0
        }
        let tailleSad = 0
        if(this.sous_arbre_droit !== null){
            tailleSad = this.sous_arbre_droit.taille()
        }
        let tailleSag = 0
        if(this.sous_arbre_gauche !== null){
            tailleSag = this.sous_arbre_gauche.taille()
        }
        return 1 + tailleSad + tailleSag
    }

    hauteur(){
        if(this.estVide()){
            return -1
        }
        let hauteurSad = 0
        if(this.sous_arbre_droit !== null){
            hauteurSad = this.sous_arbre_droit.taille()
        }
        let hauteurSag = 0
        if(this.sous_arbre_gauche !== null){
            hauteurSag = this.sous_arbre_gauche.taille()
        }
        return 1+Math.max(hauteurSad,hauteurSag)
    }

    supprimer(){
        if(!this.sad() && !this.sag()){
            this.racine = null
        }
        else if(this.sous_arbre_gauche === null){
            this.racine = this.sous_arbre_droit.racine
            this.sous_arbre_droit.supprimer()
        }
        else{
            this.racine = this.sous_arbre_gauche.racine
            this.sous_arbre_gauche.supprimer()
        }
    }

    inserer(element){
        if(this.estVide()){
            this.racine = element
        }
        else if(this.sad() && this.sag()){
            this.sous_arbre_gauche.inserer(element)
        }
        else if (this.sag()){
            this.sous_arbre_droit = new ArbreBinaire()
            if(this.sous_arbre_gauche.estVide()){
                this.sous_arbre_gauche.racine = element
            }
            else{
            this.sous_arbre_droit.racine = element
            }
        }
        else if(this.sad()){
            this.sous_arbre_gauche = new ArbreBinaire()
            if(this.sous_arbre_droit.estVide()){
                this.sous_arbre_droit.racine = element
            }
            else{
            this.sous_arbre_gauche.racine = element
            }
        }else{
            this.sous_arbre_gauche = new ArbreBinaire()
            this.sous_arbre_gauche.racine = element
        }
    }
}

function insertionHauteur(arbre, element){
    if(arbre.estVide()){
        arbre.racine = element
    }
    else if(arbre.sad() && arbre.sag()){
        console.log(arbre.racine, arbre.sous_arbre_droit.racine, arbre.sous_arbre_gauche.racine,)
        if(arbre.sous_arbre_droit.hauteur() >= arbre.sous_arbre_gauche.hauteur()){
            insertionHauteur(arbre.sous_arbre_gauche, element)
        }
        else{
            insertionHauteur(arbre.sous_arbre_droit,element)
        }
    }
    else{
        arbre.inserer(element)
    }
}

function test(arbre){
    return arbre === null
}
arbre =  new ArbreBinaire("1", new ArbreBinaire("-1"))
arbre2 = new ArbreBinaire("e", new ArbreBinaire())

arbre2.supprimer()
arbre.supprimer()

console.log(arbre, arbre.sous_arbre_gauche, arbre.sous_arbre_droit)
for(let i = 0; i<3; i++){
    console.log(arbre.sous_arbre_gauche)
    insertionHauteur(arbre,i)
}

console.log(arbre.racine, arbre.sous_arbre_gauche.racine,arbre.sous_arbre_gauche.sous_arbre_gauche.racine, arbre.sous_arbre_droit.racine)