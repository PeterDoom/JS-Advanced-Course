class Rat {
    constructor(name) {
        this.name = name
        this.unitedRats = []
    }

    unite(otherRat) {
        if(otherRat instanceof Rat){
            this.unitedRats.push(otherRat)
        }
    }

    getRats(){
        return this.unitedRats
    }

    toString(){
        let output = `${this.name}\n`;

        for(let rat of this.unitedRats){
            output += `##${rat.name}\n`;
        }

        return output;
    }

}

