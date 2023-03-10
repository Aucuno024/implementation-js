/*Implémentation d'un Arbre Binaire en JavaScript par Aucuno/Chloclo */

class BinaryTree {
    /*Classe de l'arbre binaire*/
    constructor(root = null, ult = null, urt = null){
        /*root : Any (La valeur de la racine) 
          ult : null || BinaryTree (La valeur du sous arbre gauche)
          urt : null || BinaryTree (La valeur du sous arbre droit)
        */
    this.root = root;
    this.underLeftTree = ult;
    this.underRightTree = urt;
    }

    isEmpty(){
        /*Retourne l'état d'allocation de la racine */
        return this.root === null
    }
    isUlt(){
        /*Retourne l'existence d'un sous arbre gauche*/
        return this.underLeftTree !== null
    }
    isUrt(){
        /*Retourne l'existence d'un sous arbre droit */
        return this.underRightTree !== null
    }
    isNull(){
        /*Retourne la nullité de l'arbre, si il est entièrement vide de sa racine à ses sous arbres ou non */
        return this.isEmpty() && !this.isUlt() && !this.isUrt()
    }
    getSize(){
        /*Retourne la taille totale de l'arbre*/
        if(this.isEmpty()){
            return 0
        }
        let sizeUrt = 0
        if(this.underRightTree !== null){
            sizeUrt = this.underRightTree.getSize()
        }
        let sizeUlt = 0
        if(this.underLeftTree !== null){
            sizeUlt = this.underLeftTree.getSize()
        }
        return 1 + sizeUrt + sizeUlt
    }

    getHeight(){
        /*Retourne la Hauteur maximale de l'arbre */
        if(this.isEmpty()){
            return -1
        }
        let heightUrt = 0
        if(this.underRightTree !== null){
            heightUrt = this.underRightTree.getHeight()
        }
        let heightUlt = 0
        if(this.underLeftTree !== null){
            heightUlt = this.underLeftTree.getHeight()
        }
        return 1+Math.max(heightUrt,heightUlt)
    }

    delete(){
        /*  
        Supprime une racine et la remplace par la racine de gauche par défaut sinon par celle de droite. 
        Si c'est une feuille non nulle supprime sa valeur si elle est nulle la supprime
        Effet de Bord
        */
        if(!this.isUrt() && !this.isUlt()){
            if (this.root == null){
                delete(this.root)
            }
            else{
                delete(this)
            }
        }
        else if(this.underLeftTree === null){
            this.root = this.underRightTree.root
            this.underRightTree.delete()
        }
        else{
            this.root = this.underLeftTree.root
            this.underLeftTree.delete()
        }
    }

    insert(element){
        /*Insere un élément dans l'arbre 
        Si la racine est vide, l'insère à la racine
        Si les deux arbres existent, l'insère dans l'arbre gauche
        Si l'arbre gauche ou l'arbre droit n'existe pas l'insère dans celui qui existe
        Si aucun des deux n'existent, crée et insère dans l'arbre droit
        Effet de bord
        */
        if(this.isEmpty()){
            this.root = element
        }
        else if(this.isUrt() && this.isUlt()){
            this.underLeftTree.insert(element)
        }
        else if (this.isUlt()){
            this.underRightTree = new BinaryTree()
            if(this.underLeftTree.isEmpty()){
                this.underLeftTree.root = element
            }
            else{
            this.underRightTree.root = element
            }
        }
        else if(this.isUrt()){
            this.underLeftTree = new BinaryTree()
            if(this.underRightTree.isEmpty()){
                this.underRightTree.root = element
            }
            else{
            this.underLeftTree.root = element
            }
        }else{
            this.underLeftTree = new BinaryTree()
            this.underLeftTree.root = element
        }
    }
    treeToList(parameter = "p"){
        /*Retourne la conversion de l'arbre en liste de manière postfixe, infixe ou suffixe. Postfixe par défaut*/
        if(this.isEmpty()){
            return []
        }
        if(this.isUlt() && this.isUrt()){
            if(parameter == "i"){
                return [this.underLeftTree.treeToList(parameter), this.root, this.underRightTree.treeToList(parameter)]
            } 
            else if(parameter =="s"){
                return [this.underLeftTree.treeToList(parameter), this.underRightTree.treeToList(parameter), this.root]
            }
            else{
                return [this.root, this.underLeftTree.treeToList(parameter), this.underRightTree.treeToList(parameter)]
            }
        }
        else if (this.isUlt()){
            if(parameter == "i"){
                return [this.underLeftTree.treeToList(parameter), this.root, []]
            } 
            else if(parameter =="s"){
                return [this.underLeftTree.treeToList(parameter), [], this.root]
            }
            else{
                return [this.root, this.underLeftTree.treeToList(parameter), []]
            }
        }
        else if (this.isUrt()){
            if(parameter =='i'){
                return [[], this.root, this.underRightTree.treeToList()]
            }
            else if(parameter =="s"){
                return [[], this.underRightTree.treeToList(), this.root]
            }
            else{
                return [this.root, [],this.underRightTree.treeToList()]
            }
        }
        else if(parameter =="i"){
            return [[], this.root, []]
        }
        else if (parameter =="s"){
            return [[], [], this.root,]
        }
        else{
            return [this.root, [], []]
        }
    }

    treeToTuple(parameter = "p"){
        /*Retourne une liste immuable*/
        return Object.freeze(this.treeToList(parameter))
    }

    displayInLog(parameter = "p"){
        /*Affiche l'arbre dans la console, préfixe par défaut, suffixe ou infixe*/
        console.log(this.treeToList(parameter))
    }
}

function insertHeight(tree, element){
    /*Insert des éléments dans l'arbre de manière équilibré du coté gauche et droit 
    Effet de bord*/
    if(tree.isEmpty()){
        tree.root = element
    }
    else if(tree.isUrt() && tree.isUlt()){
        console.log(tree.root, tree.underRightTree.root, tree.underLeftTree.root,)
        if(tree.underRightTree.getHeight() >= tree.underLeftTree.getHeight()){
            insertHeight(tree.underLeftTree, element)
        }
        else{
            insertHeight(tree.underRightTree,element)
        }
    }
    else{
        tree.insert(element)
    }
}

function insertDichotomous(tree, element){
    /*Insère de manière dichotomique des nombres
      Effet de bord*/
    if(tree.isEmpty()){
        tree.root = element
    }
    else if(tree.root >=element){
        if(tree.isUlt()){
            insertDichotomous(tree.underLeftTree, element)
        }
        else{
            tree.underLeftTree = new BinaryTree()
            tree.underLeftTree.root = element
        }
    }
    else{
        if (tree.isUrt()){
            insertDichotomous(tree.underRightTree, element)
        }
        else{
            tree.underRightTree = new BinaryTree()
            tree.underRightTree.root = element
        }
    }
}

function dichotomousSearch(tree, element){
    /*Recherche dichotomique dans un arbre binaire */
    if(tree.isEmpty()){
        return new BinaryTree()
    }
    else if(element === tree.root){
        return tree
    } else if(element <= tree.root){
        if(tree.isUlt()){
            return dichotomousSearch(tree.underLeftTree, element)
        }
        return new BinaryTree()
    } else if(element > tree.root){
        if(tree.isUrt()){
            return dichotomousSearch(tree.underRightTree, element)
        }
        return new BinaryTree()
    }
}
