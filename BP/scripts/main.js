import { world } from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';

function form(Player) {
    const form = new ActionFormData();
    form.title("§l§uSimplyNetwork")
    form.body("Change your Settings.")

    form.button("Gamemode", "textures/items/diamond.png")
    form.button("Done");

    form.show(Player).then((response) => {
        if (response.selection === 0) {
            Player.runCommandAsync('execute as @s at @s run playsound note.pling @s ~~~ 1 1');
            form1(Player);
        }
        if (response.selection === 1) {
            Player.runCommandAsync('execute as @s at @s run playsound note.pling @s ~~~ 1 2');
        }
    });
}

function form1(Player) {
    const form1 = new ActionFormData();
    form1.title("§l§uSimplyNetwork")
    form1.body("Choose a Gamemode.")

    form1.button("Creative")
    form1.button("Survival")
    form1.button("Adventure")
    form1.button("Back");

    form1.show(Player).then((response) => {
        if (response.selection === 0) {
            Player.runCommandAsync('execute as @s at @s run playsound note.pling @s ~~~ 1 2');
            Player.runCommandAsync('execute as @s at @s run gamemode c');
        }
        if (response.selection === 1) {
            Player.runCommandAsync('execute as @s at @s run playsound note.pling @s ~~~ 1 2');
            Player.runCommandAsync('execute as @s at @s run gamemode s');
        }
        if (response.selection === 2) {
            Player.runCommandAsync('execute as @s at @s run playsound note.pling @s ~~~ 1 2');
            Player.runCommandAsync('execute as @s at @s run gamemode a');
        }
        if (response.selection === 3) {
            Player.runCommandAsync('execute as @s at @s run playsound note.pling @s ~~~ 1 1');
            form(Player);
        }
    });
}

world.afterEvents.itemUse.subscribe(({ source, itemStack }) => {
    const item = itemStack;

    if (!item) return;

    if (item.typeId === "minecraft:compass") {
        form(source);
    }
});

world.beforeEvents.chatSend.subscribe((eventData) => {
    const player = eventData.sender;
    switch (eventData.message) {
        case '!gmc':
            eventData.cancel = true;
            player.runCommandAsync('gamemode c');
            player.runCommandAsync('execute as @s at @s run playsound note.pling @s ~~~ 1 2');
            break;
        case '!gms':
            eventData.cancel = true;
            player.runCommandAsync('gamemode s');
            player.runCommandAsync('execute as @s at @s run playsound note.pling @s ~~~ 1 2');
            break;
        case '!setmax':
            eventData.cancel = true;
            player.runCommandAsync('setmaxplayers 30');
            player.runCommandAsync('execute as @s at @s run playsound note.pling @s ~~~ 1 2');
            break;
        default: break;
    }
});