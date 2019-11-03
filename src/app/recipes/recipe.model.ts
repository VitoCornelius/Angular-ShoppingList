export class Recipe {
    //how a recipe should look like
    public name : string;
    public description : string;
    public imagePath : string; //this will hold the url 

    constructor(name : string, desc : string , imagePath : string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}