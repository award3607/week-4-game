//characters: Rey, Leia, Darth Vader, Darth Maul
//background image = space with spaceship and explosions





function Character(name, health, attackPower, counterAttackPower, imageFileName) {
	this.name = name;
	this.health = health;
	this.attack = attackPower;
	this.counterAttack = counterAttackPower;
	this.damageMultiplier = 1;
	this.imageFileName = imageFileName;
}

Character.prototype.method_name = function(first_argument) {
	// body...
};

var characters = [];

//create each Character
var rey = new Character("Rey", 100, 5, 15, "rey.jpg");
var darthVader = new Character("Darth Vader", 180, 8, 25, "darth_vader.jpg");
var leia = new Character("Leia", 130, 7, 35, "leia.jpg");
var darthMaul = new Character("Darth Maul", 160, 9, 15, "darth_maul.jpg");

characters.push(rey);
characters.push(darthVader);
characters.push(leia);
characters.push(darthMaul);

//initilize row.character-row
for (var i = 0; i < characters.length; i++) {
	var n = characters[i].name;
	var h = characters[i].health;
	var f = characters[i].imageFileName;
	var $div = $("<div>").attr("id", n).addClass("col-xs-3 col-sm-2 text-center character");
	$div.append(($("<p></p>").addClass("name").text(n)));
	$div.append(($("<img>").attr("src", "assets/images/" + f).addClass("img-responsive character-portrait")));
	$div.append(($("<p></p>").addClass("health").text(h)));
	$(".character-row").append($div);
}

//listener for character selection
$(".character-row").one("click", ".character", function() {
	var playerCharacter = $(this);
	// console.log(playerCharacter);
	playerCharacter.removeClass("character").addClass("player");
	$(".player-row").append(playerCharacter);

	//remaining characters become enemies, move them to .enemy-row
	var enemies = $(".character")
	enemies.removeClass("character").addClass("enemy");
	$(".enemy-row").append(enemies);

	//hide selection row
	$(".character-row").hide();

});

//listener for target selection
$(".enemy-row").on("click", ".enemy", function() {
	var target = $(this);
	target.removeClass("enemy").addClass("target");
	$(".target-row").append(target);

});