function Character(name, health, attackPower, counterAttackPower, imageFileName) {
	this.name = name;
	this.nameHtml = name.replace(" ", "-");
	this.health = health;
	this.attackPower = attackPower;
	this.counterAttackPower = counterAttackPower;
	this.damageMultiplier = 1;
	this.imageFileName = imageFileName;
}

var characters = [];

//create each Character
var rey = new Character("Rey", 120, 8, 15, "rey.jpg");
var darthVader = new Character("Darth Vader", 180, 8, 15, "darth_vader.jpg");
var leia = new Character("Leia", 130, 7, 30, "leia.jpg");
var darthMaul = new Character("Darth Maul", 160, 9, 10, "darth_maul.jpg");

characters.push(rey);
characters.push(darthVader);
characters.push(leia);
characters.push(darthMaul);

var player, target, enemiesRemaining;

//initilize row.character-row
for (var i = 0; i < characters.length; i++) {
	var n = characters[i].nameHtml;
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
	playerCharacter.removeClass("character").addClass("player");
	$(".player-row").append(playerCharacter);

	for (var i = 0; i < characters.length; i++) {
		if (characters[i].nameHtml === playerCharacter.attr("id")) {
			player = characters[i];
		}
	}

	//remaining characters become enemies, move them to .enemy-row
	var enemies = $(".character")
	enemies.removeClass("character").addClass("enemy");
	$(".enemy-row").append(enemies);

	//hide selection row
	$(".character-row").hide();

	enemiesRemaining = characters.length - 1;

});

//listener for target selection
$(".enemy-row").on("click", ".enemy", function() {
	var t = $(this);
	t.removeClass("enemy").addClass("target");
	$(".target-row").append(t);

	for (var i = 0; i < characters.length; i++) {
		if (characters[i].nameHtml === t.attr("id")) {
			target = characters[i];
		}
	}
	enemiesRemaining--;
});

//listener for attack button
$("#button-attack").on("click", function() {
	if($(".target").length) {
		resolveAttack(player, target);
	}
	else {
		$(".message").text("Select an enemy to attack.");
	}
});

function resolveAttack(attacker, defender) {
	//my game rule is that the player applies damage first
	//if the npc survives, then it applies damage
	//damage *IS NOT* simultaneous
	var damage = attacker.attackPower * attacker.damageMultiplier;
	defender.health = defender.health - damage;
	attacker.damageMultiplier++;
	if (defender.health <= 0 && enemiesRemaining === 0) {
		$(".message").text("You have defeated all of your opponents. You win!");
		$(".target").remove();
		$("#button-restart").css("visibility", "visible");
	}
	else if (defender.health <= 0 && enemiesRemaining > 0) {
		$(".message").text("You have defeated " + defender.name + ". Pick another target!");
		//remove target
		$(".target").remove();
	}
	//if defender is still alive, defender counter attacks
	else if (defender.health > 0) {
		attacker.health = attacker.health - defender.counterAttackPower;
		$(".message").html("<p>You hit " + defender.name + " for " + damage + ".</p><p>" + 
			defender.name + " hit you for " + defender.counterAttackPower + ".</p>");
		updateHealth(attacker, defender);
	}
	//if attacker health now less than 0, player loses
	if (attacker.health <= 0) {
		$(".message").text(defender.name + " has defeated you! Game over.");
		$("#button-restart").css("visibility", "visible");
	}
}

function updateHealth(c1, c2) {
	$("#" + c1.nameHtml + " p.health").text(c1.health);
	$("#" + c2.nameHtml + " p.health").text(c2.health);
}

//listener for restart button
$("#button-restart").on("click", function() {
	location.reload();
});