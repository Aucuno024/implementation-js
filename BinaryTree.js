/*Implémentation d'un Arbre Binaire en JavaScript par Aucuno/Chloclo */

class BinaryTree{
    /*Classe de l'arbre binaire*/
    constructor(root = null, ult = null, urt = null){
    this.root = root;
    this.underLeftTree = ult;
    this.underRightTree = urt;
    }

    isEmpty(){
        return this.root === null
    }
    isUlt(){
        return this.underLeftTree !== null
    }
    isUrt(){
        return this.underRightTree !== null
    }
    getSize(){
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
        if(!this.isUrt() && !this.isUlt()){
            this.root = null
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
}

function insertHeight(arbre, element){
    if(arbre.isEmpty()){
        arbre.root = element
    }
    else if(arbre.isUrt() && arbre.isUlt()){
        console.log(arbre.root, arbre.underRightTree.root, arbre.underLeftTree.root,)
        if(arbre.underRightTree.getHeight() >= arbre.underLeftTree.getHeight()){
            insertHeight(arbre.underLeftTree, element)
        }
        else{
            insertHeight(arbre.underRightTree,element)
        }
    }
    else{
        arbre.insert(element)
    }
}

